# Design System Strategy: The Midnight Concierge

### 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Midnight Concierge."** In the high-stakes world of real estate, we are moving away from the cold, clinical "SaaS dashboard" and toward a digital environment that feels like a private, high-end office at night. 

This system rejects the "template" look. We break the rigid grid through **Intentional Asymmetry**—where critical data points (like property valuations) are given massive typographic scale, while secondary actions are tucked into sophisticated, layered surfaces. The goal is a grounded, human experience that prioritizes legibility for a mature audience (30+) while maintaining a signature editorial edge.

---

### 2. Colors & Surface Philosophy
The palette is rooted in a deep, nocturnal base, punctuated by "humanized" teals and warm terracotta accents that provide a sense of organic life against the dark void.

*   **The "No-Line" Rule:** To achieve a premium editorial feel, **1px solid borders are strictly prohibited for sectioning.** Boundaries must be defined solely through background color shifts. For instance, a side-rail using `surface_container_low` should sit directly against a `surface` (#131313) background. The "line" is perceived by the eye through tonal contrast, not a stroke.
*   **Surface Hierarchy & Nesting:** Treat the UI as a physical stack of fine paper. 
    *   **Level 0:** `surface_container_lowest` (#0e0e0e) for the deepest background areas.
    *   **Level 1:** `surface` (#131313) for the main canvas.
    *   **Level 2:** `surface_container` (#1f1f1f) for primary content cards.
    *   **Level 3:** `surface_container_high` (#2a2a2a) for hover states or active flyouts.
*   **Signature Textures:** While the core UI is solid, we inject "soul" into main CTAs. Use a subtle, sophisticated transition from `primary` (#71d7cd) to `primary_container` (#008178) on large buttons to simulate the way light hits a matte silk surface.
*   **The Glass Rule:** For floating elements like navigation bars or tooltips, use `surface_container` with a 70% opacity and a `24px` backdrop-blur. This allows the property photography or data below to "bleed" through, creating an integrated, atmospheric depth.

---

### 3. Typography: Humanist Authority
We use **Manrope** for its unique balance of geometric precision and "warm" humanist terminals. 

*   **The Hero Metric:** Use `display-lg` (3.5rem) for the primary data point on any dashboard page (e.g., Total Portfolio Value). This creates a clear editorial entry point.
*   **Legibility First (30+ Demographic):** We prioritize high contrast. Body text should never fall below `body-md` (0.875rem). For critical property details, use `title-md` (1.125rem) with a generous `1.6` line-height to ensure comfort during long reading sessions.
*   **Labeling:** `label-sm` should be used sparingly, primarily for metadata, and always in `on_surface_variant` (#bdc9c8) to prevent visual clutter.

---

### 4. Elevation & Depth
In this design system, depth is a matter of **Tonal Layering**, not structural shadows.

*   **The Layering Principle:** Place a `surface_container_lowest` card inside a `surface_container` section to create a "recessed" look for data inputs. This "carved" effect feels more grounded than a "floating" effect.
*   **Ambient Shadows:** When an element must float (like a modal), specify a shadow with a `40px` blur and `6%` opacity. The shadow color must not be pure black; use a tinted version of `on_surface`.
*   **The "Ghost Border" Fallback:** If a border is required for accessibility in input fields, use the `outline_variant` (#3e4949) at **20% opacity**. It should be a whisper of a line, just enough to define the shape without interrupting the dark aesthetic.

---

### 5. Components

#### Buttons
*   **Primary:** Solid `primary` (#71d7cd) with `on_primary` (#003733) text. Use the `md` (0.75rem) roundedness. 
*   **Secondary:** No fill. Use a Ghost Border (`outline_variant` at 20%) with `primary` colored text.
*   **Tertiary:** No fill, no border. Just `on_surface` text with a `surface_container_high` background shift on hover.

#### Input Fields
*   **Structure:** Use a "Grounded" style. No bottom line only. Use a full container with `surface_container_low` background and `sm` (0.25rem) roundedness.
*   **Error State:** Use `error` (#ffb4ab) only for the text and a subtle `error_container` (#93000a) glow behind the field.

#### Cards & Lists
*   **The Divider Rule:** Strictly forbid 1px dividers between list items. Use `24px` of vertical white space from the Spacing Scale or a subtle background toggle between `surface` and `surface_container_low`.
*   **Property Cards:** Use `xl` (1.5rem) roundedness for image containers to soften the "industrial" feel of the dashboard, making the properties feel more like "homes."

#### Chips
*   **Filter Chips:** Use `secondary_container` (#2d4f4e) for inactive states. When active, transition to `primary` (#71d7cd) with a "Soft Glow" (a 10% opacity `surface_tint` drop shadow).

---

### 6. Do's and Don'ts

*   **DO** use `tertiary` (#ffb692) for "human" moments—like notifications from a real estate agent or a "New Property" tag. It provides a warm, organic contrast to the cool teals.
*   **DO** use generous padding. Luxury is defined by the space you *don't* use. A dashboard card should feel like a page in a high-end architectural magazine.
*   **DON'T** use pure white (#ffffff) for text. Always use `on_surface` (#e2e2e2) to reduce eye strain in dark mode.
*   **DON'T** stack more than three levels of surface containers. It breaks the "grounded" feel and starts to look cluttered.
*   **DO** ensure that all interactive elements have a minimum tap target of 44px, respecting the 30+ demographic's need for precision and ease of use.