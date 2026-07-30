# Market Overlap Tool

Parses `.ics` calendar files and finds all **market-vs-market** time-window
conflicts for staffing planning purposes.

## Quick Start

```bash
node tools/market-overlap/market-overlap.js
```

The script reads every `.ics` file in `tools/market-overlap/calendars/` and
writes the overlap report to `tools/market-overlap/MARKET_OVERLAPS.md`.

To point the script at a different calendar directory:

```bash
node tools/market-overlap/market-overlap.js /path/to/your/calendars
```

## What it does

1. Parses all VEVENT blocks (recurring + one-off) from each `.ics` file.
2. Filters to **market events only** (events whose SUMMARY contains keywords
   such as `FM`, `Farmers Market`, `Market`, `Opening Day`). Personal, prep,
   warehouse, and logistics events are automatically excluded.
3. Expands recurring `RRULE:FREQ=WEEKLY` events through the end of the 2026
   season, respecting:
   - `UNTIL` cut-off dates
   - `EXDATE` excluded dates
   - `COUNT` limits
4. Detects time-window overlaps on the same calendar date (any overlap ≥ 1
   minute counts).
5. Groups overlaps by **weekday** into recurring conflict patterns.
6. Outputs a Markdown report with:
   - **Earliest overlap date**
   - **Recurring overlap groups** by weekday (time windows + involved markets)
   - **All overlap dates** in a chronological table
   - A **clarification note** on Logan Square Opening Day vs the weekly series

## Timezone

All times are in **America/Chicago** (CDT = UTC−5 in summer; CST = UTC−6 in
winter). ICS files must use `TZID=America/Chicago` or UTC (`Z`-suffixed)
datetimes.

## Updating calendars

Drop (or replace) `.ics` files in the `calendars/` sub-directory and re-run
the script. File names are for reference only; all event data is read from
inside each file.

## Current calendars

| File | Market | Day | Window |
|------|--------|-----|--------|
| `wicker-park-fm.ics` | Wicker Park FM | Sunday | 06:30–15:00 |
| `logan-square-fm.ics` | Logan Square FM (weekly) | Sunday | 06:30–15:00 |
| `logan-square-fm.ics` | Logan Square Opening Day (one-off) | — | 06:00–14:00 |
| `evanston-fm.ics` | Evanston FM | Saturday | 06:30–14:00 |
| `andersonville-fm.ics` | Andersonville FM | Wednesday | 13:30–20:00 |
| `naperville-fm.ics` | Naperville FM | Saturday | 05:30–14:00 |
| `winnetka-fm.ics` | Winnetka FM | Saturday | 06:00–13:30 |
| `elmhurst-fm.ics` | Elmhurst FM | Wednesday | 05:30–14:00 |
| `celebrate-highwood-fm.ics` | Celebrate Highwood Evening Gourmet Market | Wednesday | 15:30–22:00 |

## Key findings (2026 season)

### Earliest overlap
**2026-05-10 (Sunday)** — Logan Square FM ↔ Wicker Park FM (full overlap
06:30–15:00). Both markets run the identical time window every Sunday.

### Recurring conflict summary

| Weekday | Market pair | Overlap window | First date |
|---------|-------------|----------------|------------|
| Sunday | Logan Square FM ↔ Wicker Park FM | 06:30–15:00 | 2026-05-10 |
| Wednesday | Andersonville FM ↔ Elmhurst FM | 13:30–14:00 | 2026-06-03 |
| Wednesday | Andersonville FM ↔ Celebrate Highwood | 15:30–20:00 | 2026-06-03 |
| Saturday | Evanston FM ↔ Naperville FM | 06:30–14:00 | 2026-06-06 |
| Saturday | Evanston FM ↔ Winnetka FM | 06:30–13:30 | 2026-06-06 |
| Saturday | Naperville FM ↔ Winnetka FM | 06:00–13:30 | 2026-06-06 |

### Logan Square Opening Day (2026-04-12)
This is a **one-off** event, not part of the weekly Logan Square FM series
(which starts 2026-05-10). It falls before any other market opens and produces
no market-vs-market conflict. It is excluded from the recurring overlap table
but flagged in the report for awareness.
