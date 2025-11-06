# Craft Brew Nectar

Golden Barrel’s modern, responsive brewery website built with React and TypeScript. It features rich content sections, production‑ready animations, and polished UI components tailored for a premium brewery brand.

## Live Site

- Production URL: `https://goldenbarell.netlify.app/`

## Highlights

- **Modern UX**: Elegant layout, smooth scrolling, thoughtful spacing and typography
- **Responsive**: Mobile‑first design that scales beautifully across breakpoints
- **Dark Mode**: Persistent theme toggle with system preference support
- **Polished Animations**: Framer Motion variants, scroll‑triggered reveals, micro‑interactions
- **Optimized Assets**: Public-served images for reliable builds across environments
- **Type Safety**: End‑to‑end TypeScript

## Tech Stack

- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Primitives**: Radix (via custom UI components)
- **State & Data**: TanStack Query (React Query)
- **Icons**: Lucide React

## Key Features

- **Navigation**: Responsive navbar with active states and theme toggle
- **Hero**: Background zoom, staged heading reveals, CTA micro‑interactions
- **About & Brewing**: Scroll‑triggered sections that reveal content progressively
- **Menu**: Interactive cards and tabbed content
- **Events**: Featured and regular events with rich cards and imagery
- **Gallery**: Masonry‑style grid with lightbox and keyboard/touch navigation
- **Contact**: Form and contact details with hover and focus states

## Animations

- Built with **Framer Motion** variants centralized in `src/lib/animations.ts`
- Custom hook `src/hooks/useScrollAnimation.tsx` uses Intersection Observer
- GPU‑friendly transforms (`transform`, `opacity`) and custom easing `[0.22, 1, 0.36, 1]`
- Adjusted distances/durations for smoother motion and reduced jank

## Asset Handling (Netlify‑friendly)

- Images are served from `public/` to avoid case‑sensitive import issues during Linux builds
- Example paths:
  - Hero: `/images/hero-brewery.jpg`
  - Events: `/images/events/Brewmaster.jpg`, `/images/events/Oktoberfest.jpg`
  - Gallery: `/images/gallery/<filename>.jpg`

## Project Structure

```
src/
├── components/
│   ├── ui/                # Reusable UI primitives
│   ├── AboutSection.tsx
│   ├── BrewingSection.tsx
│   ├── ContactSection.tsx
│   ├── EventsSection.tsx
│   ├── Footer.tsx
│   ├── GallerySection.tsx
│   ├── HeroSection.tsx
│   ├── MenuSection.tsx
│   └── Navigation.tsx
├── hooks/
│   └── useScrollAnimation.tsx
├── lib/
│   └── animations.ts
├── pages/
│   ├── Index.tsx
│   └── NotFound.tsx
└── App.tsx
```

Public assets are located under:

```
public/
└── images/
    ├── hero-brewery.jpg
    ├── events/
    │   ├── Brewmaster.jpg
    │   └── Oktoberfest.jpg
    └── gallery/
        └── ... all gallery images
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm (or yarn/pnpm)

### Installation

```bash
git clone <repository-url>
cd craft-brew-nectar
npm install
```

### Local Development

```bash
npm run dev
```

By default Vite serves on `http://localhost:5173` (or the next available port). If you need a specific port, set `--port` in the dev script.

### Build & Preview

```bash
npm run build
npm run preview
```

### Lint

```bash
npm run lint
```

## Deployment

- The site is deployed on Netlify and published from the `dist/` directory after `npm run build`.
- Ensure images live in `public/images/...` and are referenced by absolute paths (e.g. `/images/...`).

## Configuration Notes

- Path alias `@/` maps to `src/` for clean imports
- Animations respect `prefers-reduced-motion`
- Intersection Observer thresholds tuned for smooth entry and one‑time triggers

## Browser Support

Modern evergreen browsers:
- Chrome, Firefox, Safari, Edge (latest)

## License

This project is private and proprietary.

## Support

For questions or support, please contact the development team.