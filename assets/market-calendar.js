/**
 * Market Calendar Overlap Calculator
 *
 * Computes scheduling conflicts between recurring farmers-market events
 * and one-off events. All local times are in America/Chicago (CDT = UTC−5
 * during the summer season covered here).
 *
 * Data sourced from the .ics calendars uploaded to the project space.
 */
(function () {
  'use strict';

  /* ─── helpers ─────────────────────────────────────────────────────── */

  /** Convert hours + minutes to minutes-since-midnight. */
  function toMin(h, m) { return h * 60 + m; }

  /** Format minutes-since-midnight as HH:MM. */
  function fmtTime(min) {
    var h = Math.floor(min / 60);
    var m = min % 60;
    return pad(h) + ':' + pad(m);
  }

  function pad(n) { return n < 10 ? '0' + n : '' + n; }

  /** Parse 'YYYY-MM-DD' → local-midnight Date. */
  function parseDate(s) {
    var p = s.split('-');
    return new Date(+p[0], +p[1] - 1, +p[2]);
  }

  /** Date → 'YYYY-MM-DD' string. */
  function dateStr(d) {
    return d.getFullYear() + '-' + pad(d.getMonth() + 1) + '-' + pad(d.getDate());
  }

  /** Friendly display string for a date. */
  function displayDate(d) {
    var days   = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    var months = ['January','February','March','April','May','June',
                  'July','August','September','October','November','December'];
    return days[d.getDay()] + ', ' + months[d.getMonth()] + ' ' + d.getDate() + ', ' + d.getFullYear();
  }

  /** Do two [start, end) windows share any minutes? */
  function overlaps(a, b) {
    return Math.max(a.start, b.start) < Math.min(a.end, b.end);
  }

  /* ─── market data ─────────────────────────────────────────────────── */

  /**
   * RECURRING markets.
   *   dow         : 0 = Sunday … 6 = Saturday
   *   start / end : minutes-since-midnight (America/Chicago local time)
   *   seasonStart : first possible occurrence date (YYYY-MM-DD)
   *   seasonEnd   : last  possible occurrence date (YYYY-MM-DD)
   *   exdates     : Set of 'YYYY-MM-DD' strings that are EXCLUDED
   *
   * Note: Wicker Park FM, Andersonville FM, and Naperville FM have
   * additional EXDATEs in the source .ics files that are not fully
   * enumerated here; actual conflict count may be lower.
   */
  var MARKETS = [
    {
      name: 'Andersonville FM',
      dow: 3,                            // Wednesday
      start: toMin(13, 30), end: toMin(20,  0),
      seasonStart: '2026-05-13', seasonEnd: '2026-10-21',
      exdates: new Set([])               // additional EXDATEs not listed in summary
    },
    {
      name: 'Edgewater FM',
      dow: 1,                            // Monday
      start: toMin(13, 30), end: toMin(20,  0),
      seasonStart: '2026-06-01', seasonEnd: '2026-09-28',
      exdates: new Set([])
    },
    {
      name: 'Logan Square FM',
      dow: 0,                            // Sunday
      start: toMin( 6, 30), end: toMin(15,  0),
      seasonStart: '2026-05-10', seasonEnd: '2026-10-25',
      exdates: new Set(['2026-05-17'])    // regular recurrence excluded this day;
      // an extra one-off series on 2026-05-17 is handled below as ONE_OFF
    },
    {
      name: 'Wicker Park FM',
      dow: 0,                            // Sunday
      start: toMin( 6, 30), end: toMin(15,  0),
      seasonStart: '2026-05-03', seasonEnd: '2026-10-25',
      exdates: new Set([])               // many EXDATEs not fully specified
    },
    {
      name: 'Mt Prospect FM',
      dow: 0,                            // Sunday
      start: toMin( 6, 30), end: toMin(14,  0),
      seasonStart: '2026-06-07', seasonEnd: '2026-10-25',
      exdates: new Set([])
    },
    {
      name: 'Naperville FM',
      dow: 6,                            // Saturday
      start: toMin( 5, 30), end: toMin(14,  0),
      seasonStart: '2026-06-06', seasonEnd: '2026-10-31',
      exdates: new Set([])               // additional EXDATEs not listed in summary
    },
    {
      name: 'Park Ridge FM',
      dow: 6,                            // Saturday
      start: toMin( 5, 30), end: toMin(14,  0),
      seasonStart: '2026-06-13', seasonEnd: '2026-10-31',
      exdates: new Set([])               // override on 2026-06-27 (details unspecified)
    },
    {
      name: 'Schaumburg FM',
      dow: 5,                            // Friday
      start: toMin( 5, 30), end: toMin(14,  0),
      seasonStart: '2026-06-05', seasonEnd: '2026-10-30',
      exdates: new Set([])
    },
    {
      name: 'Winnetka FM',
      dow: 6,                            // Saturday
      start: toMin( 6,  0), end: toMin(13, 30),
      seasonStart: '2026-06-06', seasonEnd: '2026-10-31',
      exdates: new Set([])
    },
    {
      name: 'Argyle Night Market',
      dow: 4,                            // Thursday
      start: toMin(15, 30), end: toMin(22,  0),
      seasonStart: '2026-07-02', seasonEnd: '2026-08-27',
      exdates: new Set([])
    },
    {
      name: 'Celebrate Highwood',
      dow: 3,                            // Wednesday
      start: toMin(15, 30), end: toMin(22,  0),
      seasonStart: '2026-06-03', seasonEnd: '2026-08-26',
      exdates: new Set([])
    },
    {
      name: 'Elmhurst FM',
      dow: 3,                            // Wednesday
      start: toMin( 5, 30), end: toMin(14,  0),
      seasonStart: '2026-06-03', seasonEnd: '2026-10-28',
      exdates: new Set([])
    },
    {
      name: 'Evanston FM',
      dow: 6,                            // Saturday
      start: toMin( 6, 30), end: toMin(14,  0),
      seasonStart: '2026-05-02', seasonEnd: '2026-11-21',
      exdates: new Set([])
    }
  ];

  /**
   * ONE-OFF events (single-date occurrences).
   * UTC times converted to CDT (UTC−5):
   *   Ravinia   11:00Z–19:00Z  →  06:00–14:00 CDT
   *   Hinsdale  10:30Z–19:00Z  →  05:30–14:00 CDT
   *
   * Logan Square extra series on 2026-05-17 (same 06:30–15:00 window,
   * replacing the excluded regular recurrence that day).
   *
   * Lake Geneva dates/times were not fully specified in the uploaded data
   * and are omitted here.
   */
  var ONE_OFF = [
    {
      name: 'Logan Square FM (extra)',
      date: '2026-05-17',
      start: toMin( 6, 30), end: toMin(15,  0)
    },
    {
      name: 'Ravinia',
      date: '2026-06-03',
      start: toMin( 6,  0), end: toMin(14,  0)   // 11:00Z–19:00Z → CDT
    },
    {
      name: 'Hinsdale',
      date: '2026-06-15',
      start: toMin( 5, 30), end: toMin(14,  0)   // 10:30Z–19:00Z → CDT
    }
  ];

  /* ─── overlap engine ──────────────────────────────────────────────── */

  function isActive(market, date) {
    var ds = dateStr(date);
    if (date < parseDate(market.seasonStart)) return false;
    if (date > parseDate(market.seasonEnd))   return false;
    if (date.getDay() !== market.dow)         return false;
    if (market.exdates.has(ds))               return false;
    return true;
  }

  /**
   * Walk every date from searchStart through searchEnd, collect all
   * active markets, then find every overlapping pair.
   * Returns an object keyed by 'YYYY-MM-DD' → array of conflict objects.
   */
  function computeOverlaps(searchStart, searchEnd) {
    var results = {};
    var cur = new Date(searchStart);

    while (cur <= searchEnd) {
      var ds = dateStr(cur);
      var active = [];

      /* recurring markets */
      for (var i = 0; i < MARKETS.length; i++) {
        var m = MARKETS[i];
        if (isActive(m, cur)) {
          active.push({ name: m.name, start: m.start, end: m.end });
        }
      }

      /* one-off events */
      for (var j = 0; j < ONE_OFF.length; j++) {
        var ev = ONE_OFF[j];
        if (ev.date === ds) {
          active.push({ name: ev.name, start: ev.start, end: ev.end });
        }
      }

      /* find all overlapping pairs */
      for (var a = 0; a < active.length; a++) {
        for (var b = a + 1; b < active.length; b++) {
          var ma = active[a], mb = active[b];
          if (overlaps(ma, mb)) {
            if (!results[ds]) results[ds] = [];
            results[ds].push({
              market1:     ma.name,
              market2:     mb.name,
              times1:      fmtTime(ma.start) + '\u2013' + fmtTime(ma.end),
              times2:      fmtTime(mb.start) + '\u2013' + fmtTime(mb.end),
              overlapWin:  fmtTime(Math.max(ma.start, mb.start)) + '\u2013' +
                           fmtTime(Math.min(ma.end,   mb.end))
            });
          }
        }
      }

      cur.setDate(cur.getDate() + 1);
    }

    return results;
  }

  /* ─── DOM rendering ───────────────────────────────────────────────── */

  function render() {
    var container = document.getElementById('market-overlap-results');
    if (!container) return;

    var today      = parseDate('2026-04-27');
    var searchEnd  = parseDate('2026-11-30');
    var overlaps   = computeOverlaps(today, searchEnd);
    var dates      = Object.keys(overlaps).sort();

    if (dates.length === 0) {
      container.innerHTML = '<p class="no-conflicts">No scheduling conflicts found in the season.</p>';
      return;
    }

    var firstDate  = dates[0];
    var firstConf  = overlaps[firstDate];
    var totalConf  = dates.reduce(function (n, d) { return n + overlaps[d].length; }, 0);

    /* --- summary banner --- */
    var html = '<div class="mco-banner">'
      + '<div class="mco-banner__icon">⚠️</div>'
      + '<div class="mco-banner__body">'
      + '<h2 class="mco-banner__heading">First conflict: '
      + displayDate(parseDate(firstDate)) + '</h2>'
      + '<p class="mco-banner__sub">'
      + firstConf.length + ' pair' + (firstConf.length > 1 ? 's' : '')
      + ' of markets overlap on this date. '
      + totalConf + ' total conflict' + (totalConf > 1 ? 's' : '')
      + ' across ' + dates.length + ' date' + (dates.length > 1 ? 's' : '')
      + ' through end of season.</p>'
      + '</div></div>';

    /* --- conflict list --- */
    html += '<div class="mco-list">';
    for (var di = 0; di < dates.length; di++) {
      var ds    = dates[di];
      var pairs = overlaps[ds];
      var isFirst = ds === firstDate;
      html += '<div class="mco-date' + (isFirst ? ' mco-date--first' : '') + '">'
        + '<h3 class="mco-date__heading">'
        + (isFirst ? '<span class="mco-badge">FIRST</span> ' : '')
        + displayDate(parseDate(ds)) + '</h3>'
        + '<ul class="mco-pairs">';

      for (var pi = 0; pi < pairs.length; pi++) {
        var p = pairs[pi];
        html += '<li class="mco-pair">'
          + '<span class="mco-pair__name">' + escHtml(p.market1) + '</span>'
          + ' <span class="mco-pair__times">(' + p.times1 + ')</span>'
          + ' <span class="mco-pair__vs">↔</span> '
          + '<span class="mco-pair__name">' + escHtml(p.market2) + '</span>'
          + ' <span class="mco-pair__times">(' + p.times2 + ')</span>'
          + ' &mdash; overlap window: <strong>' + p.overlapWin + '</strong>'
          + '</li>';
      }

      html += '</ul></div>';
    }
    html += '</div>';

    container.innerHTML = html;
  }

  function escHtml(s) {
    return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  /* boot */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', render);
  } else {
    render();
  }

})();
