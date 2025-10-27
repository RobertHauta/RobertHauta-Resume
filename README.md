# Robert Hauta - Resume Website

A full-stack resume website built with React, TypeScript, FastAPI, and MongoDB, featuring authentication and multi-environment deployment.

## Tech Stack

### Frontend
- **React 19** with **TypeScript**
- **Vite** for build tooling
- **Mantine UI** component library
- **React Router** for routing
- **Axios** for API calls

### Backend
- **FastAPI** (Python)
- **MongoDB** with Motor (async driver)
- **JWT** authentication
- **Pydantic** for data validation

### Infrastructure
- **Docker** & **Docker Compose**
- **Nginx** as reverse proxy
- **GitHub Actions** for CI/CD
- **GitHub Container Registry** for Docker images

## Project Structure

```
RobertHauta-Resume/
├── backend/                 # FastAPI backend
│   ├── app/
│   │   ├── api/            # API endpoints
│   │   ├── core/           # Core configurations
│   │   ├── models/         # Database models
│   │   ├── schemas/        # Pydantic schemas
│   │   └── main.py         # Application entry point
│   └── requirements.txt
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── contexts/       # React contexts (auth, etc.)
│   │   ├── pages/          # Page components
│   │   ├── services/       # API client services
│   │   ├── types/          # TypeScript types
│   │   └── App.tsx         # Main app component
│   ├── package.json
│   └── vite.config.ts
├── docker/                 # Docker configuration
│   ├── docker-compose.dev.yml
│   ├── docker-compose.qa.yml
│   ├── docker-compose.prod.yml
│   ├── Dockerfile.backend
│   ├── Dockerfile.frontend
│   └── nginx.conf
├── .github/
│   └── workflows/          # GitHub Actions workflows
└── README.md
```

## Environments

| Environment | URL | Branch | Auto-Deploy |
|------------|-----|--------|------------|
| **Development** | http://localhost:6969 | - | No |
| **QA** | https://qa.roberthauta.com | `qa` | Yes |
| **Production** | https://roberthauta.com | `main` | Yes |

## Getting Started

### Prerequisites

- **Node.js** 20+ and **Yarn**
- **Python** 3.11+
- **Docker** and **Docker Compose**
- **Git**

### Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/RobertHauta-Resume.git
   cd RobertHauta-Resume
   ```

2. **Set up backend environment**
   ```bash
   cd backend
   cp .env.example .env
   # Edit .env and set your SECRET_KEY
   pip install -r requirements.txt
   ```

3. **Set up frontend**
   ```bash
   cd frontend
   cp .env.example .env
   yarn install
   ```

4. **Run with Docker Compose (Recommended)**
   ```bash
   cd docker
   docker compose -f docker-compose.dev.yml up
   ```

   Access the application:
   - Frontend: http://localhost:6969
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/docs

5. **Or run separately (without Docker)**

   Terminal 1 - Backend:
   ```bash
   cd backend
   uvicorn app.main:app --reload --port 8000
   ```

   Terminal 2 - Frontend:
   ```bash
   cd frontend
   yarn dev
   ```

   Terminal 3 - MongoDB:
   ```bash
   docker run -d -p 27017:27017 mongo:7.0
   ```

## API Endpoints

### Authentication
- `POST /api/v1/auth/register` - Register new user
- `POST /api/v1/auth/login` - Login and get token
- `GET /api/v1/auth/me` - Get current user (protected)

### Health
- `GET /health` - Health check endpoint

## Deployment

### GitHub Setup

1. Configure GitHub secrets and variables (see [GITHUB_SETUP.md](GITHUB_SETUP.md))
2. Set up server infrastructure
3. Push to `qa` or `main` branch to trigger deployment

### Manual Deployment

**QA:**
```bash
cd docker
docker compose -f docker-compose.qa.yml up -d
```

**Production:**
```bash
cd docker
docker compose -f docker-compose.prod.yml up -d
```

## Nginx Routing

The nginx proxy routes requests based on the domain:

- `dev.roberthauta.com/app` → Frontend
- `dev.roberthauta.com/api` → Backend API
- `qa.roberthauta.com/app` → Frontend
- `qa.roberthauta.com/api` → Backend API
- `roberthauta.com/app` → Frontend
- `roberthauta.com/api` → Backend API

## Development Workflow

1. **Create a feature branch**
   ```bash
   git checkout -b feature/my-feature
   ```

2. **Make changes and test locally**
   ```bash
   cd docker
   docker compose -f docker-compose.dev.yml up
   ```

3. **Push and create PR**
   ```bash
   git push origin feature/my-feature
   ```

4. **Merge to `qa` for testing**
   - Automatically deploys to qa.roberthauta.com

5. **Merge to `main` for production**
   - Automatically deploys to roberthauta.com

## Scripts

### Backend
```bash
# Run development server
uvicorn app.main:app --reload

# Format code
black app/

# Lint code
ruff check app/
```

### Frontend
```bash
# Run development server
yarn dev

# Build for production
yarn build

# Lint
yarn lint

# Type check
yarn tsc --noEmit
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

## Contact

Robert Hauta - [your-email@example.com](mailto:your-email@example.com)