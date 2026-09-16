# THE INSIGHT TECH — Website

A premium, production-ready website for THE INSIGHT TECH — a technology
solutions company (Power BI/BI, Software, Websites, Data Analytics, AI
Automation, Digital Growth). Built as static HTML + Tailwind (via CDN) +
vanilla JS — no build step, no dependencies, works anywhere.

## 1. File structure

```
the-insight-tech/
├── index.html          Home
├── about.html           About Us
├── services.html        Services (all 6, detailed)
├── solutions.html       Solutions (problem → solution → outcome)
├── industries.html      Industries
├── portfolio.html       Portfolio / Work
├── contact.html         Contact (enquiry form)
├── robots.txt
├── sitemap.xml
├── css/
│   └── style.css         Design tokens, brand styles, animations
├── js/
│   ├── config.js          ⭐ EDIT THIS — central business info
│   └── main.js             Nav, mobile menu, scroll reveal, form logic
└── assets/
    ├── logo.jpg            Master logo file (full lockup, as supplied)
    ├── logo-icon.jpg        Cropped icon mark — navbar / mobile menu
    ├── logo-lockup.jpg      Cropped icon + wordmark — footer / social share
    ├── favicon-32.png        Browser tab favicon
    └── favicon-180.png       Apple touch icon
```

## 2. Run it locally

Because the contact form uses `fetch`, open the site through a local
server rather than double-clicking the files (browsers block some
features on `file://`):

```bash
cd the-insight-tech
python3 -m http.server 8000
# then open http://localhost:8000
```

## 3. Where to replace the logo

The master logo file is `assets/logo.jpg` (the full lockup: icon +
wordmark + tagline, exactly as supplied). From it, four derived assets
are used across the site so the mark renders cleanly at every size
instead of being awkwardly cropped:

| File | Used for |
|---|---|
| `assets/logo-icon.jpg` | Navbar mark, mobile menu (square, icon only) |
| `assets/logo-lockup.jpg` | Footer brand block, Open Graph / social-share image, Organization schema (wide, icon + wordmark) |
| `assets/favicon-32.png` | Browser tab favicon |
| `assets/favicon-180.png` | Apple touch icon (home-screen icon on iOS) |

If you receive an updated logo file from the brand team, regenerate
these four crops from it (a designer or an image tool can export a
square icon-only crop and a wide icon+wordmark crop at the same pixel
ratios) rather than swapping `logo.jpg` alone — swapping only the
master file without regenerating the crops will leave the old mark in
the navbar/footer/favicon. No redesign was done to the mark itself —
these are direct crops of the original artwork.

## 4. Where to update phone / email / WhatsApp

Two places:

1. **`js/config.js`** — the `SITE_CONFIG.contact` object. This powers
   any element tagged `data-config="contact.email"` etc. (used on the
   Contact page).
2. **`css`-adjacent HTML** — the footer and the floating WhatsApp
   button on every page currently have these values hard-coded (so the
   site works with zero JavaScript too). Search and replace across all
   `.html` files:
   - `hello@theinsighttech.com` → your real email
   - `+91 00000 00000` → your real phone (display text)
   - `tel:+910000000000` → your real `tel:` link
   - `https://wa.me/910000000000` → your real WhatsApp link
   - `India` → your real location text

A quick way to do this project-wide:
```bash
grep -rl "wa.me/910000000000" . | xargs sed -i '' 's#wa.me/910000000000#wa.me/YOUR_NUMBER#g'
```
(drop the `''` after `-i` on Linux/GNU sed).

## 5. Where to update social links

`js/config.js` → `SITE_CONFIG.social.instagram` / `.linkedin`, **and**
the footer's social icons in every page (`href="https://instagram.com/theinsighttech"`
and the LinkedIn equivalent) — update both for consistency.

## 6. Where to update portfolio projects

Edit `portfolio.html` directly. Each project is a `.card` block with a
category label, title, problem/solution/technology lines. Duplicate a
card to add a project. **Do not add fabricated results, client names,
logos, or numbers** — use category labels or "Confidential Business
Intelligence Solution" for anything not cleared for public display, as
already modeled in the existing cards.

## 7. Connecting the contact form to a backend

The form (`contact.html`, logic in `js/main.js`) currently validates
client-side and simulates a send if no backend is configured (it logs
the payload to the browser console). To go live:

1. Set `SITE_CONFIG.formEndpoint` in `js/config.js` to your form
   backend URL (e.g. a Formspree endpoint, or your own API route).
2. The form already `POST`s as `FormData` with `Accept: application/json`
   — most form backends (Formspree, Getform, Basin) accept this as-is.
3. No API keys are exposed anywhere in this codebase.

## 8. How to deploy

This is a static site — deploy the `the-insight-tech/` folder as-is to
any static host:

- **Netlify / Vercel**: drag-and-drop the folder, or connect the repo
  and set the output directory to the project root (no build command).
- **GitHub Pages**: push the folder to a repo and enable Pages on the
  root (or `/docs`) directory.
- **Any traditional host**: upload the folder via FTP/cPanel — it's
  plain HTML/CSS/JS.

Before going live, update `sitemap.xml`, `robots.txt`, and the
`__CANONICAL__`/Open Graph URLs (already set to
`https://www.theinsighttech.com`) if the real domain differs — search
and replace `theinsighttech.com` across the project.

## 9. SEO configuration already in place

- Unique `<title>` and meta description per page
- Canonical URL per page
- Open Graph + Twitter/X card metadata
- `Organization` schema (JSON-LD) on the homepage
- `robots.txt` + `sitemap.xml`
- Semantic HTML with a single `<h1>` per page and proper heading order
- `LocalBusiness` schema was intentionally **not** added — add it only
  once you have a real, confirmed business address (see placeholders
  below); adding it with placeholder data would misrepresent the
  business to search engines.

## 10. Remaining placeholders — real information needed

Search for these before launch:

| Placeholder | Location | Replace with |
|---|---|---|
| `hello@theinsighttech.com` | `js/config.js`, footer, contact page | Real business email |
| `+91 00000 00000` / `tel:+910000000000` | `js/config.js`, footer, contact page | Real phone number |
| `https://wa.me/910000000000` | `js/config.js`, footer, floating button, contact page | Real WhatsApp link |
| `India` (location) | `js/config.js`, footer, contact page | Real city/region |
| `instagram.com/theinsighttech` | `js/config.js`, footer (all pages) | Real Instagram URL |
| `linkedin.com/company/theinsighttech` | `js/config.js`, footer (all pages) | Real LinkedIn URL |
| `theinsighttech.com` domain | `<head>` canonical/OG tags, `sitemap.xml`, `robots.txt` | Real domain once registered |
| `SITE_CONFIG.formEndpoint` | `js/config.js` | Real form backend URL |
| Portfolio project details | `portfolio.html` | Real (or still-anonymized) project details as they become approved for public display |

No clients, testimonials, awards, certifications, revenue figures,
employee counts, or years-in-business claims have been invented
anywhere on the site — add these only once real, approved data exists.
