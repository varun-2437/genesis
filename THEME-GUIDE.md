# Theme Guide: PlaceHub

A restrained, enterprise look: neutral surfaces, one teal accent, small radii, thin borders, no gradients, no emojis.

## Setup (5 minutes)

```bash
npm i lucide-react
```

1. Copy `index.css` to `src/index.css` and `tailwind.config.js` to the project root.
2. Copy `ThemeProvider.jsx`, `ui.jsx`, `navIcons.js` to `src/components/` (or `src/theme/`).
3. Wrap the app: `<ThemeProvider><App /></ThemeProvider>`
4. Paste the no-flash script (bottom of `ThemeProvider.jsx`) into `index.html` `<head>`.
5. Put `<ThemeToggle />` in the Topbar.
6. Open `theme-preview.html` in a browser to see the target look.

## Change the whole look from one place

Everything is in the `:root` and `.dark` blocks of `index.css`.

| Want to change | Edit |
|---|---|
| Brand colour | `--accent`, `--accent-hover`, `--accent-soft`, `--accent-fg` (both light and dark) |
| Page / card colours | `--canvas`, `--surface`, `--surface-2` |
| Border strength | `--line`, `--line-strong` |
| Corner roundness | `borderRadius` in `tailwind.config.js` |
| Font | `fontFamily.sans` in config + the font import at top of `index.css` |

Alternative accent colours (light / dark):
- Navy: `30 64 175` / `124 156 245`
- Deep green: `21 128 61` / `74 190 120`
- Burgundy: `159 18 57` / `240 120 150`

## Rules that keep it from looking "AI-made"

**Do**
- Use semantic classes: `bg-surface`, `text-fg-muted`, `border-line`, `text-accent`, never raw `bg-gray-100` or `text-blue-500`.
- Use the shared classes: `card`, `btn-primary`, `btn-secondary`, `input`, `table`, `badge-*`, `nav-link`.
- Icons: **lucide-react only**, `size={16|18|20}` and `strokeWidth={1.75}`. One icon per concept, reused everywhere (see `navIcons.js`).
- Keep body text 14px, table text 13px, labels 12.5px. Page titles 22px.
- Left-align text. Right-align numbers in tables. Use `tabular` for figures.
- Use whitespace and 1px borders to separate things, not shadows or colour.
- Use skeletons for loading and `EmptyState` for empty lists.
- Status colours only for status (success, warning, danger, info).

**Don't**
- No emojis anywhere (buttons, headings, empty states, toasts).
- No gradients, glows, glassmorphism, or blurred blobs.
- No purple/indigo defaults. No rainbow stat cards. The icon square is always neutral.
- No `rounded-full` buttons or `rounded-2xl` cards. Pills only for avatars.
- No heavy drop shadows. Shadows only on popovers, menus, modals.
- No centred hero-style headings inside the app.
- No more than one primary button per section.

## Layout spec

| Part | Spec |
|---|---|
| Sidebar | 232px wide, `bg-surface`, right border, nav item 36px high, section labels 11px uppercase |
| Topbar | 56px high, `bg-surface`, bottom border: search left, theme toggle / bell / avatar right |
| Content | `bg-canvas`, padding 28px, max-width 1200px (tables may go full width) |
| Card | `bg-surface`, 1px `line` border, 8px radius, 20px padding |
| Grid gap | 16px between cards, 24px between sections |
| Table | Header on `surface-2`, uppercase 12px muted header text, 12px/16px cell padding, row hover |
| Modal | 480px (forms 640px), 10px radius, `shadow-pop`, header + body + footer with border |
| Buttons | 36px high (`btn-sm` = 32px), 6px radius, icon 16px + 8px gap |

## Component recipes

