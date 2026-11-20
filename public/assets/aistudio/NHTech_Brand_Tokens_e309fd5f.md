# NHTech — Brand Palette (Implementation Draft)

## Ocean family
| Token | Hex | Intended use |
|---|---|---|
| Ocean 950 | #061421 | Primary dark background |
| Ocean 900 | #0B2030 | Secondary dark background |
| Ocean 800 | #173D5B | Brand foundation |
| Ocean 700 | #24536F | Cards and elevated surfaces (where appropriate) |
| Ocean 600 | #326B86 | Supporting graphics |
| Ocean 500 | #47849B | Secondary accents |
| Ocean 400 | #75A4B5 | Illustrations and muted highlights |
| Ocean 300 | #A6C3CE | Light decorative elements |
| Ocean 200 | #D1E0E6 | Borders and light surfaces |
| Ocean 100 | #EAF1F4 | Subtle backgrounds |
| Ocean 50 | #F5F8FA | Light section backgrounds |

## Graphite / neutral family
| Token | Hex |
|---|---|
| Graphite 950 | #111820 |
| Graphite 900 | #202A33 |
| Graphite 800 | #34414C |
| Grey 700 | #53616D |
| Grey 600 | #6F7D88 |
| Grey 500 | #8D99A3 |
| Grey 400 | #AEB8C0 |
| Grey 300 | #CBD2D8 |
| Grey 200 | #E0E5E9 |
| Grey 100 | #EEF1F3 |
| Grey 50 | #F7F8F9 |
| Pure White | #FFFFFF |

## Signal Orange family
| Token | Hex | Intended use |
|---|---|---|
| Orange 900 | #7F2A08 | Deep accent, pressed states |
| Orange 800 | #A63A0A | Dark accent, high-contrast text |
| Orange 700 | #C9470D | Orange text on appropriate light backgrounds; validate contrast |
| Orange 600 | #E95013 | Strong interactive elements |
| Orange 500 | #FF5A1F | Primary brand accent and CTA backgrounds |
| Orange 400 | #FF7A45 | Hover and secondary highlights |
| Orange 300 | #FF9A69 | Decorative graphics |
| Orange 200 | #FFC09F | Soft accent surfaces |
| Orange 100 | #FFE0D1 | Light highlighted sections |
| Orange 50 | #FFF3ED | Subtle accent backgrounds |

## Semantic states
| Purpose | Hex |
|---|---|
| Success | #22A06B |
| Warning | #D99A18 |
| Error | #D64545 |
| Information | #2786C7 |

## Signature gradients
- Ocean Depth: #061421 → #173D5B → #326B86. Use for dark hero backgrounds and large visual sections.
- Industrial Heat: #A63A0A → #FF5A1F → #FFB05A. Use sparingly for special graphic elements and visual highlights.
- Engineered Transition: #173D5B → #24536F → #FF5A1F. Use sparingly for occasional brand artwork and transition visuals.

## Supplied official SVG assets
- Combination-logo.svg: warm-white wordmark (#FFF2EC), orange N (#FF4800). Primary logo on dark backgrounds.
- Dark-logo.svg: dark single-colour wordmark + N (#021422). Use on light backgrounds.
- Light-logo.svg: warm-white single-colour wordmark + N (#FFF2EC). Use on dark backgrounds where colour is unsuitable.
- Color.svg: orange N icon (#FF4800). Primary brand icon; favicon candidate.
- Dark.svg: dark N icon (#021422). Light-background icon.
- Light.svg: warm-white N icon (#FFF2EC). Dark-background icon.

## Implementation and acceptance criteria
- Use supplied SVG paths exactly; do not regenerate, approximate, redraw, or convert them into a different design.
- Brand accent Orange 500 is #FF5A1F, while the supplied official coloured SVG paths use #FF4800. Keep the artwork unchanged pending a brand decision; report the mismatch for designer confirmation.
- Keep a single clear CTA hierarchy: orange primary, subtle ocean/graphite secondary. On Orange 500 backgrounds use sufficiently dark text (Ocean 950 generally works); don't assume white label text is accessible.
- Ensure text/UI contrast to WCAG AA (4.5:1 normal text; 3:1 for large text and necessary UI boundaries); independently check semantic states and muted text on each actual surface.
- Prefer Ocean for brand sections and Graphite for neutral UI surfaces. Avoid using all shades simultaneously or mixing contrasting orange gradients into many sections.
- Preserve existing website copy, page structure, routes, SEO, forms, responsiveness, interactions, functionality, and typography unless a specific change is required for applying the brand identity.
