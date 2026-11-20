# CPS SPORTS — Production Readiness Roadmap

## Implemented in this release

- English-language, responsive product-discovery storefront.
- Owner-supplied imagery for all 41 product entries, with preserved image originals.
- Eight sport categories, searchable product catalog and price/sort filters.
- Product details, quick view, wishlist, bag drawer and full cart.
- Client-side preview checkout and browser-local preview order history.
- Dedicated motion system and accessible reduced-motion preferences.
- Continuous integration for syntax checks, business tests and static builds.

## Required before taking orders

1. Verify retail image-use permissions, actual brand authorisation where applicable, and verified product data.
2. Replace all indicative prices, descriptions and unverified stock values with genuine inventory data.
3. Connect server-owned pricing, stock and tax logic to a persistent commerce database.
4. Add secure user authentication and an admin product/fulfilment panel.
5. Implement Stripe or another authorised payment provider with server-side sessions and signed webhooks.
6. Prevent client-created orders from being treated as paid; verify all transitions server-side.
7. Add shipping, taxes, valid consumer policy pages, support contacts, and return flows for the launch market.
8. Perform accessibility, cross-device, browser, transaction and security acceptance testing.
9. Configure fraud protections, observability, inventory reservations, backups and incident procedures.
10. Replace preview checkout copy only after successful production verification.

The project must not claim to accept payment or fulfil orders until these integrations are complete.
