# Deployment Instructions

## Frontend Deployment to Vercel

### 1. Prerequisites
- Vercel account
- Git repository (GitHub, GitLab, or Bitbucket)

### 2. Steps:
1. Push your code to a Git repository
2. Go to [vercel.com](https://vercel.com)
3. Sign in with your Git provider
4. Click "New Project"
5. Import your repository
6. Set the following environment variables:
   - `NEXT_PUBLIC_API_URL` = `https://your-backend-url.onrender.com/api`
   - `NEXT_PUBLIC_BACKEND_URL` = `https://your-backend-url.onrender.com`
7. Deploy

### 3. Manual deployment (if preferred):
```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to client directory
cd client

# Deploy
vercel --prod
```

## Backend Deployment to Render

### 1. Prerequisites
- Render account
- Git repository (GitHub, GitLab, or Bitbucket)

### 2. Steps:
1. Push your code to a Git repository
2. Go to [render.com](https://render.com)
3. Sign in with your Git provider
4. Click "New +" and select "Web Service"
5. Connect your repository
6. Fill in the following details:
   - Name: `indhu-backend`
   - Runtime: Node
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Instance Type: Free (or choose your preferred tier)

7. Set environment variables:
   - `DATABASE_URL` = your MongoDB connection string
   - `JWT_SECRET` = your secret key
   - `PORT` = 10000

8. Deploy

### 3. Environment Variables to Set:
```env
DATABASE_URL=mongodb+srv://your-db-url
JWT_SECRET=your-secret-key-here
PORT=10000
```

## Post-Deployment Configuration

After deploying both services:

1. Get your Render backend URL (something like `https://indhu-backend-xyz.onrender.com`)

2. Update your Vercel frontend environment variables:
   ```env
   NEXT_PUBLIC_API_URL=https://indhu-backend-xyz.onrender.com/api
   NEXT_PUBLIC_BACKEND_URL=https://indhu-backend-xyz.onrender.com
   ```

3. Redeploy your frontend with the correct backend URL

## Notes:
- Make sure your MongoDB database allows connections from Render (IP whitelisting)
- Free tier services on Render may have startup delays
- Vercel frontend should work with automatic HTTPS