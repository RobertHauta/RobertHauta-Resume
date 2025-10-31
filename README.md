# Robert Hauta - Resume Website

A modern, static resume website built with React and TypeScript, deployed on GitHub Pages.

## Tech Stack

- **React 19** with **TypeScript**
- **Vite** for build tooling
- **Mantine UI** component library
- **React Router** for routing
- **GitHub Pages** for hosting
- **GitHub Actions** for CI/CD

## Project Structure

```
RobertHauta-Resume/
├── frontend/               # React frontend application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── contexts/       # React contexts
│   │   ├── pages/          # Page components
│   │   ├── types/          # TypeScript types
│   │   └── App.tsx         # Main app component
│   ├── public/             # Static assets
│   ├── package.json
│   └── vite.config.ts
├── .github/
│   └── workflows/          # GitHub Actions workflows
└── README.md
```

## Live Site

Visit the live site at: [https://roberthauta.github.io/RobertHauta-Resume/](https://roberthauta.github.io/RobertHauta-Resume/)

## Getting Started

### Prerequisites

- **Node.js** 20+
- **Yarn** package manager
- **Git**

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/RobertHauta-Resume.git
   cd RobertHauta-Resume
   ```

2. **Install dependencies**
   ```bash
   cd frontend
   yarn install
   ```

3. **Run the development server**
   ```bash
   yarn dev
   ```

4. **Open your browser**
   Navigate to http://localhost:5173

## Available Scripts

### Development
```bash
cd frontend
yarn dev          # Start development server
yarn build        # Build for production
yarn preview      # Preview production build locally
yarn lint         # Run ESLint
```

## Deployment

The site automatically deploys to GitHub Pages when you push to the `main` branch.

### GitHub Actions Workflow

The `.github/workflows/deploy-pages.yml` workflow:
1. Checks out the code
2. Installs dependencies
3. Builds the frontend
4. Deploys to GitHub Pages

### Manual Deployment

To manually trigger a deployment:
1. Go to the "Actions" tab in GitHub
2. Select "Deploy to GitHub Pages"
3. Click "Run workflow"

## Project Features

- Modern, responsive design
- Fast loading with Vite
- Type-safe with TypeScript
- Component library with Mantine UI
- Client-side routing with React Router
- Automated deployments with GitHub Actions

## Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/my-feature
   ```

2. **Make changes and test locally**
   ```bash
   cd frontend
   yarn dev
   ```

3. **Build and preview**
   ```bash
   yarn build
   yarn preview
   ```

4. **Push and create PR**
   ```bash
   git push origin feature/my-feature
   ```

5. **Merge to `main`**
   - Automatically deploys to GitHub Pages

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Contact

Robert Hauta - [your-email@example.com](mailto:your-email@example.com)