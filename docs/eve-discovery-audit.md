# EVE Chatbot Integration — Discovery Audit

**Repo:** `AFUM-Website`
**Audit date:** 2026-04-18
**Branch at time of audit:** `preview`
**Auditor:** Cursor Agent (observation only — no code written, no deps installed)

---

## Section 1 — Framework and Build Tooling

### `app/package.json` — verbatim key fields

```json
{
  "name": "my-app",
  "private": true,
  "version": "0.0.0",
  "type": "module"
}
```

### `scripts`

```json
{
  "dev": "vite",
  "build": "tsc -b && vite build",
  "lint": "eslint .",
  "preview": "vite preview"
}
```

### `dependencies` (exact versions as declared)

| Package | Version |
|---------|---------|
| `@hookform/resolvers` | `^5.2.2` |
| `@radix-ui/react-accordion` | `^1.2.12` |
| `@radix-ui/react-alert-dialog` | `^1.1.15` |
| `@radix-ui/react-aspect-ratio` | `^1.1.8` |
| `@radix-ui/react-avatar` | `^1.1.11` |
| `@radix-ui/react-checkbox` | `^1.3.3` |
| `@radix-ui/react-collapsible` | `^1.1.12` |
| `@radix-ui/react-context-menu` | `^2.2.16` |
| `@radix-ui/react-dialog` | `^1.1.15` |
| `@radix-ui/react-dropdown-menu` | `^2.1.16` |
| `@radix-ui/react-hover-card` | `^1.1.15` |
| `@radix-ui/react-label` | `^2.1.8` |
| `@radix-ui/react-menubar` | `^1.1.16` |
| `@radix-ui/react-navigation-menu` | `^1.2.14` |
| `@radix-ui/react-popover` | `^1.1.15` |
| `@radix-ui/react-progress` | `^1.1.8` |
| `@radix-ui/react-radio-group` | `^1.3.8` |
| `@radix-ui/react-scroll-area` | `^1.2.10` |
| `@radix-ui/react-select` | `^2.2.6` |
| `@radix-ui/react-separator` | `^1.1.8` |
| `@radix-ui/react-slider` | `^1.3.6` |
| `@radix-ui/react-slot` | `^1.2.4` |
| `@radix-ui/react-switch` | `^1.2.6` |
| `@radix-ui/react-tabs` | `^1.1.13` |
| `@radix-ui/react-toggle` | `^1.1.10` |
| `@radix-ui/react-toggle-group` | `^1.1.11` |
| `@radix-ui/react-tooltip` | `^1.2.8` |
| `class-variance-authority` | `^0.7.1` |
| `clsx` | `^2.1.1` |
| `cmdk` | `^1.1.1` |
| `date-fns` | `^4.1.0` |
| `embla-carousel-react` | `^8.6.0` |
| `framer-motion` | `^12.0.0` |
| `input-otp` | `^1.4.2` |
| `lucide-react` | `^0.562.0` |
| `next-themes` | `^0.4.6` |
| `react` | `^19.2.0` |
| `react-day-picker` | `^9.13.0` |
| `react-dom` | `^19.2.0` |
| `react-hook-form` | `^7.70.0` |
| `react-resizable-panels` | `^4.2.2` |
| `recharts` | `^2.15.4` |
| `sonner` | `^2.0.7` |
| `tailwind-merge` | `^3.4.0` |
| `vaul` | `^1.1.2` |
| `zod` | `^4.3.5` |

### `devDependencies` (exact versions as declared)

| Package | Version |
|---------|---------|
| `@eslint/js` | `^9.39.1` |
| `@types/node` | `^24.10.1` |
| `@types/react` | `^19.2.5` |
| `@types/react-dom` | `^19.2.3` |
| `@vitejs/plugin-react` | `^5.1.1` |
| `autoprefixer` | `^10.4.23` |
| `eslint` | `^9.39.1` |
| `eslint-plugin-react-hooks` | `^7.0.1` |
| `eslint-plugin-react-refresh` | `^0.4.24` |
| `globals` | `^16.5.0` |
| `kimi-plugin-inspect-react` | `^1.0.3` |
| `postcss` | `^8.5.6` |
| `tailwindcss` | `^3.4.19` |
| `tailwindcss-animate` | `^1.0.7` |
| `tw-animate-css` | `^1.4.0` |
| `typescript` | `~5.9.3` |
| `typescript-eslint` | `^8.46.4` |
| `vite` | `^7.2.4` |

