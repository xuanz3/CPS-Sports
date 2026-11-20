# CPS SPORTS

**Equipment for Every Move.** A premium multi-sport storefront with a motion-led interface, built around an owner-supplied product catalog.

**Digital experience, interface direction and implementation: Xuanze Chen.**

## Run on a Mac

1. Extract the source archive.
2. Double-click `START_LOCAL.command`.
3. The storefront opens at <http://127.0.0.1:4186>.

Or use the terminal:

```bash
cd CPS-SPORTS
python3 -m http.server 4186
```

No package installation, API key, account or database is required to explore the local storefront. The project uses browser-native JavaScript modules and CSS, without a framework runtime.

## Pages and interactions

| Page | URL | Experience |
| --- | --- | --- |
| Discover | `/` | Three editorial hero slides, hover menus, eight collections, product curation, featured stories |
| All equipment | `/shop` | Search, collection filters, interactive price range, sorting |
| Sport collection | `/sports/:slug` | Eight sport-specific views including cross-category accessories |
| Product details | `/products/:slug` | Studio image, accessible zoom, quantity control, add to bag, related equipment |
| Wishlist | `/wishlist` | Saved items with local browser persistence |
| Bag | `/cart` | Slide-over cart, full cart, quantity updates, totals |
| Checkout | `/checkout` | Validated preview-order form (no payment) |
| Account | `/account` | Local wishlist and preview-order history; no authentication |
| Journal | `/journal` | Editorial content using the supplied sports imagery |
| Our story | `/about` | Brand story and discreet Xuanze Chen design signature |
| Help | `/support` | Information and accessible FAQ accordions |

### Interaction quality

- Navigation: animated underline, category megamenu, hover and focus states.
- Product cards: responsive cursor glow, slow image scale, lift and shadow, quick-view and add-to-bag overlays.
- CTAs: sliding colour fills, arrow movement and pointer ripples.
- Hero: three independently composed slides, timed progress, manual arrows, and motion-safe auto-advance.
- Shopping: slide-over bag, image zoom, quick-view modal, live filters and inline search suggestions.
- Page transitions: native View Transitions API where supported, with a graceful fallback.
- Scroll: staggered Intersection Observer reveals; motion is minimized for `prefers-reduced-motion: reduce`.
- Layout: responsive desktop, tablet and mobile styling, including touch-specific controls.

See [`docs/MOTION_SYSTEM.md`](docs/MOTION_SYSTEM.md) and [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md).

## Catalog and image policy

- `41` product photographs supplied in `Pics.zip` (1000 × 1000 each).
- `4` additional editorial photographs from the same archive.
- Original user-uploaded files preserved under `assets/originals/` in the source archive.
- High-quality WebP derivatives under `assets/products/` and `assets/editorial/`.
- Selective transparent derivatives on **seven high-contrast products**; other originals are kept on a matching light studio background to protect white details and fine racquet strings.
- No generated products, invented higher-resolution detail, or legacy product photos appear on the live storefront.
- Filenames and image-source mapping are tracked in [`docs/ASSET_MANIFEST.md`](docs/ASSET_MANIFEST.md).

**Rights:** the uploaded photographs appear to include third-party product/brand imagery. Before a public commercial launch or redistribution, the owner must confirm licensing for the product photos, brand marks and editorial photographs. Product names describe identifiable imagery; prices are illustrative, not vendor quotes or verified offers.

## Develop and test

Node.js 22+ is recommended for automated tests and builds.

```bash
npm run check   # Parse-check JavaScript sources
npm test        # 11 storefront data, routes, cart, checkout and motion tests
npm run build   # Produce deployable output in dist/
```

The archive includes a real Git repository with separate development branches and merge commits. Double-click `PUBLISH_TO_GITHUB.command` on macOS for an interactive private-repository publishing flow. It never backdates Git commits.

### Cloudflare Pages

Connect the GitHub repository to Cloudflare Pages:

- Framework preset: **None**
- Build command: `npm run build`
- Output directory: `dist`
- Node version: `22`

`_redirects` provides the client-side deep-link fallback. All media loads from local assets, with no hotlinked retail photos.

## Production boundary

This version is a fully browsable **storefront preview**, not a live transactional retailer. Cart, wishlist and preview orders use `localStorage`. Checkout does not charge cards or send orders. Backend authentication, inventory, payment processing, shipping and email integration have not been connected. See [`docs/PRODUCTION_ROADMAP.md`](docs/PRODUCTION_ROADMAP.md) before enabling sales.
