# Golden Barrel Brewery Website

A modern, responsive brewery website for Golden Barrel built with React and TypeScript. It features polished UI, smooth animations, accessible components, and a rich set of content sections tailored for a premium brewery brand.

## 🍺 Live Site

Explore the production site at [https://goldenbarell.netlify.app/](https://goldenbarell.netlify.app/).

## 🚀 Overview

Golden Barrel’s site delivers a refined user experience with an elegant layout, dark mode support, and micro‑interactions throughout. Sections include Hero, About, Brewing Process, Menu, Events, Gallery, and Contact—each crafted for performance and clarity.

### Key Features

1. **Modern UX**: Thoughtful spacing, typography, and color system with hover/focus states
2. **Responsive Design**: Mobile‑first layout scaling cleanly across breakpoints
3. **Dark Mode**: Persistent theme toggle with system preference detection
4. **Animations**: Scroll‑triggered reveals and micro‑interactions powered by Framer Motion
5. **Optimized Assets**: Public‑served images for reliable builds across environments
6. **Type Safety**: End‑to‑end TypeScript with clear component boundaries

## 🛠️ Tech Stack

- **Framework**: React 18 + TypeScript  
- **Build Tool**: Vite  
- **Styling**: Tailwind CSS  
- **UI Primitives**: Radix (via custom UI)  
- **State & Data**: TanStack Query (React Query)  
- **Icons**: Lucide React  

## 📦 Project Structure

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

Public assets are in:

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

## 🧑‍💻 Local Development

### Prerequisites

- Node.js 18+  
- npm (or yarn/pnpm)

### Setup

```bash
git clone <repository-url>
cd craft-brew-nectar
npm install
```

### Run Dev Server

```bash
npm run dev
```

Vite serves on `http://localhost:5173` (or the next available port). To use a specific port, add `--port` to the dev script.

### Build & Preview

```bash
npm run build
npm run preview
```

### Lint

```bash
npm run lint
```

## ✨ Animations

- Centralized Framer Motion variants in `src/lib/animations.ts`  
- `useScrollAnimation` hook uses Intersection Observer for performant triggers  
- GPU‑friendly transforms and custom easing `[0.22, 1, 0.36, 1]`  

## 🚢 Deployment

- Deployed on Netlify; publish the `dist/` directory after `npm run build`.  
- Reference images via absolute paths from `public/` (e.g., `/images/...`).  

## ⚙️ Configuration Notes

- Path alias `@/` maps to `src/`  
- Respects `prefers-reduced-motion`  
- Intersection Observer thresholds tuned for smooth entry and one‑time triggers  

## 🌐 Browser Support

Modern evergreen browsers:
- Chrome, Firefox, Safari, Edge (latest)

## 🔒 License

This project is private and proprietary.

---

Built by Jai Reddy