### Framework confirmation

- **Framework:** React 19.2.0
- **TypeScript:** Installed (`typescript ~5.9.3`). `app/tsconfig.json`, `app/tsconfig.app.json`, and `app/tsconfig.node.json` all present.
- **Vite version:** `^7.2.4`
- **Vite plugins used:** `@vitejs/plugin-react` (`^5.1.1`) and `kimi-plugin-inspect-react` (`^1.0.3`)

### `app/vite.config.ts` — full contents

```typescript
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [inspectAttr(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

**Note:** `base: './'` means all asset paths are relative. This affects how a chat widget's script tag or iframe `src` would be resolved if embedded as a static asset.

---

## Section 2 — Styling and UI

### Tailwind CSS

- **Installed:** Yes — `tailwindcss ^3.4.19`
- **Config file:** `app/tailwind.config.js` (CommonJS format — `module.exports`)
- **`theme.extend` — verbatim:**

```javascript
theme: {
  extend: {
    colors: {
      burgundy: {
        DEFAULT: '#8B1E1E',
        light: '#A52A2A',
        dark: '#6B1717',
        50: '#FDF2F2',
        100: '#FCE7E7',
        200: '#F9D0D0',
        300: '#F4A9A9',
        400: '#EC7575',
        500: '#E04545',
        600: '#8B1E1E',
        700: '#6B1717',
        800: '#4A0F0F',
        900: '#2D0909',
      },
      border: "hsl(var(--border))",
      input: "hsl(var(--input))",
      ring: "hsl(var(--ring))",
      background: "hsl(var(--background))",
      foreground: "hsl(var(--foreground))",
      primary: {
        DEFAULT: "hsl(var(--primary))",
        foreground: "hsl(var(--primary-foreground))",
      },
      secondary: {
        DEFAULT: "hsl(var(--secondary))",
        foreground: "hsl(var(--secondary-foreground))",
      },
      destructive: {
        DEFAULT: "hsl(var(--destructive))",
        foreground: "hsl(var(--destructive-foreground))",
      },
      muted: {
        DEFAULT: "hsl(var(--muted))",
        foreground: "hsl(var(--muted-foreground))",
      },
      accent: {
        DEFAULT: "hsl(var(--accent))",
        foreground: "hsl(var(--accent-foreground))",
      },
      popover: {
        DEFAULT: "hsl(var(--popover))",
        foreground: "hsl(var(--popover-foreground))",
      },
      card: {
        DEFAULT: "hsl(var(--card))",
        foreground: "hsl(var(--card-foreground))",
      },
    },
    fontFamily: {
      heading: ['Playfair Display', 'serif'],
      body: ['Inter', 'sans-serif'],
    },
    borderRadius: {
      lg: "var(--radius)",
      md: "calc(var(--radius) - 2px)",
      sm: "calc(var(--radius) - 4px)",
    },
    keyframes: {
      "accordion-down": {
        from: { height: "0" },
        to: { height: "var(--radix-accordion-content-height)" },
      },
      "accordion-up": {
        from: { height: "var(--radix-accordion-content-height)" },
        to: { height: "0" },
      },
      float: {
        '0%, 100%': { transform: 'translateY(0px)' },
        '50%': { transform: 'translateY(-20px)' },
      },
      'pulse-glow': {
        '0%, 100%': { boxShadow: '0 0 20px rgba(139, 30, 30, 0.3)' },
        '50%': { boxShadow: '0 0 40px rgba(139, 30, 30, 0.6)' },
      },
      'gradient-shift': {
        '0%': { backgroundPosition: '0% 50%' },
        '50%': { backgroundPosition: '100% 50%' },
        '100%': { backgroundPosition: '0% 50%' },
      },
    },
    animation: {
      "accordion-down": "accordion-down 0.2s ease-out",
      "accordion-up": "accordion-up 0.2s ease-out",
      float: 'float 6s ease-in-out infinite',
      'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
      'gradient-shift': 'gradient-shift 8s ease infinite',
    },
  },
},
plugins: [require("tailwindcss-animate")],
```

### shadcn/ui

- **Installed:** Yes — `app/components.json` present.
- **`app/components.json` — full contents:**

```json
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": {
    "config": "postcss.config.js",
    "tailwind": "src/index.css",
    "baseColor": "slate",
    "cssVariables": true,
    "prefix": ""
  },
  "iconLibrary": "lucide",
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils",
    "ui": "@/components/ui",
    "lib": "@/lib",
    "hooks": "@/hooks"
  },
  "registries": {}
}
```

- **Style:** `new-york`
- **CSS variables:** enabled
- **Icon library:** `lucide`

### UI component libraries installed

| Library | Version | Notes |
|---------|---------|-------|
| `@radix-ui/*` | Various (see Section 1) | 22 Radix primitives installed |
| `lucide-react` | `^0.562.0` | Icon library |
| `class-variance-authority` | `^0.7.1` | Variant styling utility |
| `tailwind-merge` | `^3.4.0` | Tailwind class merging |
| `clsx` | `^2.1.1` | Conditional class utility |
| `cmdk` | `^1.1.1` | Command palette |
| `embla-carousel-react` | `^8.6.0` | Carousel |
| `vaul` | `^1.1.2` | Drawer |
| `sonner` | `^2.0.7` | Toast notifications |
| `next-themes` | `^0.4.6` | Theme switching |
| `framer-motion` | `^12.0.0` | Animation library |

### shadcn/ui components present in `app/src/components/ui/`

```
accordion.tsx, alert-dialog.tsx, alert.tsx, aspect-ratio.tsx, avatar.tsx,
badge.tsx, breadcrumb.tsx, button-group.tsx, button.tsx, calendar.tsx,
card.tsx, carousel.tsx, chart.tsx, checkbox.tsx, collapsible.tsx, command.tsx,
context-menu.tsx, dialog.tsx, drawer.tsx, dropdown-menu.tsx, empty.tsx,
field.tsx, form.tsx, hover-card.tsx, input-group.tsx, input-otp.tsx,
input.tsx, item.tsx, kbd.tsx, label.tsx, menubar.tsx, navigation-menu.tsx,
pagination.tsx, popover.tsx, progress.tsx, radio-group.tsx, resizable.tsx,
scroll-area.tsx, select.tsx, separator.tsx, sheet.tsx, sidebar.tsx,
skeleton.tsx, slider.tsx, sonner.tsx, spinner.tsx, switch.tsx, table.tsx,
tabs.tsx, textarea.tsx, toggle-group.tsx, toggle.tsx, tooltip.tsx
```

Total: 53 component files.

### CSS file importing Tailwind base layers

**File:** `app/src/index.css`

First 20 lines verbatim:

```css
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --background: 0 0% 100%;
    --foreground: 240 10% 3.9%;
    --card: 0 0% 100%;
    --card-foreground: 240 10% 3.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 240 10% 3.9%;
    --primary: 0 67% 33%;
    --primary-foreground: 0 0% 100%;
    --secondary: 240 4.8% 95.9%;
    --secondary-foreground: 240 5.9% 10%;
    --muted: 240 4.8% 95.9%;
    --muted-foreground: 240 3.8% 46.1%;
```

---

## Section 3 — Project Structure

```
/root/Projects/AFUM-Website
├── .gitattributes
├── .gitignore
├── .env.local                          ← Vercel OIDC token only (see Section 6)
├── .vercel/
│   ├── project.json
│   └── README.txt
├── .claude/
│   └── worktrees/
├── app/                                ← ROOT OF THE WEB APPLICATION
│   ├── components.json                 ← shadcn/ui config
│   ├── eslint.config.js
│   ├── index.html
│   ├── info.md
│   ├── package.json
│   ├── package-lock.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   ├── tsconfig.node.json
│   ├── vercel.json                     ← build config (rootDirectory = app/)
│   ├── vite.config.ts
│   ├── .env.local                      ← Vercel OIDC token only
│   ├── .gitignore
│   ├── .vercel/
│   │   ├── project.json
│   │   └── README.txt
│   ├── public/
│   │   └── images/
│   │       ├── about-office.jpg
│   │       ├── af-logo.png
│   │       ├── broker-benefits.jpg
│   │       ├── hero-image.jpg
│   │       ├── logo-agri.png
│   │       ├── logo-commercial.png
│   │       ├── logo-domestic.png
│   │       ├── logo-hospitality.png
│   │       ├── Shorekeeper_logo_cropped.png
│   │       └── Shorekeeper_word_cropped.png
│   └── src/
│       ├── App.css
│       ├── App.tsx                     ← Root component, section orchestration
│       ├── index.css                   ← Tailwind imports + CSS variables
│       ├── main.tsx                    ← React DOM entry point
│       ├── components/
│       │   ├── ScrollIndicator.tsx
│       │   └── ui/                     ← 53 shadcn/ui components
│       ├── hooks/
│       │   └── use-mobile.ts
│       ├── lib/
│       │   └── utils.ts                ← cn() utility only
│       ├── sections/
│       │   ├── about.tsx
│       │   ├── af-assist.tsx
│       │   ├── AFAssist.tsx            ← duplicate/legacy
│       │   ├── broker-benefits.tsx
│       │   ├── BrokerBenefits.tsx      ← duplicate/legacy
│       │   ├── contact.tsx
│       │   ├── footer.tsx
│       │   ├── header.tsx
│       │   ├── hero.tsx
│       │   ├── products.tsx            ← contains the "Speak to a Partner" modal
│       │   ├── shorekeeper.tsx
│       │   ├── stats-bar.tsx
│       │   ├── StatsBar.tsx            ← duplicate/legacy
│       │   └── testimonials.tsx        ← commented out in App.tsx
│       └── types/
│           ├── css.d.ts
│           └── framer-motion.d.ts
├── docs/
│   └── eve-discovery-audit.md          ← this file
├── images/                             ← source images (not served; copied to app/public)
│   ├── about-office.jpg
│   ├── AF Boardroom v1.jpeg
│   ├── AF Club.jpeg
│   ├── broker-benefits.jpg
│   ├── hero-image.jpg
│   ├── logo-agri.png
│   ├── logo-commercial.png
│   ├── logo-domestic.png
│   ├── logo-hospitality.png
│   ├── Quality v1.jpeg
│   ├── Shorekeeper_logo_cropped.png
│   └── Shorekeeper_word_cropped.png
├── placeholder/
│   └── index.html
├── README.md
└── tech-spec.md
```

**Note:** `app/` is the Vercel `rootDirectory`. The repo root contains only source images, docs, and placeholder files — none of which are served.

**Note:** There are three pairs of duplicate section files (`AFAssist`/`af-assist`, `BrokerBenefits`/`broker-benefits`, `StatsBar`/`stats-bar`). `App.tsx` imports the lowercase-hyphenated versions. The PascalCase versions appear to be legacy/unused.

---

## Section 4 — Routing and Pages

### Router

- **No router installed.** There is no `react-router-dom`, `@tanstack/router`, `wouter`, or any other routing library in `package.json`.
- **Architecture:** Single-page, single-route application. The entire site is one page with anchor-based scroll navigation.
- **Entry point:** `app/src/main.tsx` renders `<App />` into `#root`.

### Route table

| Route | Component file | Notes |
|-------|---------------|-------|
| `/` (only route) | `app/src/App.tsx` | All sections rendered inline |

### Section render order in `App.tsx`

```tsx
<Header />
<main>
  <Hero />
  <StatsBar />
  <About />
  <Products />
  <BrokerBenefits />
  <AFAssist />
  <Shorekeeper />
  {/* <Testimonials /> */}   ← commented out
  <Contact />
