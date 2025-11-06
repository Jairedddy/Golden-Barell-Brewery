# Craft Brew Nectar

A modern, responsive brewery website built with React and Tyepscript. This project showcases a professional brewery wesbite with sections for hero content, about information, menu items, brewing process, and contact details.

## Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Dark Mode Support**: Toggle between light and dark themes
- **Modern UI Components**: Built with Radix UI and custom components
- **Smooth Navigation**: Smooth scrolling between sections
- **Professional Layout**: Clean, brewery-focused design
- **Typescript**: Full type safety throughout the application

## Tech Stack

- **Frontend Framework**: React 18 with Typescript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **State Management**: React Query (TanStack Query)
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **Form Handling**: React Hook Form with Zod validation

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd craft-brew-nectar
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:8080`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run build:dev` - Build in development mode
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # React components
│   ├── ui/             # Reusable UI components
│   ├── AboutSection.tsx
│   ├── BrewingSection.tsx
│   ├── ContactSection.tsx
│   ├── Footer.tsx
│   ├── HeroSection.tsx
│   ├── MenuSection.tsx
│   └── Navigation.tsx
├── assets/             # Static assets
├── hooks/              # Custom React hooks
├── lib/                # Utility functions
├── pages/              # Page components
└── App.tsx             # Main application component
```

## Key Components

- **HeroSection**: Landing area with brewery branding
- **AboutSection**: Information about the brewery
- **MenuSection**: Beer and food menu display
- **BrewingSection**: Brewing process information
- **ContactSection**: Contact form and location details
- **Navigation**: Responsive navigation with dark mode toggle
- **Footer**: Site footer with additional links

## Configuration

The project uses Vite as the build tool with the following configuration:
- Development server runs on port 8080
- Path aliases configured for clean imports (`@/` maps to `src/`)
- TypeScript support with strict type checking
- ESLint configuration for code quality

## Browser Support

This project supports all modern browsers including:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Run tests and linting
5. Submit a pull request

## License

This project is private and proprietary.

## Support

For support or questions, please contact the development team.