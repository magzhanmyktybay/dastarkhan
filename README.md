# Dastarkhan: Kazakh Restaurant Website

**Topic:** Restaurant website
**Live site:** https://magzhanmyktybay.github.io/dastarkhan/

## Group members
Group: SE-2540

| Name |
|------|
| Magzhan Myktybay |
| Van Alexander |
| Adilzhan Kairgaliyev|

## Description

Dastarkhan is a website for a (fictional) Kazakh restaurant in Astana. A *dastarkhan* is the traditional Kazakh table set for guests, so the design uses the colours of the night steppe sky, the gold of the sun and a red ornament band inspired by Kazakh felt carpets. Visitors can learn the restaurant's story, read the full menu with prices, look through the photo gallery and request a table through a booking form.

For the **endterm** the same site was extended with JavaScript and jQuery: a registration form with client-side validation, a live search and category filter for the menu, a reservation table with full CRUD, and a lightbox for the gallery.

## Pages

| Page | File | Main content |
|------|------|--------------|
| Home | `index.html` | Hero, features, signature dishes, reviews, call to action |
| About | `about.html` | Story, timeline, team, values |
| Menu | `menu.html` | 5 menu tables with prices, 3 set-menu cards, **live search and category filter** |
| Gallery | `gallery.html` | Photo grid, events section, **lightbox** |
| Contact | `contact.html` | Booking form, address, opening-hours table, map, **reservation manager (CRUD table)** |
| Thank you | `thank-you.html` | Confirmation page the booking form sends you to |
| Join the club | `register.html` | **Registration form with JavaScript validation** (endterm) |

## Features implemented

### Endterm: JavaScript and jQuery (`js/script.js`)

**2.1 Form validation** (`register.html`)
- Required field checks for name, email, password and password confirmation
- Email format checked with a regular expression (RegEx)
- Password strength indicator (Bootstrap progress bar) showing **Weak / Medium / Strong**
- Password confirmation check: both fields must match
- Real-time feedback while typing: green or red border, success / error icon and a text message under each field
- Submission is blocked with `preventDefault()` if validation fails, and a Bootstrap alert lists what to fix

**2.2 Dynamic search and filter** (`menu.html`)
- Search bar filters the dishes as the user types (`.on('input')`), case-insensitive, without reloading the page
- Category filter buttons *All, Starters, Soups, Main dishes, Desserts, Drinks* work together with the search bar

**2.3 Dynamic table with CRUD** (`contact.html`, section *Reservation manager*)
- **Create:** "Add reservation" opens a Bootstrap modal form
- **Read:** all reservations are rendered dynamically from a JavaScript array into the table
- **Update:** "Edit" opens the same modal filled with the row's data
- **Delete:** "Delete" asks for confirmation with `confirm()` before removing the row

**2.4 Image gallery** (`gallery.html`)
- Gallery grid built with HTML, CSS Grid and Bootstrap
- Lightbox: clicking a photo enlarges it, with previous / next arrows and a close button
- jQuery effects: `.fadeIn()` / `.fadeOut()` to open and close the lightbox and switch photos, `.animate()` to slide the new photo in

### Midterm: HTML, CSS and Bootstrap

- Sticky header with logo and navigation on every page (Flexbox)
- Semantic HTML5: `header`, `nav`, `main`, `section`, `article`, `aside`, `figure`, `figcaption`, `blockquote`, `address`, `time`, `footer`
- Menu tables with `caption`, `thead`, `tbody` and striped rows
- Booking form with text, tel, email, date, time, select, radio, textarea and checkbox inputs, plus HTML validation (`required`, `min`, `max`)
- CSS Grid gallery where some photos span 2 columns or 2 rows
- Staggered signature-dish cards and alternating colours using `:nth-child()`
- Fixed "back to top" button, absolutely positioned opening-hours badge on the hero
- Fully responsive: desktop, tablet and mobile layouts

## Technologies used