</main>
<Footer />
<ScrollIndicator />
```

### Section containing "Products Underwritten with Care"

- **File:** `app/src/sections/products.tsx`
- **Component:** `Products`
- **Strings present:** `"Products Underwritten with Care"`, `"Personal Focus"`, `"Domestic Insurance"`, `"Hospitality"`, `"Speak to a Partner"`
- **Section anchor:** `id="products"`

### Sections containing "Quality Over Quantity" and "An Exclusive Partnership"

| String | File | Component | Section anchor |
|--------|------|-----------|---------------|
| `"Quality Over Quantity"` | `app/src/sections/about.tsx` | `About` | `id="about"` (inferred) |
| `"An Exclusive Partnership"` | `app/src/sections/broker-benefits.tsx` | `BrokerBenefits` | `id` not confirmed in audit |

Both are on the single homepage (`/`).

---

## Section 5 — The "Speak to a Partner" Modal

### Component file

**`app/src/sections/products.tsx`** — component `Products`

### What "Speak to a Partner" currently does

The button inside the product detail `Dialog` closes the dialog and **scrolls the page to `#contact`**:

```tsx
<Button
  onClick={() => {
    setSelectedProduct(null);
    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
  }}
  className="w-full bg-[#8B1E1E] hover:bg-[#6B1717] text-white font-semibold"
>
  Speak to a Partner
</Button>
```