```jsx
// Page
<PageHeader title="Students" subtitle="1,248 registered" actions={<button className="btn-primary"><Plus size={16} strokeWidth={1.75}/>Add student</button>} />

// Stats row
<div className="grid grid-cols-4 gap-4">
  <StatCard label="Placed" value="862" icon={BadgeCheck} delta={12} />
</div>

// Table
<div className="table-wrap"><table className="table">...</table></div>

// Status
<StatusBadge status="shortlisted" />

// Form field
<Field label="Email" error={errors.email}><input className="input" {...register("email")} /></Field>

// Sidebar link (with React Router NavLink)
<NavLink to="/student/jobs" className={({isActive}) => `nav-link ${isActive ? "nav-link-active" : ""}`}>
  <Briefcase size={18} strokeWidth={1.75}/> Jobs
</NavLink>
```

## Charts (Recharts)

Use theme colours via CSS variables so charts follow dark mode:
```jsx
const c = (v) => `rgb(var(--${v}))`;
<Bar dataKey="placed" fill={c("accent")} radius={[3,3,0,0]} />
<CartesianGrid stroke={c("line")} vertical={false} />
<XAxis tick={{ fill: c("fg-muted"), fontSize: 12 }} axisLine={false} tickLine={false} />
```
Series order: `accent`, then `info`, `warning`, `fg-subtle`. Max 4 series per chart.

## Dark mode checklist
- Never hard-code `#fff` / `#000` / `bg-white` / `text-black`. Use tokens.
- Test every new page in both modes before committing.
- Images and logos: provide a version that works on dark, or place on a `surface-2` tile.

## Typography scale

| Use | Size / weight |
|---|---|
| Page title | 22px / 600 |
| Section title | 17px / 600 |
| Card title | 14px / 600 |
| Body | 14px / 400 |
| Table | 13px / 400 |
| Label, button | 12.5-13px / 500 |
| Caption / hint | 12px / 400, `fg-muted` |

---

# Responsive design rules

Design mobile-first: write the small-screen layout first, then add `md:` and `lg:` overrides. Student pages must be fully usable on a phone. Staff portals must work on a tablet and be comfortable on desktop.

## Breakpoints

| Device | Width | Tailwind | Layout |
|---|---|---|---|
| Mobile | below 768px | default | Sidebar hidden (opens as a drawer), single column |
| Tablet | 768 to 1023px | `md:` | Sidebar collapsed to icons only (64px), 2 columns |
| Desktop | 1024px and up | `lg:` | Full sidebar (232px), up to 4 columns |
| Large desktop | 1280px and up | `xl:` | Same as desktop; content stays at max-width 1200px |

## Shell (sidebar and topbar)

| Part | Mobile | Tablet | Desktop |
|---|---|---|---|
| Sidebar | Slide-in drawer from the left with a dim overlay; opened by a menu button in the topbar; closes on link click, overlay click or Esc | 64px icon-only rail; label shown as a tooltip on hover/focus | 232px with icon + label |
| Topbar | Menu button, page title, theme toggle, avatar. Search moves into an icon button | Search shortens to a smaller field | Full search field |
| Content padding | `p-4` | `md:p-6` | `lg:p-7` |

```jsx
<main className="p-4 md:p-6 lg:p-7 max-w-[1200px] mx-auto">
```

## Grids and cards

| Content | Classes |
|---|---|
| Stat cards | `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4` |
| Two-column pages (main + side) | `grid grid-cols-1 lg:grid-cols-3 gap-4`, main = `lg:col-span-2` |
| Card lists (jobs, drives, mentors) | `grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4` |
| Gap between sections | `gap-4` on mobile, `md:gap-6` after that |

Never use fixed pixel widths on containers. Use `w-full` with `max-w-*`.

## Tables

- Always wrap in a scroll container so the **page** never scrolls sideways:
  ```jsx
  <div className="table-wrap overflow-x-auto"><table className="table min-w-[640px]">...</table></div>
  ```
- Keep the most important column (name) first. Hide low-value columns on small screens: `hidden md:table-cell` on both the `th` and `td`.
- On the **Student portal**, long tables (applications, offers, jobs) switch to a **card list on mobile**: one card per row, label/value pairs stacked, with the status badge at the top right. Use `md:hidden` for the cards and `hidden md:block` for the table.
- Filters collapse into a "Filters" button that opens a drawer on mobile. On desktop they stay in a row above the table.
- Pagination: show only previous / next and the page number on mobile.

