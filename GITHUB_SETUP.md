# GitHub Pages Setup Guide

This guide will help you set up GitHub Pages deployment for your resume website.

## Prerequisites

- A GitHub account
- Your repository pushed to GitHub
- GitHub Pages enabled on your repository

## Step 1: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** → **Pages** (in the left sidebar)
3. Under **Source**, select **GitHub Actions**

That's it for basic setup! The repository already has a workflow file at `.github/workflows/deploy-pages.yml` that will automatically deploy your site.

## Step 2: Configure Repository Permissions

Your repository needs proper permissions for GitHub Actions to deploy to Pages:

1. Go to **Settings** → **Actions** → **General**
2. Scroll down to **Workflow permissions**
3. Select **Read and write permissions**
4. Check **Allow GitHub Actions to create and approve pull requests**
5. Click **Save**

## Step 3: Verify the Workflow

1. Go to the **Actions** tab in your repository
2. You should see the "Deploy to GitHub Pages" workflow
3. If you've already pushed to `main`, it should have triggered automatically

## How It Works

The GitHub Actions workflow (`.github/workflows/deploy-pages.yml`) does the following:

1. **Triggers** on every push to the `main` branch
2. **Installs** Node.js and project dependencies
3. **Builds** the React application with Vite
4. **Deploys** the built files to GitHub Pages

## Manual Deployment

To manually trigger a deployment:

1. Go to **Actions** tab
2. Select **Deploy to GitHub Pages** workflow
3. Click **Run workflow**
4. Select the `main` branch
5. Click **Run workflow**

## Your Site URL

After successful deployment, your site will be available at:

```
https://<your-username>.github.io/RobertHauta-Resume/
```

For example: `https://roberthauta.github.io/RobertHauta-Resume/`

## Custom Domain (Optional)

To use a custom domain like `www.yourdomain.com`:

1. **Configure DNS** with your domain provider:
   - Add a CNAME record pointing to `<your-username>.github.io`
   - Or add A records pointing to GitHub's IP addresses

2. **Add custom domain in GitHub**:
   - Go to **Settings** → **Pages**
   - Enter your custom domain under **Custom domain**
   - Click **Save**

3. **Update base URL** in `frontend/vite.config.ts`:
   ```typescript
   export default defineConfig({
     base: '/', // Change from '/RobertHauta-Resume/'
     // ... rest of config
   })
   ```

4. **Create CNAME file** in `frontend/public/`:
   ```
   www.yourdomain.com
   ```

5. **Enable HTTPS** (recommended):
   - Check **Enforce HTTPS** in Settings → Pages

## Troubleshooting

### Workflow fails with permission errors

Make sure you've enabled the correct workflow permissions (see Step 2 above).

### 404 errors on page refresh

This is common with client-side routing. GitHub Pages needs a custom 404.html:

1. Create `frontend/public/404.html` with the same content as `index.html`
2. The application's router will handle the correct route

### Assets not loading

Check that the `base` URL in `vite.config.ts` matches your repository name:
```typescript
base: '/RobertHauta-Resume/', // Must match your repo name
```

### Build fails

Check the Actions logs for specific errors. Common issues:
- TypeScript errors (run `yarn tsc --noEmit` locally to check)
- Missing dependencies (ensure all are in `package.json`)
- Linting errors (run `yarn lint` locally)

## Monitoring Deployments

1. Go to **Actions** tab to see deployment history
2. Click on a workflow run to see detailed logs
3. Green checkmark = successful deployment
4. Red X = failed deployment (click to see error logs)

## Development Workflow

1. **Develop locally**:
   ```bash
   cd frontend
   yarn dev
   ```

2. **Test build locally**:
   ```bash
   yarn build
   yarn preview
   ```

3. **Commit and push**:
   ```bash
   git add .
   git commit -m "Your changes"
   git push origin main
   ```

4. **Automatic deployment**: GitHub Actions will automatically build and deploy

## Protecting the Main Branch (Recommended)

To prevent accidental pushes to main:

1. Go to **Settings** → **Branches**
2. Click **Add branch protection rule**
3. Enter `main` as the branch name pattern
4. Enable:
   - **Require a pull request before merging**
   - **Require status checks to pass before merging**
5. Click **Create**

Now you'll need to create PRs for changes, ensuring review before deployment.

## Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)