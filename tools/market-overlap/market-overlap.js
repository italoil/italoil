#!/usr/bin/env node
/**
 * market-overlap.js
 *
 * Parses ICS calendar files in the ./calendars directory and finds all
 * market-vs-market time-window conflicts, grouped by weekday.
 *
 * Usage:
 *   node market-overlap.js [calendars-dir]
 *
 * Output:
 *   - Earliest overlap date
 *   - Recurring overlap groups by weekday (with time windows + markets)
 *   - Special note on Logan Square Opening Day (one-off vs weekly series)
 *
 * Timezone: America/Chicago (CDT = UTC−5 Apr–Oct 2026; CST = UTC−6 Nov–Mar)
 * All market times in the ICS files are local Chicago time (TZID=America/Chicago).
 */

'use strict';

const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

/** ISO date string that limits how far we expand recurring events. */
const SEASON_END = '2026-11-01';

/**
 * SUMMARY substrings (case-insensitive) that classify an event as a market.
 * Checked in order; first match wins "include".
 */
const MARKET_INCLUDE_KEYWORDS = [
  'FM',
  'Farmers Market',
  'Farmer\'s Market',
  'Market',
  'Opening Day',
];

/**
 * SUMMARY substrings (case-insensitive) that force exclusion even if an
 * include keyword also matches (personal / prep / logistics events).
 */
const MARKET_EXCLUDE_KEYWORDS = [
  'Prep',
  'Warehouse',
  'Meeting',
  'Refill',
  'Setup',
  'Pickup',
  'Delivery',
  'Supermarket',
  'Stock',
];

// ---------------------------------------------------------------------------
// Timezone helpers (America/Chicago)
// ---------------------------------------------------------------------------

/**
 * Returns the UTC offset in minutes for America/Chicago on a given local date.
 * CDT (UTC−5) runs from the second Sunday of March through the first Sunday of
 * November. All other dates are CST (UTC−6).
 * For 2026: DST starts 2026-03-08, ends 2026-11-01.
 */
function chicagoOffsetMinutes(localDateStr) {
  const d = new Date(localDateStr + 'T12:00:00Z'); // noon to avoid edge cases
  const year = d.getUTCFullYear();

  // Second Sunday of March
  const dstStart = nthWeekdayOfMonth(year, 3, 0, 2); // month=3 (March), dow=0 (Sun), n=2
  // First Sunday of November
  const dstEnd = nthWeekdayOfMonth(year, 11, 0, 1); // month=11 (Nov), dow=0 (Sun), n=1

  const date = new Date(localDateStr + 'T12:00:00Z');
  if (date >= dstStart && date < dstEnd) {
    return -5 * 60; // CDT
  }
  return -6 * 60; // CST
}

/** Returns a Date object for the nth occurrence of a weekday in a month/year. */
function nthWeekdayOfMonth(year, month, dow, n) {
  // month is 1-based; dow 0=Sun
  const d = new Date(Date.UTC(year, month - 1, 1));
  let count = 0;
  while (true) {
    if (d.getUTCDay() === dow) {
      count++;
      if (count === n) return new Date(d);
    }
    d.setUTCDate(d.getUTCDate() + 1);
    if (d.getUTCMonth() !== month - 1) break;
  }
  return null;
}

// ---------------------------------------------------------------------------
// ICS parsing
// ---------------------------------------------------------------------------

/**
 * Unfolds RFC 5545 folded lines (continuation lines start with a space/tab).
 */
function unfoldLines(text) {
  return text.replace(/\r?\n[ \t]/g, '');
}

/**
 * Extracts raw VEVENT blocks from ICS text.
 * Returns an array of strings, each containing the content between
 * BEGIN:VEVENT and END:VEVENT.
 */
function extractVevents(icsText) {
  const unfolded = unfoldLines(icsText);
  const blocks = [];
  const re = /BEGIN:VEVENT([\s\S]*?)END:VEVENT/g;
  let m;
  while ((m = re.exec(unfolded)) !== null) {
    blocks.push(m[1]);
  }
  return blocks;
}

/**
 * Gets the value of a property from a VEVENT block.
 * Supports properties with parameters (e.g., DTSTART;TZID=...:value).
 * Returns null if not found.
 */
function getProp(vevent, name) {
  // Match "NAME" or "NAME;params" at start of line
  const re = new RegExp(`(?:^|\\n)${name}(?:;[^:]*)?:([^\\n]*)`, 'i');
  const m = vevent.match(re);
  return m ? m[1].trim() : null;
}