There is **no form, no mailto, no API call** — it is purely a scroll trigger.

### How the modal is triggered

Each product card has a `"Learn More"` button that sets `selectedProduct` state:

```tsx
<button
  onClick={() => setSelectedProduct(product)}
  className="flex items-center gap-2 text-[#1a1a2e] font-medium text-sm group/btn mx-auto"
>
  Learn More
  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
</button>
```

The `Dialog` is rendered once, outside the product grid, controlled by `selectedProduct` state:

```tsx
<Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
```

### Data source powering modal content

**Hardcoded in `products.tsx`** — a static array of objects at the top of the file. There is no external data file, JSON, CMS, or API call.

### Full `products` data array — verbatim

```typescript
const products = [
  {
    logo: '/images/logo-domestic.png',
    title: 'Domestic Insurance',
    shortTitle: 'Personal Focus',
    description: 'Comprehensive home and contents coverage, expertly underwritten for clients who value protection over price.',
    features: ['All-risk cover', 'Theft protection', 'Liability cover', 'Building insurance'],
    details: 'Our Domestic Package offers comprehensive protection for homeowners, covering everything from structural damage to personal belongings. With flexible options and competitive premiums, we ensure your clients have peace of mind.',
  },
  {
    logo: '/images/logo-commercial.png',
    title: 'Commercial Insurance',
    shortTitle: 'Commercial Focus',
    description: 'Business packages designed for stability, protecting commercial assets with precision and expertise.',
    features: ['Property cover', 'Business interruption', 'Liability protection', 'Asset coverage'],
    details: 'Designed for businesses of all sizes, our Commercial Insurance package safeguards against property damage, business interruption, and liability claims. We understand the unique risks businesses face and provide tailored solutions.',
  },
  {
    logo: '/images/logo-agri.png',
    title: 'Agri Insurance',
    shortTitle: 'Agri Focus',
    description: 'Specialized farm coverage combining residential and commercial protection for agricultural operations.',
    features: ['Farm buildings', 'Equipment cover', 'Livestock options', 'Crop insurance'],
    details: 'Farming operations require specialized insurance that addresses both residential and commercial aspects. Our Agri Insurance provides comprehensive coverage for farm buildings, equipment, livestock, and crops against various risks.',
  },
  {
    logo: '/images/logo-hospitality.png',
    title: 'Hospitality Insurance',
    shortTitle: 'Hospitality Focus',
    description: 'Tailored solutions for guesthouses, hotels, and tourism businesses that demand excellence.',
    features: ['Guest liability', 'Property cover', 'Business interruption', 'Contents insurance'],
    details: 'The South African tourism industry demands specialized insurance solutions. From small guesthouses to luxury hotel chains, our Hospitality Insurance covers property, liability, and business interruption risks specific to the tourism sector.',
  },
];
```

