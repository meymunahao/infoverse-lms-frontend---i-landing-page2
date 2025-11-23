# Infoverse Digital-Ed

An educational platform providing easy access to curriculum-aligned content from Oak National Academy for Key Stages 1-4.

## Overview

Infoverse Digital-Ed is a Next.js-based web application that integrates with the Oak National Academy API to provide students, teachers, and parents with streamlined access to high-quality educational resources aligned with the UK curriculum.

## Features

- **Key Stages 1-4**: Browse comprehensive curriculum content for all key stages
- **Subject Organization**: Explore content organized by subjects, units, and lessons
- **Resource Access**: Direct access to lessons, worksheets, videos, and presentations
- **Interactive Quizzes**: Starter and exit quizzes for lessons
- **Responsive Design**: Mobile-friendly interface with modern UI/UX
- **Fast Performance**: Built with Next.js 14+ App Router for optimal performance

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Data Fetching**: SWR + Axios
- **UI Components**: Custom component library
- **API**: Oak National Academy API

## Design System

### Color Palette
- Primary Blue: `#4A9FC7` (navigation, primary buttons)
- Secondary Orange/Coral: `#E87B5C` (CTAs, accents)
- Dark Background: `#2C5F75` (hero sections)
- Light Background: `#F5F5F5` (page backgrounds)
- White: `#FFFFFF` (cards, content areas)
- Text Dark: `#333333`
- Text Light: `#666666`

### Design Principles
- Rounded corners (8-12px border radius)
- Soft shadows for depth
- Icon-first approach
- Clean, spacious layouts
- Centered content with max-width containers

## Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── key-stages/        # Key stage listing and detail pages
│   ├── subjects/          # Subject listing and detail pages
│   ├── units/             # Unit detail pages
│   ├── lessons/           # Lesson detail pages
│   ├── about/             # About page
│   ├── layout.tsx         # Root layout with header/footer
│   └── page.tsx           # Home page
├── components/
│   ├── ui/                # Reusable UI components
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Container.tsx
│   │   └── Loading.tsx
│   └── layout/            # Layout components
│       ├── Header.tsx
│       └── Footer.tsx
├── lib/
│   ├── api/               # API service layer
│   │   ├── client.ts      # Axios client configuration
│   │   └── oak-service.ts # Oak API service functions
│   ├── hooks/             # Custom React hooks
│   │   └── useOakData.ts  # SWR hooks for data fetching
│   └── utils/             # Utility functions
│       └── cn.ts          # Class name utility
├── types/                 # TypeScript type definitions
│   └── oak-api.types.ts   # Oak API types
└── config/                # Configuration files
    └── api.config.ts      # API configuration
```

## Key Components

### UI Components
- **Button**: Primary, secondary, and outline variants
- **Card**: Reusable card component with header, title, and content
- **Container**: Max-width container for consistent layouts
- **Loading**: Loading spinner and page loading states

### Layout Components
- **Header**: Responsive navigation with mobile menu
- **Footer**: Site footer with links and information

### Pages
- **Home**: Hero section, features, key stages overview, CTA
- **Key Stages**: Browse and filter by key stage
- **Subjects**: Browse subjects with filtering
- **Units**: View units within a subject
- **Lessons**: Detailed lesson view with resources and quizzes

## API Integration

The app integrates with the Oak National Academy API:

- Base URL: `https://api.thenational.academy`
- Endpoints: Key stages, subjects, units, lessons, years
- Data caching with SWR
- Error handling and loading states

## Development

### Code Style
- ESLint for code quality
- Prettier for code formatting
- TypeScript for type safety

### Adding New Features
1. Create types in `src/types/`
2. Add API functions in `src/lib/api/`
3. Create hooks in `src/lib/hooks/`
4. Build UI components in `src/components/`
5. Create pages in `src/app/`

## Deployment

This app can be deployed to:
- Vercel (recommended)
- Netlify
- Any platform supporting Next.js

## Contributing

Contributions are welcome! Please follow these steps:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is for educational purposes.

## Acknowledgments

- [Oak National Academy](https://www.thenational.academy/) for providing the educational content API
- [Next.js](https://nextjs.org/) for the excellent framework
- [Tailwind CSS](https://tailwindcss.com/) for the styling system
