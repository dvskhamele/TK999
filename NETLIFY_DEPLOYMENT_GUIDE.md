# Netlify Configuration for TK999

## Prerequisites

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Login to Netlify:
   ```bash
   netlify login
   ```

## Automated Deployment

Run the deployment script:
```bash
./deploy-to-netlify.sh
```

## Manual Deployment Steps

1. Extract the frontend files:
   ```bash
   unzip tk999-frontend.zip
   ```

2. Deploy using Netlify CLI:
   ```bash
   netlify deploy --dir=frontend/dist --prod
   ```

## Configuration Details

The `netlify.toml` file in the client directory contains:
```toml
[build]
  base = "client/"
  publish = "dist/"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

This configuration:
- Sets the base directory to `client/`
- Publishes files from the `dist/` directory
- Uses `npm run build` to build the project
- Sets up SPA routing with a redirect rule

## Environment Variables

No environment variables are required for the frontend deployment.

## Post-Deployment

After deployment, you can:
1. Set up a custom domain in the Netlify dashboard
2. Enable automatic SSL certificates
3. Configure form handling if needed
4. Set up split testing or branch deploys