### Full `Products` component — verbatim

(See `app/src/sections/products.tsx` — full file is 202 lines. Key structural summary: product grid → `Dialog` controlled by `useState<typeof products[0] | null>`. The `Dialog` imports from `@/components/ui/dialog`.)

---

## Section 6 — Existing API / Backend Integration

### `fetch(`, `axios`, `supabase`, `createClient` — search result

**Zero occurrences found** across all `.tsx` and `.ts` files in `app/src/`.

### API endpoints the site currently calls

**None.** The contact form (`app/src/sections/contact.tsx`) simulates submission with `setTimeout` and never sends data anywhere:

```typescript
const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  setIsSubmitting(true);
  // Simulate form submission
  setTimeout(() => {
    setIsSubmitting(false);
    setIsSubmitted(true);
  }, 1500);
};
```

### Supabase client

**Not configured.** No `@supabase/supabase-js` in dependencies. No `createClient` calls. No Supabase-related environment variables.

### Environment variables referenced via `import.meta.env.*` or `process.env.*`

**None found** in `app/src/`.

### `.env.local` contents

Both `app/.env.local` and the repo-root `.env.local` contain only:

```
# Created by Vercel CLI
VERCEL_OIDC_TOKEN="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIs..."
```

This is an auto-generated Vercel OIDC token. It is not referenced anywhere in application code.

