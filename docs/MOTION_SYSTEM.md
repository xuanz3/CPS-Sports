# CPS SPORTS — Motion Specification

Motion is a primary part of the interface, not an afterthought. Every transition must explain an affordance or maintain spatial continuity.

| Element | Behaviour | Timing |
| --- | --- | --- |
| Header | Shrinks and increases depth after scrolling | 350ms, custom ease-out |
| Navigation links | Marine underline grows from left to right | 330ms |
| Megamenu | Drops in with opacity and slight vertical movement | 420ms |
| Search suggestions | Soft opacity and translate reveal | 300ms |
| Hero title | Enters in a staggered upward movement | 800ms |
| Hero asset | Translates and sharpens into place | 950ms |
| Hero carousel | Progress indicator fills, automatic or manual navigation | 6.8s per slide |
| Product card | Rises, gains depth and reacts to cursor position | 420ms |
| Product image | Enlarges subtly with improved visual focus | 700ms |
| Quick actions | Rise into view on hover or keyboard focus | 320ms |
| Wishlist | Scales and changes colour as state updates | 280ms |
| Buttons | Colour-fill sweep, arrow shift and click ripple | 480ms / 630ms |
| Category card | Background shift, zooming image and rotating arrow | 400ms–700ms |
| Editorial panels | Image rotation and scale, oversized motif response | 700ms–850ms |
| Cart drawer | Slides from the right over a dimmed, blurred backdrop | 520ms |
| Quick view | Fades, moves and scales into a centered modal | 400ms |
| Page transitions | View Transitions API, blur-and-translate when available | 210ms out / 440ms in |
| Scroll reveals | Per-element Observer and capped stagger delay | 720ms–800ms |
| Back-to-top | Fades and moves into view on scroll | 350ms |

## Input behaviour

- Hover states have keyboard `:focus-within` alternatives where relevant.
- Touch devices expose essential quick actions without requiring hover.
- Buttons respond to `pointerdown` for a tactile effect.
- Escape closes modals, the bag and mobile menu.
- Search suggestions update immediately with the input value.
- Scroll animations occur once when the elements enter the viewport.
- The hero timer pauses while hovered or when the document is hidden.

## Reduced motion

`prefers-reduced-motion: reduce` disables non-essential transitions, hero timer animation, orbit movement, and stagger effects. Content must remain visible and usable. The base layout never depends on animation completing.

## Performance constraints

Animate mainly `transform` and `opacity`; do not transition layout-critical dimensions for large page sections. Images are lazy-loaded outside the hero, while the hero image is preloaded. Original images are stored separately from optimised web-delivery images.