## Forms

- Mobile: one column. From `md:` up, use two columns for short fields: `grid grid-cols-1 md:grid-cols-2 gap-4`. Long fields (address, description) span both: `md:col-span-2`.
- Inputs must be at least **16px** font size on mobile, otherwise iOS zooms the screen when focused. Use `text-[16px] md:text-[14px]` on `.input` in student pages.
- Primary action at the bottom: full width on mobile (`w-full md:w-auto`), right-aligned from `md:`.
- Multi-step forms (profile, registration) show a compact step indicator ("Step 2 of 5") on mobile instead of the full stepper.

## Touch targets

On mobile every tappable item is at least **44 x 44px** (buttons `h-11`, icon buttons `h-11 w-11`, nav links `h-11`). Keep at least 8px between two tappable items. Desktop keeps the 36px sizes.

```jsx
<button className="btn-primary h-11 md:h-9">Apply</button>
```

## Modals, drawers, menus

| Item | Mobile | Desktop |
|---|---|---|
| Modal | Full-screen sheet (or bottom sheet) with a sticky footer for actions | Centred, 480px (forms 640px) |
| Side drawer | Full width | 400 to 480px from the right |
| Dropdown / menu | Becomes a bottom sheet if it has more than 5 items | Anchored popover |
| Calendar | Agenda (list) view by default | Month/week view |

## Charts and special screens

- Charts: set a fixed height (`h-64`), width 100%, use `ResponsiveContainer`. Reduce axis labels on mobile and move the legend below the chart.
- Test screen (online assessments): question and answer stacked vertically on mobile, question navigator opens as a drawer. The timer stays pinned at the top.
- Code editor: usable on tablet and desktop; on phones show a message recommending a larger screen.
- Dashboards: the most important card goes first in the DOM, since that is what mobile users see first.

## Always check

Test every page at **375px, 768px and 1280px**, in both light and dark mode. There must be no horizontal page scroll, no text cut off, and no overlapping elements.

---

# Accessibility standards

Target: **WCAG 2.1 AA**. Placement data affects people's careers, and the system serves all students, including those with disabilities. These are rules, not suggestions.

## Colour and contrast

- Body text and labels need a contrast ratio of at least **4.5:1**. Large text (18px+ or 14px+ bold) and UI borders or icons need **3:1**.
- `fg` and `fg-muted` pass on `canvas`, `surface` and `surface-2` in both modes. Use them for anything the user must read.
- `fg-subtle` is **only** for placeholders and decorative hints. Never use it for information the user needs.
- **Never rely on colour alone.** Badges already include text plus a dot. Error fields need an icon or message, not just a red border. Charts need legends or labels, not colour only.
- After changing any token in `index.css`, re-check contrast in both modes (browser DevTools shows the ratio).

## Keyboard navigation

- Every interactive item must be reachable with **Tab** and usable with **Enter** or **Space**. Use real `<button>`, `<a>`, `<input>`, `<select>`. Never put `onClick` on a `<div>`.
- Tab order follows the visual order. Don't use positive `tabIndex`.
- **Focus is always visible.** The theme gives every element a teal focus ring through `:focus-visible`. Never add `outline-none` without replacing it with a ring.
- Modals and drawers: move focus into them on open, **trap focus** inside, close on **Esc**, and return focus to the button that opened them.
- Menus and tabs: arrow keys move between items (Radix / Headless UI do this for you, so use them).
- Add a "Skip to main content" link as the first focusable element in `PortalLayout`:
  ```jsx
  <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-2 btn-primary">Skip to main content</a>
  <main id="main" tabIndex={-1}>
  ```
- Data tables with row actions: the action menu is a real button with a label (for example "Actions for Ananya Iyer").
- The online test screen must be fully operable by keyboard (select options, next/previous, flag question, submit).

## Forms and labels