/**
 * Gets all values of a repeating property (e.g., EXDATE may appear multiple
 * times or contain comma-separated values).
 */
function getAllProps(vevent, name) {
  const re = new RegExp(`(?:^|\\n)${name}(?:;[^:]*)?:([^\\n]*)`, 'gi');
  const results = [];
  let m;
  while ((m = re.exec(vevent)) !== null) {
    // Each value may itself be comma-separated
    m[1].trim().split(',').forEach(v => {
      const s = v.trim();
      if (s) results.push(s);
    });
  }
  return results;
}

/**
 * Parses an ICS datetime string to a local date string (YYYY-MM-DD) and
 * minutes-since-midnight in Chicago local time.
 *
 * Supported formats:
 *   - 20260503T063000           (local / "floating")
 *   - 20260503T113000Z          (UTC)
 *   - value of DTSTART;TZID=America/Chicago:20260503T063000
 *
 * For TZID=America/Chicago the string is already in local time.
 * For UTC 'Z' strings we convert to Chicago local time.
 */
function parseIcsDt(dtStr) {
  if (!dtStr) return null;
  const clean = dtStr.replace(/\s/g, '');

  let year, month, day, hour, min, sec, isUtc;

  if (clean.endsWith('Z')) {
    // UTC datetime
    isUtc = true;
    const d = clean.slice(0, -1);
    year = parseInt(d.slice(0, 4), 10);
    month = parseInt(d.slice(4, 6), 10);
    day = parseInt(d.slice(6, 8), 10);
    hour = parseInt(d.slice(9, 11), 10);
    min = parseInt(d.slice(11, 13), 10);
    sec = parseInt(d.slice(13, 15), 10) || 0;
  } else if (clean.includes('T')) {
    // Local datetime (floating or TZID-qualified)
    isUtc = false;
    year = parseInt(clean.slice(0, 4), 10);
    month = parseInt(clean.slice(4, 6), 10);
    day = parseInt(clean.slice(6, 8), 10);
    hour = parseInt(clean.slice(9, 11), 10);
    min = parseInt(clean.slice(11, 13), 10);
    sec = parseInt(clean.slice(13, 15), 10) || 0;
  } else {
    // DATE-only (e.g., 20260412)
    year = parseInt(clean.slice(0, 4), 10);
    month = parseInt(clean.slice(4, 6), 10);
    day = parseInt(clean.slice(6, 8), 10);
    hour = 0; min = 0; sec = 0; isUtc = false;
  }

  const dateStr = `${String(year).padStart(4, '0')}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  if (isUtc) {
    // Convert UTC to Chicago local time
    const offsetMin = chicagoOffsetMinutes(dateStr);
    let totalMin = hour * 60 + min + offsetMin;
    let d = new Date(Date.UTC(year, month - 1, day));
    d.setUTCMinutes(d.getUTCMinutes() + totalMin);
    // totalMin may roll over to next/prev day
    const localDate = d.toISOString().slice(0, 10);
    const localMin = (totalMin % (24 * 60) + 24 * 60) % (24 * 60);
    return { date: localDate, minuteOfDay: localMin };
  }

  return {
    date: dateStr,
    minuteOfDay: hour * 60 + min,
  };
}

/**
 * Parses RRULE string into an object.
 * Supports FREQ=WEEKLY, BYDAY, UNTIL, COUNT.
 */
function parseRrule(rruleStr) {
  const rule = {};
  rruleStr.split(';').forEach(part => {
    const [key, val] = part.split('=');
    rule[key.trim().toUpperCase()] = val ? val.trim() : '';
  });
  return rule;
}

/** Maps two-letter BYDAY abbreviations to JS getUTCDay() values (0=Sun). */
const BYDAY_MAP = { SU: 0, MO: 1, TU: 2, WE: 3, TH: 4, FR: 5, SA: 6 };

/** Maps JS getUTCDay() → day name. */
const DOW_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

/**
 * Advances a YYYY-MM-DD date string by `days` days.
 */
function addDays(dateStr, days) {
  const d = new Date(dateStr + 'T12:00:00Z');
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/**
 * Returns the day-of-week (0=Sun) for a YYYY-MM-DD string.
 */
function getDow(dateStr) {
  return new Date(dateStr + 'T12:00:00Z').getUTCDay();
}

/**
 * Expands a single VEVENT (possibly recurring) into a list of concrete
 * occurrence objects: { summary, date, startMin, endMin, isOneOff, source }
 *
 * @param {string} vevent  - Raw VEVENT block text
 * @param {string} source  - Filename (for reference)
 * @returns {Array}
 */
function expandVevent(vevent, source) {
  const summary = getProp(vevent, 'SUMMARY') || '(no title)';
  const dtStartRaw = getProp(vevent, 'DTSTART');
  const dtEndRaw = getProp(vevent, 'DTEND');
  const rruleRaw = getProp(vevent, 'RRULE');
  const exdateValues = getAllProps(vevent, 'EXDATE');

  if (!dtStartRaw) return [];

  const dtStart = parseIcsDt(dtStartRaw);
  const dtEnd = dtEndRaw ? parseIcsDt(dtEndRaw) : dtStart;

  const durationMin = (() => {
    // Duration = end.minuteOfDay - start.minuteOfDay, handling overnight
    const startMinDate = new Date(dtStart.date + 'T12:00:00Z');
    const endMinDate = new Date(dtEnd.date + 'T12:00:00Z');
    const dayDiff = (endMinDate - startMinDate) / (1000 * 60 * 60 * 24);
    return dayDiff * 24 * 60 + (dtEnd.minuteOfDay - dtStart.minuteOfDay);
  })();

  // Parse excluded dates
  const exdateSet = new Set();
  exdateValues.forEach(val => {
    const parsed = parseIcsDt(val);
    if (parsed) exdateSet.add(parsed.date);
  });

  const occurrences = [];

  if (!rruleRaw) {
    // One-off event
    if (!exdateSet.has(dtStart.date)) {
      occurrences.push({
        summary,
        date: dtStart.date,
        startMin: dtStart.minuteOfDay,
        endMin: dtStart.minuteOfDay + durationMin,
        isOneOff: true,
        source,
      });
    }
    return occurrences;
  }

  // Recurring event
  const rule = parseRrule(rruleRaw);

  if (rule.FREQ !== 'WEEKLY') {
    // Only weekly recurrence is relevant for these markets
    console.warn(`[WARN] Unsupported RRULE FREQ="${rule.FREQ}" in ${source} — skipping.`);
    return occurrences;
  }

  const bydays = rule.BYDAY
    ? rule.BYDAY.split(',').map(d => BYDAY_MAP[d.replace(/[+-\d]/g, '').toUpperCase()])
    : [getDow(dtStart.date)];

  const count = rule.COUNT ? parseInt(rule.COUNT, 10) : Infinity;
  const until = rule.UNTIL ? parseIcsDt(rule.UNTIL).date : SEASON_END;
  const maxDate = until < SEASON_END ? until : SEASON_END;

  let current = dtStart.date;
  let occCount = 0;

  while (current <= maxDate && occCount < count) {
    const dow = getDow(current);
    if (bydays.includes(dow)) {
      if (!exdateSet.has(current)) {
        occurrences.push({
          summary,
          date: current,
          startMin: dtStart.minuteOfDay,
          endMin: dtStart.minuteOfDay + durationMin,
          isOneOff: false,
          source,
        });
        occCount++;
      }
    }
    current = addDays(current, 1);
  }

  return occurrences;
}

// ---------------------------------------------------------------------------
// Market filtering
// ---------------------------------------------------------------------------

function isMarketEvent(summary) {
  const s = summary.toLowerCase();

  for (const kw of MARKET_EXCLUDE_KEYWORDS) {
    if (s.includes(kw.toLowerCase())) return false;
  }

  for (const kw of MARKET_INCLUDE_KEYWORDS) {
    if (s.toLowerCase().includes(kw.toLowerCase())) return true;
  }

  return false;
}

// ---------------------------------------------------------------------------
// Overlap detection
// ---------------------------------------------------------------------------

/**
 * Returns true if two time windows (in minutes-since-midnight) overlap.
 * Touching at a single point (start2 === end1) does NOT count as overlap.
 */
function timesOverlap(start1, end1, start2, end2) {
  return start1 < end2 && start2 < end1;
}

/** Formats a minutes-since-midnight value as HH:MM. */
function fmtMin(m) {
  const h = Math.floor(m / 60);
  const min = m % 60;
  return `${String(h).padStart(2, '0')}:${String(min).padStart(2, '0')}`;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  const calDir = process.argv[2] || path.join(__dirname, 'calendars');

  if (!fs.existsSync(calDir)) {
    console.error(`Calendar directory not found: ${calDir}`);
    process.exit(1);
  }

  const icsFiles = fs.readdirSync(calDir).filter(f => f.endsWith('.ics'));

  if (icsFiles.length === 0) {
    console.error('No .ics files found in', calDir);
    process.exit(1);
  }

  // 1. Parse all events
  const allOccurrences = [];

  for (const file of icsFiles) {
    const content = fs.readFileSync(path.join(calDir, file), 'utf8');
    const vevents = extractVevents(content);

    for (const ve of vevents) {
      const expanded = expandVevent(ve, file);
      allOccurrences.push(...expanded);
    }
  }

  // 2. Filter to market-only events
  const marketOccurrences = allOccurrences.filter(e => isMarketEvent(e.summary));

  // Separate out the Logan Square Opening Day one-off from the weekly markets
  const loganOpeningDay = marketOccurrences.filter(
    e => e.isOneOff && e.summary.toLowerCase().includes('opening day')
  );
  const weeklyMarkets = marketOccurrences.filter(
    e => !(e.isOneOff && e.summary.toLowerCase().includes('opening day'))
  );

  // 3. Group occurrences by date
  const byDate = {};
  for (const occ of weeklyMarkets) {
    (byDate[occ.date] = byDate[occ.date] || []).push(occ);
  }

  // 4. Find all overlapping pairs by date
  const overlapsByDate = {};

  for (const [date, events] of Object.entries(byDate)) {
    for (let i = 0; i < events.length; i++) {
      for (let j = i + 1; j < events.length; j++) {
        const a = events[i];
        const b = events[j];
        if (timesOverlap(a.startMin, a.endMin, b.startMin, b.endMin)) {
          const overlapStart = Math.max(a.startMin, b.startMin);
          const overlapEnd = Math.min(a.endMin, b.endMin);
          (overlapsByDate[date] = overlapsByDate[date] || []).push({
            marketA: a.summary,
            marketB: b.summary,
            windowA: `${fmtMin(a.startMin)}–${fmtMin(a.endMin)}`,
            windowB: `${fmtMin(b.startMin)}–${fmtMin(b.endMin)}`,
            overlapWindow: `${fmtMin(overlapStart)}–${fmtMin(overlapEnd)}`,
            date,
          });
        }
      }
    }
  }

  // Also check Logan Square Opening Day for conflicts with same-day weekly markets
  const openingDayConflicts = [];
  for (const lodEvent of loganOpeningDay) {
    const same = weeklyMarkets.filter(e => e.date === lodEvent.date);
    for (const other of same) {
      if (timesOverlap(lodEvent.startMin, lodEvent.endMin, other.startMin, other.endMin)) {
        const overlapStart = Math.max(lodEvent.startMin, other.startMin);
        const overlapEnd = Math.min(lodEvent.endMin, other.endMin);
        openingDayConflicts.push({
          date: lodEvent.date,
          marketA: lodEvent.summary,
          marketB: other.summary,
          windowA: `${fmtMin(lodEvent.startMin)}–${fmtMin(lodEvent.endMin)}`,
          windowB: `${fmtMin(other.startMin)}–${fmtMin(other.endMin)}`,
          overlapWindow: `${fmtMin(overlapStart)}–${fmtMin(overlapEnd)}`,
        });
      }
    }
  }

  // 5. Sort overlap dates
  const sortedDates = Object.keys(overlapsByDate).sort();
  const earliestDate = sortedDates[0] || null;

  // 6. Build recurring overlap groups by weekday
  //    A "recurring group" is a set of (marketA, marketB) pairs that recur
  //    on the same weekday.
  const recurringGroups = {}; // key: "DOW|marketA|marketB"
  for (const [date, overlaps] of Object.entries(overlapsByDate)) {
    const dow = getDow(date);
    const dowName = DOW_NAMES[dow];
    for (const ov of overlaps) {
      const key = `${dowName}|${[ov.marketA, ov.marketB].sort().join('|')}`;
      if (!recurringGroups[key]) {
        recurringGroups[key] = {
          dowName,
          marketA: ov.marketA,
          marketB: ov.marketB,
          windowA: ov.windowA,
          windowB: ov.windowB,
          overlapWindow: ov.overlapWindow,
          firstDate: date,
          count: 0,
        };
      }
      recurringGroups[key].count++;
    }
  }

  // Group by DOW
  const byDow = {};
  for (const grp of Object.values(recurringGroups)) {
    (byDow[grp.dowName] = byDow[grp.dowName] || []).push(grp);
  }

  // 7. Produce output
  const lines = [];

  lines.push('# Market Overlap Report');
  lines.push('');
  lines.push(`**Generated:** ${new Date().toISOString().slice(0, 10)}`);
  lines.push(`**Timezone:** America/Chicago`);
  lines.push(`**Season window analyzed:** 2026-04-27 → ${SEASON_END}`);
  lines.push('');
  lines.push('> Only **market-vs-market** conflicts are shown.');
  lines.push('> Personal / prep / logistics events are excluded.');
  lines.push('');

  // --- Earliest overlap ---
  if (earliestDate) {
    const dayName = DOW_NAMES[getDow(earliestDate)];
    lines.push(`## Earliest Market Overlap`);
    lines.push('');
    lines.push(`**${earliestDate} (${dayName})**`);
    lines.push('');
    for (const ov of overlapsByDate[earliestDate]) {
      lines.push(`- **${ov.marketA}** (${ov.windowA})  `);
      lines.push(`  vs **${ov.marketB}** (${ov.windowB})  `);
      lines.push(`  → overlap window: **${ov.overlapWindow}**`);
    }
    lines.push('');
  } else {
    lines.push('## Earliest Market Overlap');
    lines.push('');
    lines.push('No market-vs-market overlaps found in the analysed period.');
    lines.push('');
  }

  // --- Recurring groups by weekday ---
  lines.push('## Recurring Overlap Groups by Weekday');
  lines.push('');

  const DOW_ORDER = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  for (const dow of DOW_ORDER) {
    if (!byDow[dow]) continue;
    lines.push(`### ${dow}s`);
    lines.push('');
    for (const grp of byDow[dow]) {
      lines.push(`#### ${grp.marketA} ↔ ${grp.marketB}`);
      lines.push('');
      lines.push(`| | Time window |`);
      lines.push(`|---|---|`);
      lines.push(`| ${grp.marketA} | ${grp.windowA} |`);
      lines.push(`| ${grp.marketB} | ${grp.windowB} |`);
      lines.push(`| **Overlap** | **${grp.overlapWindow}** |`);
      lines.push('');
      lines.push(`- First occurrence: **${grp.firstDate}**`);
      lines.push(`- Recurs every ${dow} (${grp.count} dates through ${SEASON_END})`);
      lines.push('');
    }
  }

  // --- Logan Square Opening Day note ---
  lines.push('---');
  lines.push('');
  lines.push('## Logan Square Opening Day (2026-04-12) — Clarification');
  lines.push('');
  lines.push(
    'The ICS file contains **two separate events** for Logan Square:'
  );
  lines.push('');
  lines.push(
    '1. **Logan Square Opening Day** — one-off event on 2026-04-12 (06:00–14:00).'
  );
  lines.push(
    '   This is **not** part of the weekly market series and falls before any other'
  );
  lines.push(
    '   market opens, so it does **not** create a market-vs-market conflict.'
  );
  lines.push(
    '   It is excluded from the recurring overlap summary above.'
  );
  lines.push('');
  lines.push(
    '2. **Logan Square FM** (weekly series) — starts **2026-05-10**, every Sunday 06:30–15:00.'
  );
  lines.push(
    '   This is the series that conflicts with Wicker Park FM beginning on 2026-05-10.'
  );
  lines.push('');

  if (openingDayConflicts.length > 0) {
    lines.push(
      '> **Note:** Logan Square Opening Day (2026-04-12) also conflicts with ' +
      'the following markets on the same day:'
    );
    for (const ov of openingDayConflicts) {
      lines.push(`> - **${ov.marketB}** (${ov.windowB}) → overlap: ${ov.overlapWindow}`);
    }
    lines.push('');
  } else {
    lines.push(
      '> Logan Square Opening Day (2026-04-12) has **no conflicts** with any other'
    );
    lines.push('> market on that date in the provided calendars.');
    lines.push('');
  }

  // --- Raw overlap listing ---
  lines.push('---');
  lines.push('');
  lines.push('## All Overlap Dates (chronological)');
  lines.push('');
  lines.push('| Date | Day | Market A | Window A | Market B | Window B | Overlap |');
  lines.push('|------|-----|----------|----------|----------|----------|---------|');

  for (const date of sortedDates) {
    const dow = DOW_NAMES[getDow(date)];
    for (const ov of overlapsByDate[date]) {
      lines.push(
        `| ${date} | ${dow} | ${ov.marketA} | ${ov.windowA} | ${ov.marketB} | ${ov.windowB} | ${ov.overlapWindow} |`
      );
    }
  }

  lines.push('');

  const output = lines.join('\n');

  // Print to stdout
  console.log(output);

  // Write markdown report
  const outFile = path.join(__dirname, 'MARKET_OVERLAPS.md');
  fs.writeFileSync(outFile, output, 'utf8');
  console.error(`\nReport written to: ${outFile}`);
}

main();
