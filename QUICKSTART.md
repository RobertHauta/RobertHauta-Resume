# Quick Start Guide

Get the resume website running locally in 2 minutes!

## Prerequisites

Make sure you have installed:
- **Node.js** 20 or higher
- **Yarn** package manager

## Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/RobertHauta-Resume.git
cd RobertHauta-Resume

# 2. Navigate to frontend and install dependencies
cd frontend
yarn install

# 3. Start the development server
yarn dev
```

That's it! The application will be available at **http://localhost:5173**

## What You'll See

- A modern, responsive resume website
- Built with React, TypeScript, and Mantine UI
- Hot module replacement for instant updates as you code

## Available Commands

```bash
yarn dev          # Start development server
yarn build        # Build for production
yarn preview      # Preview production build
yarn lint         # Run linter
```

## Making Changes

1. Open the project in your favorite editor (VS Code recommended)
2. Edit files in `frontend/src/`
3. Save and see changes instantly in your browser
4. The site uses hot module replacement for fast development

## Project Structure

```
frontend/
├── src/
│   ├── components/     # Reusable React components
│   ├── contexts/       # React context providers
│   ├── pages/          # Page components
│   ├── types/          # TypeScript type definitions
│   └── App.tsx         # Main application component
├── public/             # Static assets
└── index.html          # HTML entry point
```

## Building for Production

```bash
cd frontend
yarn build
```

The optimized production build will be in `frontend/dist/`

## Preview Production Build Locally

```bash
cd frontend
yarn preview
```

This serves the production build locally so you can test it before deploying.

## Deploying

The site automatically deploys to GitHub Pages when you push to the `main` branch. See the main [README.md](README.md) for more details.

## Troubleshooting

### Port already in use

If port 5173 is already in use, Vite will automatically try the next available port (5174, 5175, etc.)

### Module not found

Clear node_modules and reinstall:
```bash
cd frontend
rm -rf node_modules
yarn install
```

### Build errors

Make sure you're using Node.js 20 or higher:
```bash
node --version
```

## Next Steps

- Read the full [README.md](README.md) for more information
- Customize the content in `frontend/src/pages/`
- Add your own projects and experience
- Push to GitHub to see it live on GitHub Pages!

## Need Help?

Check out the main [README.md](README.md) file or the [Vite documentation](https://vitejs.dev/) for more information.