### `.env.example`

**Not found.** No `.env.example` file exists anywhere in the repository.

---

## Section 7 — Deployment Configuration

### `app/vercel.json` — full contents

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

- **SPA rewrites:** Yes — all paths rewrite to `/index.html`.
- **Framework:** `vite`
- **Build command:** `npm run build` (runs `tsc -b && vite build`)
- **Output directory:** `dist`
- **Root directory for this project:** `app/` (set in Vercel project settings, confirmed via `.vercel/project.json`)

### `.vercel/project.json` (app-level)

```json
{
  "projectId": "prj_vrUODBW8QQ7AQLiudZRQ0sWrkGYh",
  "orgId": "team_ELnRTCm94wtbxLeieIJ065C4",
  "projectName": "afum-website"
}
```

### `app/vite.config.ts` — full contents

```typescript
import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { inspectAttr } from 'kimi-plugin-inspect-react'

export default defineConfig({
  base: './',
  plugins: [inspectAttr(), react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
```

**Note:** `base: './'` causes all built asset URLs to be relative (e.g., `./assets/index.js` rather than `/assets/index.js`). Combined with the SPA rewrite in `vercel.json`, this works correctly on Vercel. However, any externally injected script or widget that assumes absolute paths may need adjustment.

---

## Section 8 — Brand and Design Tokens

### Primary brand colours (hex occurrences across `app/src/`)

| Hex | Count | Role |
|-----|-------|------|
| `#8B1E1E` | 101 | Primary brand burgundy / CTA colour |
| `#1a1a2e` | 46 | Dark navy — headings, dark sections, text |
| `#6B1717` | 7 | Burgundy dark (hover states) |
| `#A52A2A` | 1 | Burgundy light |
| `#7a1a1a` | 1 | Burgundy dark variant |
| `#f1f1f1` | 1 | Scrollbar track |
| `#646cff` | 1 | Vite default (unused in UI) |
| `#61dafb` | 1 | React default (unused in UI) |

**Effective palette:** `#8B1E1E` (brand primary), `#1a1a2e` (brand dark), `#6B1717` (hover).

### Fonts

- **Loaded via:** Google Fonts CDN — `@import` at top of `app/src/index.css`
- **Import URL:** `https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap`
- **Heading font:** `Playfair Display` (weights 400, 500, 600, 700)
- **Body font:** `Inter` (weights 300, 400, 500, 600, 700)
- **No `@fontsource/*` packages installed.**
- **No custom font files** in `public/`.
- Fonts applied via Tailwind `fontFamily` tokens: `font-heading` and `font-body`. Also applied inline via `style={{ fontFamily: 'Playfair Display, serif' }}` in multiple section components.

### Logo loading

- **Method:** Static image from `public/` folder — served at `/images/af-logo.png`
- **Usage in `header.tsx`:**
  ```tsx
  <img src="/images/af-logo.png" alt="Admin Focus Underwriting Managers" ... />
  ```
- Not an imported asset, not an SVG component.

### CSS custom properties (design tokens from `app/src/index.css`)

```css
:root {
  --background: 0 0% 100%;
  --foreground: 240 10% 3.9%;
  --card: 0 0% 100%;
  --card-foreground: 240 10% 3.9%;
  --popover: 0 0% 100%;
  --popover-foreground: 240 10% 3.9%;
  --primary: 0 67% 33%;
  --primary-foreground: 0 0% 100%;
  --secondary: 240 4.8% 95.9%;
  --secondary-foreground: 240 5.9% 10%;
  --muted: 240 4.8% 95.9%;
  --muted-foreground: 240 3.8% 46.1%;
  --accent: 240 4.8% 95.9%;
  --accent-foreground: 240 5.9% 10%;
  --destructive: 0 84.2% 60.2%;
  --destructive-foreground: 0 0% 98%;
  --border: 240 5.9% 90%;
  --input: 240 5.9% 90%;
  --ring: 0 67% 33%;
  --radius: 0.5rem;
}
```

