# Admin Focus Website - Technical Specification

## Component Inventory

### shadcn/ui Components (Built-in)
| Component | Purpose | Installation |
|-----------|---------|--------------|
| Button | CTAs, form submission | `npx shadcn add button` |
| Card | Product cards, testimonials | `npx shadcn add card` |
| Input | Contact form fields | `npx shadcn add input` |
| Textarea | Contact form message | `npx shadcn add textarea` |
| Label | Form labels | `npx shadcn add label` |
| NavigationMenu | Header navigation | `npx shadcn add navigation-menu` |
| Sheet | Mobile menu drawer | `npx shadcn add sheet` |
| Dialog | Product detail modals | `npx shadcn add dialog` |
| Carousel | Testimonials slider | `npx shadcn add carousel` |
| Accordion | Mobile footer, FAQ | `npx shadcn add accordion` |
| Separator | Visual dividers | `npx shadcn add separator` |

### Third-Party Components
| Component | Registry | Purpose |
|-----------|----------|---------|
| None required | - | Using built-in shadcn + custom components |

### Custom Components
| Component | Purpose | Location |
|-----------|---------|----------|
| AnimatedCounter | Stats count-up animation | `components/animated-counter.tsx` |
| ScrollReveal | Scroll-triggered animations | `components/scroll-reveal.tsx` |
| ProductCard | Product display cards | `components/product-card.tsx` |
| TestimonialCard | Testimonial display | `components/testimonial-card.tsx` |
| SectionTitle | Consistent section headers | `components/section-title.tsx` |

## Animation Implementation Table

| Animation | Library | Implementation Approach | Complexity |
|-----------|---------|------------------------|------------|
| Page load stagger | Framer Motion | `motion.div` with staggerChildren | Medium |
| Header scroll effect | React hooks | useScroll hook + conditional classes | Low |
| Scroll reveal | Framer Motion | whileInView with viewport trigger | Medium |
| Stats count-up | Custom + Framer | useInView + animated number component | Medium |
| Card hover lift | CSS/Framer | whileHover with transform | Low |
| Button hover | CSS Transitions | Tailwind hover classes | Low |
| Nav underline | CSS | ::after pseudo-element animation | Low |
| Testimonial carousel | Embla Carousel | shadcn carousel component | Medium |
| Mobile menu | Framer Motion | AnimatePresence + slide animation | Medium |
| Parallax backgrounds | Framer Motion | useScroll + useTransform | Medium |

## Animation Library Choices

### Primary: Framer Motion
- **Rationale**: Best React integration, declarative API, excellent performance
- **Use for**: All scroll animations, page transitions, hover effects, stagger animations
- **Installation**: `npm install framer-motion`

### Secondary: CSS Transitions
- **Rationale**: Lightweight, no JS overhead for simple effects
- **Use for**: Button hovers, link underlines, simple color transitions

## Project File Structure

```
app/
├── sections/
│   ├── header.tsx          # Navigation header
│   ├── hero.tsx            # Hero section
│   ├── stats-bar.tsx       # Stats/trust bar
│   ├── about.tsx           # Why partner with us
│   ├── products.tsx        # Product range
│   ├── broker-benefits.tsx # Benefits for brokers
│   ├── testimonials.tsx    # Testimonials carousel
│   ├── af-assist.tsx       # 24/7 support section
│   ├── contact.tsx         # Contact form
│   └── footer.tsx          # Footer
├── components/
│   ├── animated-counter.tsx   # Count-up animation
│   ├── scroll-reveal.tsx      # Scroll reveal wrapper
│   ├── product-card.tsx       # Product card component
│   ├── testimonial-card.tsx   # Testimonial card
│   ├── section-title.tsx      # Section title component
│   └── mobile-menu.tsx        # Mobile navigation
├── hooks/
│   ├── use-scroll-position.ts # Scroll position hook
│   └── use-in-view.ts         # Intersection observer hook
├── lib/
│   └── utils.ts               # Utility functions
├── types/
│   └── index.ts               # TypeScript types
├── page.tsx                   # Main page
├── layout.tsx                 # Root layout
└── globals.css                # Global styles
components/ui/                 # shadcn components
public/
├── images/                    # Generated images
└── fonts/                     # Custom fonts (if needed)
```

## Dependencies

### Core (Auto-installed with shadcn)
- React 18+
- Next.js 14+
- TypeScript
- Tailwind CSS
- class-variance-authority
- clsx
- tailwind-merge

### Animation
- framer-motion

### Icons
- lucide-react (auto-installed)

### Carousel
- embla-carousel-react (auto-installed with shadcn carousel)

### Fonts
- @fontsource/playfair-display
- @fontsource/inter

## Installation Commands

```bash
# Initialize project
bash scripts/init-webapp.sh "Admin Focus Underwriting Managers"

# Install shadcn components
cd /mnt/okcomputer/output/app
npx shadcn add button card input textarea label navigation-menu sheet dialog carousel accordion separator

# Install animation library
npm install framer-motion

# Install fonts
npm install @fontsource/playfair-display @fontsource/inter
```

## Color Configuration (tailwind.config.ts)

```typescript
colors: {
  primary: {
    DEFAULT: '#2c3e62',
    dark: '#1a2744',
    light: '#3d4f7a',
  },
  accent: {
    DEFAULT: '#c9a227',
    light: '#e0b83a',
    dark: '#a88a1f',
  },
  navy: '#1a2744',
  gold: '#c9a227',
}
```

## Performance Considerations

1. **Image Optimization**: Use Next.js Image component with proper sizing
2. **Font Loading**: Use font-display: swap for web fonts
3. **Animation Performance**: 
   - Use transform and opacity only
   - Add will-change on animated elements
   - Implement reduced-motion support
4. **Code Splitting**: Lazy load below-fold sections
5. **Static Export**: Configure for static HTML export

## Accessibility Requirements

1. WCAG 2.1 AA compliance
2. Keyboard navigation support
3. Screen reader compatibility
4. Focus indicators on interactive elements
5. prefers-reduced-motion support for animations
6. Alt text for all images
7. Proper heading hierarchy
