# GitHub Secrets and Variables Setup

This document outlines all the GitHub secrets and variables you need to configure for the CI/CD pipeline.

## Required GitHub Environments

Create the following environments in your GitHub repository:
- **qa** - For QA deployments
- **production** - For production deployments

Go to: `Settings` > `Environments` > `New environment`

## Repository Variables

These are public configuration values that don't need to be secret.

Go to: `Settings` > `Secrets and variables` > `Actions` > `Variables` tab

### Global Variables (used by all environments)

| Variable Name | Example Value | Description |
|--------------|---------------|-------------|
| `ALGORITHM` | `HS256` | JWT algorithm |
| `ACCESS_TOKEN_EXPIRE_MINUTES` | `30` | Token expiration time |
| `API_V1_PREFIX` | `/api/v1` | API path prefix |

### QA Environment Variables

Set these in the **qa** environment:

| Variable Name | Example Value | Description |
|--------------|---------------|-------------|
| `QA_MONGODB_DB_NAME` | `resume_db_qa` | MongoDB database name for QA |
| `QA_PROJECT_NAME` | `Resume API - QA` | Project name for QA |
| `QA_CORS_ORIGINS` | `["https://qa.roberthauta.com","http://qa.roberthauta.com"]` | CORS origins for QA |

### Production Environment Variables

Set these in the **production** environment:

| Variable Name | Example Value | Description |
|--------------|---------------|-------------|
| `PROD_MONGODB_DB_NAME` | `resume_db_prod` | MongoDB database name for production |
| `PROD_PROJECT_NAME` | `Resume API` | Project name for production |
| `PROD_CORS_ORIGINS` | `["https://roberthauta.com","https://www.roberthauta.com","http://roberthauta.com","http://www.roberthauta.com"]` | CORS origins for production |

## Repository Secrets

These are sensitive values that should be kept secret.

Go to: `Settings` > `Secrets and variables` > `Actions` > `Secrets` tab

### QA Environment Secrets

Set these in the **qa** environment:

| Secret Name | Description | How to Generate |
|-------------|-------------|-----------------|
| `QA_MONGODB_URL` | MongoDB connection string | `mongodb://mongodb:27017` (or your hosted MongoDB URL) |
| `QA_SECRET_KEY` | JWT secret key | Run: `openssl rand -hex 32` |
| `QA_HOST` | QA server hostname/IP | Your QA server address |
| `QA_USERNAME` | SSH username for QA server | Server SSH username |
| `QA_SSH_KEY` | SSH private key for QA server | Generate with: `ssh-keygen -t ed25519 -C "github-actions-qa"` |

### Production Environment Secrets

Set these in the **production** environment:

| Secret Name | Description | How to Generate |
|-------------|-------------|-----------------|
| `PROD_MONGODB_URL` | MongoDB connection string | `mongodb://mongodb:27017` (or your hosted MongoDB URL) |
| `PROD_SECRET_KEY` | JWT secret key | Run: `openssl rand -hex 32` |
| `PROD_HOST` | Production server hostname/IP | Your production server address |
| `PROD_USERNAME` | SSH username for production server | Server SSH username |
| `PROD_SSH_KEY` | SSH private key for production server | Generate with: `ssh-keygen -t ed25519 -C "github-actions-prod"` |

## Setting up SSH Keys

1. Generate SSH key pair:
   ```bash
   ssh-keygen -t ed25519 -C "github-actions-qa" -f ~/.ssh/github-actions-qa
   ssh-keygen -t ed25519 -C "github-actions-prod" -f ~/.ssh/github-actions-prod
   ```

2. Copy the public key to your servers:
   ```bash
   ssh-copy-id -i ~/.ssh/github-actions-qa.pub user@qa-server
   ssh-copy-id -i ~/.ssh/github-actions-prod.pub user@prod-server
   ```

3. Add the private key contents to GitHub Secrets:
   ```bash
   cat ~/.ssh/github-actions-qa  # Copy this to QA_SSH_KEY
   cat ~/.ssh/github-actions-prod  # Copy this to PROD_SSH_KEY
   ```

## Server Setup Requirements

On your QA and Production servers, you need:

1. Docker and Docker Compose installed
2. The repository cloned at `/opt/resume-app`
3. SSH access configured for the GitHub Actions user
4. The GitHub Actions user has permission to run Docker commands

### Server Directory Structure

```
/opt/resume-app/
├── docker/
│   ├── docker-compose.qa.yml (or docker-compose.prod.yml)
│   ├── nginx.conf
│   ├── frontend-nginx.conf
│   └── ssl/ (for SSL certificates)
```

## Testing the Setup

1. Push to the `qa` branch to trigger QA deployment
2. Push to the `main` branch to trigger production deployment
3. Monitor the Actions tab in GitHub to see deployment progress

## Environment URLs

- **Development**: http://localhost:6969 (local only)
- **QA**: https://qa.roberthauta.com
- **Production**: https://roberthauta.com

## Notes

- The `GITHUB_TOKEN` is automatically provided by GitHub Actions
- Make sure to enable Container Registry write permissions in your repository settings
- Consider setting up protected branches for `main` and `qa`
- Enable required status checks before merging PRs to these branches