- **Border radius token:** `--radius: 0.5rem` → `rounded-lg = 0.5rem`, `rounded-md = calc(0.5rem - 2px)`, `rounded-sm = calc(0.5rem - 4px)`
- **Shadows:** Not tokenised — used inline via Tailwind utilities (`shadow-sm`, `shadow-xl`, `shadow-2xl`) throughout section components.

---

## Section 9 — Product Data

### Location

**Hardcoded in `app/src/sections/products.tsx`** as a module-level `const` array. There is no separate data file.

### Full product data structure — verbatim

```typescript
const products = [
  {
    logo: '/images/logo-domestic.png',
    title: 'Domestic Insurance',
    shortTitle: 'Personal Focus',
    description: 'Comprehensive home and contents coverage, expertly underwritten for clients who value protection over price.',
    features: ['All-risk cover', 'Theft protection', 'Liability cover', 'Building insurance'],
    details: 'Our Domestic Package offers comprehensive protection for homeowners, covering everything from structural damage to personal belongings. With flexible options and competitive premiums, we ensure your clients have peace of mind.',
  },
  {
    logo: '/images/logo-commercial.png',
    title: 'Commercial Insurance',
    shortTitle: 'Commercial Focus',
    description: 'Business packages designed for stability, protecting commercial assets with precision and expertise.',
    features: ['Property cover', 'Business interruption', 'Liability protection', 'Asset coverage'],
    details: 'Designed for businesses of all sizes, our Commercial Insurance package safeguards against property damage, business interruption, and liability claims. We understand the unique risks businesses face and provide tailored solutions.',
  },
  {
    logo: '/images/logo-agri.png',
    title: 'Agri Insurance',
    shortTitle: 'Agri Focus',
    description: 'Specialized farm coverage combining residential and commercial protection for agricultural operations.',
    features: ['Farm buildings', 'Equipment cover', 'Livestock options', 'Crop insurance'],
    details: 'Farming operations require specialized insurance that addresses both residential and commercial aspects. Our Agri Insurance provides comprehensive coverage for farm buildings, equipment, livestock, and crops against various risks.',
  },
  {
    logo: '/images/logo-hospitality.png',
    title: 'Hospitality Insurance',
    shortTitle: 'Hospitality Focus',
    description: 'Tailored solutions for guesthouses, hotels, and tourism businesses that demand excellence.',
    features: ['Guest liability', 'Property cover', 'Business interruption', 'Contents insurance'],
    details: 'The South African tourism industry demands specialized insurance solutions. From small guesthouses to luxury hotel chains, our Hospitality Insurance covers property, liability, and business interruption risks specific to the tourism sector.',
  },
];
```

### TypeScript type

No explicit interface defined. The type is inferred as `typeof products[0]` and used in `useState<typeof products[0] | null>`.

### Product `.md` files

**Not found.** No markdown files exist for individual products anywhere in the repository.

---

## Section 10 — Forms and Validation

### Form library

- **`react-hook-form`** — installed at `^7.70.0`
- **`@hookform/resolvers`** — installed at `^5.2.2` (used to connect zod schemas to react-hook-form)

**However:** The contact form in `app/src/sections/contact.tsx` does **not** use `react-hook-form`. It uses a plain `<form onSubmit={handleSubmit}>` with native HTML validation (`required` attributes). `react-hook-form` is installed but not yet used anywhere in the codebase.

### Validation library

- **`zod`** — installed at `^4.3.5`

**However:** `zod` is installed but not used anywhere in the current codebase. No schema files found.

### Summary

Both `react-hook-form` and `zod` are installed and ready to use, but currently unused — the only form on the site is an uncontrolled, unvalidated, mock-submission form.

---

## Section 11 — Dependencies Likely Needed

### Already present and useful for a chat widget build

