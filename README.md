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

## Pages

| Page | File | Main content |
|------|------|--------------|
| Home | `index.html` | Hero, features, signature dishes, reviews, call to action |
| About | `about.html` | Story, timeline, team, values |
| Menu | `menu.html` | 5 menu tables with prices, 3 set-menu cards |
| Gallery | `gallery.html` | Photo grid, events section |
| Contact | `contact.html` | Booking form, address, opening-hours table, map |
| Thank you | `thank-you.html` | Confirmation page the booking form sends you to |

## Features implemented

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
| Bootstrap utilities | `mt-*`, `mb-*`, `py-*`, `text-center`, `d-flex`, `gap-*`, `btn`, `w-100`, `fw-bold` |

### Responsive behaviour

The CSS is **desktop-first**: base styles target large screens, and media queries override them for smaller ones.

- **Tablet:** the navigation moves onto its own row below the logo, dish cards and gallery go from 3–4 columns to 2, the CTA band stacks.
- **Mobile:** the header becomes vertical and stops being sticky, all grids become a single column, the hero badge moves from absolute positioning into the normal flow, and the CSS variables for font sizes and section spacing get smaller.

## Individual contribution

| Member | Contribution |
|--------|--------------|
| Magzhan | e.g. Home and About pages, header and footer |
| Alexander | e.g. Menu page, tables, set-menu cards |
| Adilzhan| e.g. Gallery and Contact pages, booking form, media queries |

## Folder structure

```
dastarkhan/
├── index.html
├── about.html
├── menu.html
├── gallery.html
├── contact.html
├── thank-you.html
├── css/
│   └── style.css
├── images/
│   └── logo.svg
└── README.md
```