- HTML5
- CSS3 (external stylesheet `css/style.css`, no inline or internal styles)
- Bootstrap 5.3.3 (grid, utilities, form and table classes) via CDN
- Bootstrap Icons 1.11.3 via CDN
- Google Fonts: Marcellus (headings) and Nunito Sans (text)
- JavaScript (ES5+), all custom code in `js/script.js`
- jQuery 3.7.1 via CDN (events, DOM manipulation, effects `.fadeIn()`, `.fadeOut()`, `.animate()`)
- Bootstrap 5.3.3 JS bundle via CDN (modal for the CRUD form)

## Requirements map

Where each requirement can be found in the code.

| Requirement | Where |
|-------------|-------|
| 5+ pages with navigation | All pages, `<nav class="main-nav">` |
| Header with logo and nav using Flexbox | `.header-inner`, `.nav-list` (style.css section 3) |
| Footer with contact, copyright, social links | `<footer class="site-footer">` on every page |
| Table | `menu.html` (5 tables), `contact.html` (opening hours) |
| Form | `contact.html` `#booking` |
| `div` and `span` | e.g. `.dish-card-body`, `.dish-tag`, `.avatar`, `.required` |
| External CSS only | `css/style.css` |
| Flexbox | header, `.cta-band`, `.social-links`, `.menu-categories`, `.values-list li` |
| Grid | `.dish-grid`, `.gallery-grid`, `.team-grid` |
| Positioning | `relative`: `.hero`, `.set-card`; `absolute`: `.hero-badge`, `.ribbon`, `.timeline li::before`; `fixed`: `#back-to-top`; `sticky`: `.site-header` |
| `:hover` and `:focus` | `.btn-gold`, `.menu-link`, `.social-links a`, `#back-to-top`, form fields |
| `:nth-child()` | `.dish-card`, `.menu-table tbody tr`, `.gallery-item`, `.team-member`, `.timeline li`, `.hours-table tr` |
| 3+ CSS variables in `:root` | style.css section 1 (colours, fonts, font sizes, spacing) |
| Google Fonts | `<link>` in every `<head>` |
| `loading="lazy"` | Below-the-fold images on Home, About and Gallery, and the map iframe |
| 2+ media queries | Tablet `max-width: 991.98px`, mobile `max-width: 575.98px` (sections 18–19) |
| Bootstrap grid | `container`, `row`, `col-md-*`, `col-lg-*`, `g-*` on every page |
| `js/script.js` connected on every page | Before `</body>` in all `.html` files, after jQuery and Bootstrap JS |
| 2.1 Form validation | `register.html` (`#register-form`), `script.js` section 2.1 |
| 2.2 Search and filter | `menu.html` (`#menu-search`, `.filter-btn`), `script.js` section 2.2 |
| 2.3 CRUD table | `contact.html` (`#reservations`, `#reservation-modal`), `script.js` section 2.3 |
| 2.4 Gallery lightbox | `gallery.html` (`#lightbox`), `script.js` section 2.4 |
| Bootstrap utilities | `mt-*`, `mb-*`, `py-*`, `text-center`, `d-flex`, `gap-*`, `btn`, `w-100`, `fw-bold` |

### Responsive behaviour

The CSS is **desktop-first**: base styles target large screens, and media queries override them for smaller ones.

- **Tablet:** the navigation moves onto its own row below the logo, dish cards and gallery go from 3–4 columns to 2, the CTA band stacks.
- **Mobile:** the header becomes vertical and stops being sticky, all grids become a single column, the hero badge moves from absolute positioning into the normal flow, and the CSS variables for font sizes and section spacing get smaller.

## Individual contribution

| Member | Midterm | Endterm |
|--------|---------|---------|
| Magzhan Myktybay | Home and About pages, header and footer | Form validation (`register.html`, script.js section 2.1), image link fixes |
| Van Alexander | Menu page, tables, set-menu cards | Search and category filter (script.js section 2.2) |
| Adilzhan Kairgaliyev | Gallery and Contact pages, booking form, media queries | CRUD table (script.js section 2.3) and gallery lightbox (section 2.4) |

## Folder structure

```
dastarkhan/
├── index.html
├── about.html
├── menu.html
├── gallery.html
├── contact.html
├── thank-you.html
├── register.html
├── css/
│   └── style.css
├── js/
│   └── script.js
├── images/
│   └── logo.svg
└── README.md
```