- **Every input has a visible label** tied to it with `htmlFor` / `id`. A placeholder is never a substitute for a label.
- Mark required fields with text ("Required") or an asterisk plus `aria-required="true"`.
- Errors: show the message under the field, set `aria-invalid="true"` on the input, and link them with `aria-describedby`:
  ```jsx
  <label className="label" htmlFor="email">Email</label>
  <input id="email" className="input border-danger" aria-invalid="true" aria-describedby="email-error" />
  <p id="email-error" className="field-error">Enter a valid email address.</p>
  ```
- Error messages say what is wrong and how to fix it ("Enter a 10-digit mobile number"), not just "Invalid".
- Group related inputs (radio buttons, checkboxes) in a `<fieldset>` with a `<legend>`.
- On submit failure, move focus to the first invalid field or to an error summary at the top of the form.
- Use the right `type` and `autocomplete` (`email`, `tel`, `new-password`) so browsers and screen readers help.

## Icons, images and media

- Icon-only buttons need `aria-label` (for example, the theme toggle, bell, close, download).
- Decorative icons next to text get `aria-hidden="true"` (lucide icons already hide themselves when no title is set).
- Images and company logos have meaningful `alt` text; purely decorative ones use `alt=""`.
- PDF resumes and documents must open in a viewer that can be navigated by keyboard, and always offer a download link.

## Structure and screen readers

- Use landmarks: `<header>`, `<nav aria-label="Main">`, `<main>`, `<footer>`. Only one `<h1>` per page (the `PageHeader` title), then `h2`, `h3` in order.
- Each route sets a unique `document.title`, for example "Applications | PlaceHub".
- Tables use `<th scope="col">`; sortable headers expose `aria-sort`.
- Dynamic updates are announced: toasts use `role="status"` (info, success) or `role="alert"` (errors). Loading regions use `aria-busy="true"`.
- Active nav link gets `aria-current="page"` (React Router `NavLink` does this automatically).
- Current step in steppers: `aria-current="step"`.

## Motion, time and zoom

