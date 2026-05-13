# 7 Days AI Challenge Website

A premium, cinematic landing page featuring scroll-linked robot animations and a high-performance cyberpunk interface.

## 🚀 Deployment to Vercel

This project is optimized for [Vercel](https://vercel.com). To deploy:

1. **Push to GitHub**:
   Since `git` was not found in the local environment, you need to push these files manually. Open your terminal in this folder and run:
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Vercel ready setup"
   git remote add origin https://github.com/ayushverma4999/7days-Ai-challenge.git
   git branch -M main
   git push -u origin main
   ```

2. **Connect to Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard).
   - Click "Add New" -> "Project".
   - Import the `7days-Ai-challenge` repository.
   - Vercel will automatically detect the **Vite** configuration.
   - Click **Deploy**.

## 🛠️ Local Development

To run the project locally with hot-reloading:

```bash
npm install
npm run dev
```

To build for production:

```bash
npm run build
```

## ✨ Features

- **Scroll-Linked Animation**: 211 HD frames of robot movement synced perfectly with scroll depth.
- **Glassmorphism UI**: High-end transparency and blur effects for a premium feel.
- **Responsive Navigation**: Smooth scrolling and dynamic navbar background.
- **Optimized Performance**: Lerp-based smoothing and hardware acceleration for animations.