| Dependency | Why useful |
|-----------|-----------|
| `react` `^19.2.0` | Chat widget would be a React component |
| `framer-motion` `^12.0.0` | Widget open/close animations, message appear transitions |
| `@radix-ui/react-dialog` `^1.1.15` | Could wrap the chat widget as an accessible dialog/sheet |
| `lucide-react` `^0.562.0` | Chat, send, X, minimise icons |
| `tailwind-merge` + `clsx` | Style utilities for widget theming |
| `class-variance-authority` | Variant-based button/input styling within widget |
| `sonner` `^2.0.7` | Toast for errors / rate-limit messages |
| `zod` `^4.3.5` | Validate user input before sending to EVE API |
| `react-hook-form` + `@hookform/resolvers` | Controlled message input field |
| `@radix-ui/react-scroll-area` | Scrollable message history pane |

### Not present — typically needed for a public AI chatbot widget

| Dependency | Purpose |
|-----------|---------|
| AI SDK (`ai`, `@ai-sdk/react`) or similar | Streaming chat responses from LLM backend |
| `@supabase/supabase-js` | If conversation history or lead capture needs persistence |
| `uuid` or `nanoid` | Session/conversation ID generation |
| `isomorphic-fetch` / native fetch polyfill | Not needed for modern targets, but worth confirming |
| A server-side function runtime | The site is currently 100% static; an EVE API endpoint needs a backend (Vercel Function, edge function, or external service) |
| Rate-limiting middleware | Must be server-side; no server currently exists in this repo |
| CORS configuration | Required if EVE API is hosted on a different domain |

---

## Section 12 — Open Questions

1. **No backend exists.** The site is entirely static. For EVE to work, someone must build or designate a backend endpoint that the widget calls. The architect needs to decide: Vercel Serverless Function in this repo? External API (e.g., on `api.adminfocus.co.za`)? Edge function?

2. **Contact form is fake.** `contact.tsx` simulates submission with `setTimeout` and discards all user input. If EVE is meant to capture leads and hand off to the contact form, that form currently does nothing. This needs to be resolved before or alongside the EVE integration.

3. **No router — no multi-page architecture.** If EVE needs a dedicated `/chat` route or a persistent widget across navigation, there is currently no router to support it. The architect needs to decide: floating widget on single page (simplest), or introduce routing.

4. **`base: './'` in vite.config.ts.** Relative asset paths work fine for this SPA on Vercel. However, if EVE is injected as a third-party script tag (e.g., `<script src="...">` in `index.html`), the architect needs to confirm there are no path conflicts with the relative base.

5. **Duplicate section files.** Three pairs exist (`af-assist`/`AFAssist`, `broker-benefits`/`BrokerBenefits`, `stats-bar`/`StatsBar`). The PascalCase versions are unused in `App.tsx`. Their continued presence is ambiguous — they may conflict with future refactors.

6. **`testimonials.tsx` is commented out.** The `<Testimonials />` section is commented out in `App.tsx`. Whether this section will return (and therefore affect page layout/anchor positions) is unclear.

7. **Product `details` field is minimal.** Each product's `details` string is a single paragraph of ~2 sentences. If EVE is expected to answer product-specific questions, these strings alone are insufficient training context. The architect needs to know whether a richer product knowledge base exists elsewhere.

8. **No `id` attribute confirmed on several sections.** Only `id="products"`, `id="contact"`, `id="shorekeeper"` were directly observed. The remaining sections (`hero`, `about`, `broker-benefits`, `af-assist`, `stats-bar`) need confirmation of their anchor IDs if deep-linking to sections from the EVE widget is planned.

9. **Google Fonts loaded via CDN.** Fonts are loaded from `fonts.googleapis.com` at runtime. If the EVE widget is embedded in a privacy-strict context or needs to work offline, this dependency should be noted.

10. **`VERCEL_OIDC_TOKEN` in `.env.local` is auto-rotated.** This token is generated by the Vercel CLI and not a stable secret. It should not be used as an application credential. The EVE API will need its own stable API key/secret, which currently has no place to live (no `.env.example`, no `VITE_*` vars referenced anywhere).

11. **`kimi-plugin-inspect-react` in devDependencies.** This is a third-party Vite plugin (`^1.0.3`) that appears to be a React component inspector. Its purpose in production builds and potential interaction with a chat widget are unclear.

12. **No product `.md` files.** All product content is hardcoded in the component. If EVE needs structured product knowledge, the architect should decide whether to extract this to a data layer (JSON/markdown) before the integration, or pass it inline to the EVE prompt.