- Respect reduced motion: disable animations (including skeleton pulse and spinners that aren't essential) when `prefers-reduced-motion: reduce`.
  ```css
  @media (prefers-reduced-motion: reduce) { *, *::before, *::after { animation-duration: .01ms !important; transition-duration: .01ms !important; } }
  ```
- The layout must work at **200% browser zoom** and with larger system fonts. Use `rem` / Tailwind sizes, not fixed heights on text containers.
- Timed activities (online tests, offer expiry, OTP) show the remaining time clearly. For tests, allow approved extra time for students with accommodations.
- Don't auto-redirect or auto-refresh in ways that surprise the user. Warn before session timeout.

## Accessibility check before merging a page
1. Tab through the whole page. Can you reach and use everything, and always see where you are?
2. Does every field have a visible label? Do errors read clearly?
3. Do icon-only buttons have `aria-label`?
4. Are heading levels in order?
5. Do colours still pass in dark mode?
6. Does it work at 200% zoom?

---

# Component behavior (states)

Every interactive component uses the same state rules, so the product feels consistent. Transitions are **150ms**, on colour only (`transition-colors`). No bouncing, scaling or sliding effects on hover.

## State matrix

| Component | Default | Hover | Focus | Active (pressed) | Disabled | Loading | Error |
|---|---|---|---|---|---|---|---|
| **Primary button** | `bg-accent` | `bg-accent-hover` | teal ring | `bg-accent-hover` | 50% opacity, no pointer | Spinner replaces icon, label stays, click blocked | n/a |
| **Secondary button** | surface + `line-strong` border | `bg-surface-2` | teal ring | `bg-surface-2` | 50% opacity | Same as primary | n/a |
| **Ghost button / icon button** | transparent, `fg-muted` | `bg-surface-2`, `fg` text | teal ring | `bg-surface-2` | 50% opacity | Spinner | n/a |
| **Danger button** | `bg-danger` | 90% opacity | teal ring | 80% opacity | 50% opacity | Spinner | n/a |
| **Input / select** | `line-strong` border | border `fg-subtle` | border `accent` + soft ring | n/a | `bg-surface-2`, text `fg-subtle`, not-allowed cursor | n/a | `border-danger`, message below, `aria-invalid` |
| **Table row** | none | `bg-surface-2/60` | row link/button shows ring | n/a | text `fg-subtle` | Skeleton rows | Error panel with retry |
| **Clickable card** | `card` | border becomes `line-strong` | teal ring | n/a | 60% opacity | Skeleton | n/a |
| **Nav link** | `fg-muted` | `bg-surface-2`, `fg` text | teal ring | n/a | hidden if no permission (don't show disabled menus) | n/a | n/a |
| **Active nav link** | `bg-accent-soft` + `text-accent` | unchanged | teal ring | n/a | n/a | n/a | n/a |
| **Badge** | static | none | none | none | none | none | none (badges are read-only) |

Rules:
- **Hover is never the only way** to see information or actions. Mobile has no hover, so anything revealed on hover must also be reachable by tap or focus.
- **Disabled** elements use the `disabled` attribute (not just a class), so keyboard and screen readers also skip them. Where possible, explain why with a tooltip or hint ("Complete your profile to apply").
- **Hide** actions the user has no permission for. Don't show them disabled.

## Loading states

| Situation | What to show |
|---|---|
| Button action (save, apply, submit) | Disable the button, show a spinner, keep the label ("Saving..."). Prevent double submits. |
| First page load or table load | `Skeleton` blocks matching the layout (cards, 5 table rows). No full-page spinner. |
| Refreshing existing data | Keep old data visible, show a small "Updating..." indicator. |
| Long task (import, report export) | Progress bar with a status line, plus a notification when done. |
| File upload | Per-file progress bar with a cancel option. |

```jsx
import { Loader2 } from "lucide-react";

<button className="btn-primary" disabled={saving} aria-busy={saving}>
  {saving && <Loader2 size={16} strokeWidth={1.75} className="animate-spin" />}
  {saving ? "Saving..." : "Save changes"}
</button>
```

## Error states

| Level | Pattern |
|---|---|
| **Field error** | Red border, message under the field, `aria-invalid` and `aria-describedby`. Appears on blur or submit, not while the user is still typing. |
| **Form error** | Summary at the top of the form ("2 fields need attention") with links to each field. Focus moves to it on a failed submit. |
| **Action error** | Toast (`role="alert"`) with a plain message and a Retry action when possible. |
| **Section / table failed to load** | Inline panel in place of the content: icon, "Couldn't load applications", a **Retry** button. The rest of the page still works. |
| **Page error** | Full error page (404 / 403 / 500) with a link back to the dashboard. |

Error messages: say what happened and what to do next. No raw error codes or stack traces shown to users.

## Success and empty states

- **Success:** short toast ("Application submitted") that disappears after about 4 seconds. Important results (offer accepted) stay visible on the page as well, not only in a toast.
- **Empty list:** use `EmptyState` with a neutral icon, a one-line explanation and a clear action ("Browse jobs"). Distinguish "no data yet" from "no results for these filters" (offer "Clear filters").
- **Confirmation:** destructive or hard-to-undo actions (delete, reject, withdraw application, decline offer) always use a `ConfirmDialog` that names what will happen. Confirm button uses `btn-danger`.

## Toast and feedback rules
- Position: top-right on desktop, top-centre on mobile. Maximum 3 visible at once.
- Types: success, error, info. Error toasts don't auto-dismiss until closed.
- Use the theme tokens (`surface`, `line`, status colours), with a lucide icon (`CheckCircle2`, `AlertCircle`, `Info`). No emojis.

## Forms behaviour
- Validate on blur and on submit. Clear an error as soon as the user fixes the value.
- Submit button stays enabled (so errors can be shown) but is disabled while saving.
- Warn before leaving a page with unsaved changes.
- Pre-fill known values (from the ERP or earlier profile data) and show the source when helpful ("Imported from ERP").

## Quick checklist for every new component
1. Does it have all the states from the matrix (hover, focus, disabled, loading, error)?
2. Is focus visible and keyboard-operable?
3. Does it work on touch (no hover-only features)?
4. Does it look right in both light and dark mode?
5. Does it use only theme tokens and the lucide icon set?
