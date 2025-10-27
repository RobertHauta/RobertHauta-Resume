# Quick Start Guide

Get the resume website running locally in 5 minutes!

## Option 1: Docker Compose (Recommended)

The fastest way to get started:

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/RobertHauta-Resume.git
cd RobertHauta-Resume

# 2. Start all services
cd docker
docker compose -f docker-compose.dev.yml up
```

That's it! The application will be available at:
- Frontend: http://localhost:6969
- Backend API: http://localhost:8000
- API Documentation: http://localhost:8000/docs

## Option 2: Local Development (No Docker)

If you prefer to run services individually:

### 1. Start MongoDB
```bash
docker run -d -p 27017:27017 --name resume-mongo mongo:7.0
```

### 2. Start Backend
```bash
cd backend

# Create environment file
cp .env.example .env

# Generate a secret key and update .env
echo "SECRET_KEY=$(openssl rand -hex 32)" >> .env

# Install dependencies
pip install -r requirements.txt

# Run the server
uvicorn app.main:app --reload --port 8000
```

Backend will be at http://localhost:8000

### 3. Start Frontend
```bash
# In a new terminal
cd frontend

# Create environment file
cp .env.example .env

# Install dependencies
yarn install

# Run the dev server
yarn dev
```

Frontend will be at http://localhost:6969

## First Steps

1. **Open the application** at http://localhost:6969

2. **Register a new account**
   - Click "Create account"
   - Fill in your details
   - You'll be automatically logged in

3. **Explore the API**
   - Visit http://localhost:8000/docs
   - Interactive API documentation powered by FastAPI

## Stopping Services

### Docker Compose
```bash
cd docker
docker compose -f docker-compose.dev.yml down
```

### Local Development
Press `Ctrl+C` in each terminal, then:
```bash
docker stop resume-mongo
docker rm resume-mongo
```

## Next Steps

- Read the full [README.md](README.md) for detailed information
- Check [GITHUB_SETUP.md](GITHUB_SETUP.md) for deployment setup
- Start building your resume features!

## Common Issues

### Port already in use
If you get a port conflict error:
```bash
# Check what's using the port
lsof -i :6969  # or :8000
# Kill the process or change the port in vite.config.ts
```

### MongoDB connection failed
Make sure MongoDB is running:
```bash
docker ps | grep mongo
```

### Module not found (Python)
Make sure you're in the backend directory and have activated your virtual environment:
```bash
cd backend
pip install -r requirements.txt
```

### Dependencies issue (Frontend)
Clear the node_modules and reinstall:
```bash
cd frontend
rm -rf node_modules
yarn install
```