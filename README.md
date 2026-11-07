# African Kitchen

> A fast, conversion-focused restaurant website for authentic Nigerian dining, built to turn visitors into **direct orders** and **table reservations** instead of paying third-party delivery platforms 15% or more per order.

**Live site:** [https://africankitchen.vercel.app](https://africankitchen.vercel.app)

---

## Table of Contents

1. [Overview](#overview)
2. [Key Features](#key-features)
3. [Tech Stack](#tech-stack)
4. [Project Structure](#project-structure)
5. [Getting Started](#getting-started)
6. [Deployment](#deployment)
7. [Configuration and Customization](#configuration-and-customization)
8. [How the "Order Direct and Save" Calculator Works](#how-the-order-direct-and-save-calculator-works)
9. [SEO and Structured Data](#seo-and-structured-data)
10. [Accessibility and Performance](#accessibility-and-performance)
11. [Known Limitations](#known-limitations)
12. [Roadmap](#roadmap)
13. [Browser Support](#browser-support)
14. [License](#license)

---

## Overview

African Kitchen is a single-page website for a Nigerian restaurant in the Central Business District, Abuja. It presents the menu, lets guests build an order, shows exactly how much they save by ordering directly, and collects table reservations, all without a framework or build step.

The site doubles as a **portfolio and sales demo**. The savings comparison in the cart gives restaurant owners a concrete, visual argument for taking orders on their own website.

| | |
|---|---|
| **Business** | African Kitchen, Nigerian and West African cuisine |
| **Location** | Behind High Court, Central Business District, Abuja, Nigeria |
| **Phone** | +234 703 350 3637 |
| **Currency** | Nigerian Naira (NGN, ₦) |
| **Hosting** | Vercel (static deployment) |

---

## Key Features

### Interactive digital menu
- Data-driven menu rendered from a single JavaScript array (`menuItems`), so adding or editing a dish never requires touching the HTML.
- Eight signature dishes, including Jollof Rice & Chicken, Egusi Soup, Suya Platter, Ofada Rice Bowl and Zobo Cooler.
- Category filter bar (**All, Mains, Soups, Starters, Drinks, Breakfast**) generated automatically from the menu data.
- Each card shows a photo, name, naira price, description and descriptive tags (for example `spicy`, `traditional`, `comfort food`).

### Smart cart with direct-order savings
- Add items, increase or decrease quantities, or remove lines entirely.
- Live item count in both the cart header and the navigation bar.
- Real-time subtotal, estimated third-party app total, direct total, and a prominent savings badge: *"You are saving ₦X by ordering direct!"*
- Sticky cart panel on desktop; the nav **Direct Order** button scrolls straight to it.

### Table reservation form
- Fields: name, phone, date, time and number of guests (2, 4, 6 or 8).
- Client-side validation with clear inline messages:
  - All fields are required.
  - Past dates are rejected.
  - Time must fall between **11:00 AM and 10:00 PM**.
- The page never reloads; success and error messages appear in place and the form resets after a valid submission.

### Conversion-focused page design
- Hero section with two clear calls to action: **Browse the menu** and **Reserve a table**.
- Trust signals: guest count, average prep time, rating and three customer testimonials.
- Repeated "Order now" and "Call to order" (`tel:` link) prompts for one-tap mobile ordering.

### Local SEO
- Complete Schema.org `Restaurant` and `LocalBusiness` JSON-LD block (name, image, cuisine, price range, phone, address, opening hours, reservations).
- Descriptive `<title>` and meta description.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Markup | Semantic HTML5 |
| Styling | Custom CSS (`index.css`) plus the Tailwind CSS Play CDN |
| Logic | Vanilla JavaScript (ES6+), no dependencies |
| Typography | [Cormorant Garamond](https://fonts.google.com/specimen/Cormorant+Garamond) (headings) and [Inter](https://fonts.google.com/specimen/Inter) (body) via Google Fonts |
| Formatting | `Intl.NumberFormat` (`en-NG`, NGN) for currency |
| Hosting | Vercel |

There is **no build step, bundler or package manager**. The site is three static files.

---

## Project Structure

```
african-kitchen/
├── index.html   # Page structure, SEO metadata, JSON-LD structured data
├── index.css    # Custom styles: layout, cart, menu cards, forms, footer
├── index.js     # Menu data, filtering, cart logic, pricing, reservation validation
└── README.md
```

### `index.js` at a glance

| Function | Purpose |
|---|---|
| `renderCategoryFilters()` | Builds the filter buttons and wires up click handlers |
| `renderMenu()` | Renders the menu cards for the active category |
| `addToCart(id)` / `decreaseQuantity(id)` / `removeFromCart(id)` | Mutate the cart (a `Map` keyed by item id) |
| `updateCart()` | Recalculates totals, savings and re-renders the cart UI |
| `formatMoney(value)` | Formats numbers as Nigerian Naira |
| Reservation `submit` handler | Validates and confirms reservation requests |

---

## Getting Started

### Prerequisites
A modern web browser. Optionally, Node.js or Python if you prefer to serve the files over HTTP.

### Run locally

**Option 1: open the file**

Double-click `index.html`. Everything works offline except the Tailwind CDN, Google Fonts and menu images, which need an internet connection.

**Option 2: use a local server (recommended)**

```bash
# Using Node.js
npx serve .

# Or using Python 3
python -m http.server 8000
```

Then open `http://localhost:3000` (serve) or `http://localhost:8000` (Python).

---

## Deployment

The site is deployed to **Vercel** at [africankitchen.vercel.app](https://africankitchen.vercel.app). Because it is fully static, no configuration is required.

### Deploy with Git (recommended)
1. Push the project to a GitHub repository.
2. Import the repository at [vercel.com/new](https://vercel.com/new).
3. Leave the framework preset as **Other** and the build command empty.
4. Click **Deploy**. Every push to the main branch redeploys automatically.

### Deploy with the Vercel CLI

```bash
npm i -g vercel
vercel          # preview deployment
vercel --prod   # production deployment
```

### Custom domain
In the Vercel dashboard, open **Project → Settings → Domains** and add your own domain. After connecting a custom domain, update the canonical URL and JSON-LD values listed below.

---

## Configuration and Customization

### Edit the menu
Open `index.js` and modify the `menuItems` array. Each item follows this shape:

```js
{
  id: 9,                          // unique number
  name: 'Pepper Soup',
  price: 8500,                    // in naira (whole numbers)
  description: 'Spicy broth with assorted meat and aromatic herbs.',
  category: 'Soups',              // new categories appear in the filter bar automatically
  tags: ['spicy', 'hearty'],
  image: 'images/pepper-soup.jpg' // local path or full URL
}
```

### Adjust the third-party app comparison
In `updateCart()`:

```js
const appTotal = subtotal * 1.15 + 4.99;
```

Change `1.15` to match the typical markup on the platforms your client is compared against, and change the flat `4.99` to a delivery or service fee that makes sense in naira.

### Update business details
Update these in **both** places so visitors and search engines see the same information:

- **Visible content:** the navigation, hero, footer (`tel:` and `mailto:` links, address, hours) in `index.html`.
- **Structured data:** the `<script type="application/ld+json">` block in the `<head>`.

### Change reservation hours
Two places must stay in sync:
- The `min="11:00"` and `max="22:00"` attributes on the time input in `index.html`.
- The `11 * 60` and `22 * 60` checks in the submit handler in `index.js`.

### Theming
Colors, spacing and typography live in `index.css`. Fonts are loaded in the `<head>` of `index.html`.

---

## How the "Order Direct and Save" Calculator Works

For every cart update, the site computes:

| Value | Formula |
|---|---|
| **Subtotal** | Sum of `price × quantity` for each item |
| **Estimated app total** | `subtotal × 1.15 + 4.99` (15% markup plus a flat fee) |
| **Direct total** | `subtotal` (no hidden fees) |
| **Savings** | `app total − direct total` |

The comparison is an **illustrative estimate**, not a quote from any specific delivery platform. Adjust the constants to reflect real fees when pitching to a client.

---

## SEO and Structured Data

`index.html` includes a JSON-LD block of type `["Restaurant", "LocalBusiness"]` covering name, image, cuisine, price range, phone, postal address, opening hours and `acceptsReservations`.

To validate after any change, use Google's [Rich Results Test](https://search.google.com/test/rich-results) or the [Schema Markup Validator](https://validator.schema.org/).

**Recommended SEO follow-ups**
- Add a `<link rel="canonical" href="https://africankitchen.vercel.app/">` tag.
- Add Open Graph and Twitter card meta tags for rich link previews.
- Replace the placeholder postal code (`00000`) with the real one.
- Add a `url` field to the JSON-LD pointing to the live domain.
- Claim and complete a Google Business Profile that matches the name, address and phone number on the site.

---

## Accessibility and Performance

**Already in place**
- Semantic landmarks (`header`, `nav`, `main`, `section`, `aside`, `footer`).
- `aria-label`, `aria-pressed` and `aria-live` attributes on navigation, filters, the menu grid and the cart.
- Labeled form fields; the reservation status message uses `role="alert"`.
- Mobile-first, responsive layout with a viewport meta tag.

**Suggested improvements**
- Self-host and compress menu images (WebP or AVIF) and add `loading="lazy"` and explicit `width` and `height` to avoid layout shift.
- Replace the Tailwind Play CDN with a compiled stylesheet for production. The CDN script is intended for prototyping and adds weight and render delay.
- Add a visible keyboard focus style to every interactive element and confirm color contrast against WCAG AA.

---

## Known Limitations

This is a front-end demo. Be aware of the following before using it for live business:

- **No payment or order processing.** The *Place Direct Order* button does not yet have a click handler, and cart contents are not persisted or sent anywhere.
- **No reservation backend.** Submitting the form shows a confirmation message but does not store the booking or notify the restaurant.
- **Reservation form details.**
  - The date input has no `min` attribute, so past dates are only blocked at submit time.
  - The time check allows reservations from 11:00 AM to 10:00 PM, while the restaurant's published hours are 10:00 AM to 8:00 PM on weekdays and 10:00 AM to 6:00 PM on weekends. Align these.
- **Structured data hours.** Schema.org expects 24-hour `HH:MM` times (for example `"10:00"` and `"20:00"`), not `"10:00 am"` style strings.
- **Flat fee currency.** The `4.99` app fee is applied in naira, so it is negligible. Set a realistic naira amount.
- **Images.** Menu photos are hotlinked from third-party hosts, which can break or change without notice, and a few do not match their dish (for example the Ofada Rice Bowl and Zobo Cooler photos).
- **Leftover branding.** The brand mark in the header and footer still shows the letter "B".
- **Placeholder content.** Ratings, guest counts and testimonials should be replaced with real, verifiable data before launch.

---

## Roadmap

- [ ] Wire up *Place Direct Order* with a checkout flow (Paystack or Flutterwave for NGN payments)
- [ ] Store reservations (serverless function plus email, WhatsApp or SMS notification)
- [ ] Persist the cart with `localStorage`
- [ ] Mobile slide-over cart with a floating "View order" button
- [ ] Self-hosted, optimized images
- [ ] Dietary and spice-level filters
- [ ] WhatsApp order button as a lower-friction alternative to checkout
- [ ] Analytics to track order and reservation conversion

---

## Browser Support

Works in the latest versions of Chrome, Edge, Firefox and Safari (desktop and mobile). The site relies on ES6+ JavaScript, CSS Grid and Flexbox, and `Intl.NumberFormat`.

---

## License

No license has been specified yet. Add a `LICENSE` file (for example MIT) if you want others to reuse the code, or keep it proprietary. Menu content, branding and photography belong to their respective owners.

---

**Live demo:** [africankitchen.vercel.app](https://africankitchen.vercel.app)
