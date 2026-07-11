# Andy's Coffee House — website

Marketing website for **Andy's Coffee House**, a coffee house and restaurant on
Oginga Odinga Street in Eldoret, Kenya. It's a warm, spacious spot for coffee,
hearty meals, shakes and mocktails, with live sports on big screens.

Static site — plain HTML, CSS and a little vanilla JavaScript. No framework, no
build step, no server. Drop the folder on any static host and it runs.

---

## Pages

| Page | File |
|------|------|
| Home | `index.html` |
| Menu (full food menu + order-ahead form) | `menu/index.html` |
| Coffee & Drinks | `drinks/index.html` |
| Gallery (with lightbox) | `gallery/index.html` |
| About | `about/index.html` |
| Sports & Events | `events/index.html` |
| Reserve a Table (booking form) | `reserve/index.html` |
| Contact & Directions (map, hours, enquiry form) | `contact/index.html` |
| Not-found page | `404.html` |

## What's in the box

- **Light & dark theme** — follows the visitor's system on the first visit, then
  remembers their choice (saved in `localStorage`).
- **Responsive** with a slide-in mobile menu.
- **Scroll-reveal** animations and a **gallery lightbox** (keyboard + swipe-free tap nav).
- **WhatsApp forms** for table bookings, food orders and general enquiries. These
  build a pre-filled WhatsApp message and open a chat — there is **no backend** and
  nothing is charged online.
- **Floating WhatsApp button** on every page.
- SEO tags, Open Graph tags, `schema.org` CafeOrCoffeeShop data, an SVG favicon and
  a custom 404.
- All real photos live in `images/` with meaningful names.

## Editing the important stuff

**All contact details are in ONE place:** the top of [`js/main.js`](js/main.js), in
the `ANDYS` object. Change the phone/WhatsApp number, address, hours, socials and
email there and it updates everywhere on the site.

```js
const ANDYS = {
  whatsapp: "254724333916",   // orders & bookings go here (no + or spaces)
  phones:   [ ... ],          // shown around the site
  address:  "...",
  hours:    [ ... ],
  socials:  { ... },
  email:    "..."
};
```

Menu prices are written directly into `menu/index.html` and `drinks/index.html`
(they don't change often). A note on both pages tells guests to confirm current
prices in store.

---

## ⚠️ Placeholders to confirm before publishing

Everything below is either an estimate or unverified — please check with the owner
and update:

1. **Closing time** — the **6:30 AM opening** is confirmed from the Google listing,
   but the **closing time is a placeholder** (`9:30 PM`). Set the real closing time
   in `ANDYS.hours` in `js/main.js`. (Opening time is safe.)
2. **Social media links** — Facebook, Instagram (`@andys_coffeehouse`) and TikTok
   links are best-guess from search results. Confirm the correct handles/URLs
   (in `js/main.js` `ANDYS.socials` **and** in the footer `<a>` tags on each page).
3. **Email address** — `hello@andyscoffeehouse.co.ke` is a placeholder
   (`js/main.js` + the Contact page). Replace or remove if there's no email.
4. **Exact address wording** — listed as *"Sirgoi Plaza, 2nd Floor, Oginga Odinga
   Street"*. Confirm the plaza name spelling and floor.
5. **Second phone number** — `0794 444 932` came from a listing; confirm it's still
   in use (`ANDYS.phones`).
6. **Domain** — meta/OG tags assume `https://andys.bizyetu.co.ke/`. Update the
   `og:url` / `canonical` / `og:image` URLs and the `schema.org` block if the final
   subdomain differs.

No fake reviews, hours or menu items were invented. The 4.1★ / 563-review figure is
from the public Google/Top-Rated listing.

---

## Preview locally

Any static server works. For example, with PHP (bundled with XAMPP):

```powershell
php -S 127.0.0.1:8791 -t "c:\xampp\htdocs\andys-coffee-house"
```

then open <http://127.0.0.1:8791/>. Or, since it lives under XAMPP's htdocs, with
Apache running: <http://localhost/andys-coffee-house/>.

## Publishing (GitHub Pages → subdomain)

1. Put this folder in its own GitHub repo (via GitHub Desktop).
2. **Settings → Pages** → deploy from `main` / root.
3. Add the custom subdomain (e.g. `andys.bizyetu.co.ke`) under Pages, and add the
   matching `CNAME` DNS record pointing at GitHub Pages.
4. Because every path is **relative** (no leading `/` except on the 404 page, which
   must resolve from any depth), the site works at the subdomain root as-is.

---

Built with ❤ by **MERIK NETWORK Co** — <https://merikagency.com>
