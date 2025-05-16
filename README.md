# Open House App

A digital sign-in system for real estate open houses. Works offline and can be installed as a PWA.

## Deployment Options

### 1. Deploy as a PWA on the Web

#### Vercel (Easiest)
1. Sign up for a free account at [Vercel](https://vercel.com)
2. Install Vercel CLI: `npm i -g vercel`
3. Deploy from your project directory: `vercel`
4. Follow the prompts and your app will be live at `https://your-project-name.vercel.app`

#### Netlify
1. Create a `netlify.toml` file in the root directory:
```
[build]
  command = "npm run build"
  publish = "out"
```
2. Sign up for a [Netlify](https://netlify.com) account
3. Deploy using Netlify CLI or connect your GitHub repository

#### GitHub Pages
1. Update `next.config.js` to include your repository name as the base path
2. Push your code to GitHub
3. Enable GitHub Pages in your repository settings

### 2. Package as a Mobile App

#### iOS (Using Capacitor)
1. Install Capacitor: `npm install @capacitor/core @capacitor/ios`
2. Initialize Capacitor: `npx cap init`
3. Build your Next.js app: `npm run build`
4. Add iOS platform: `npx cap add ios`
5. Open in Xcode: `npx cap open ios`
6. Build and deploy using Xcode

#### Android (Using Capacitor)
1. Install Capacitor: `npm install @capacitor/core @capacitor/android`
2. Initialize Capacitor: `npx cap init`
3. Build your Next.js app: `npm run build`
4. Add Android platform: `npx cap add android`
5. Open in Android Studio: `npx cap open android`
6. Build and deploy using Android Studio

## Local Development
1. Install dependencies: `npm install`
2. Run development server: `npm run dev`
3. Visit `http://localhost:3000` in your browser

## Features

- Digital sign-in form for open house visitors
- Collects visitor contact information
- Tracks agent relationships and off-market listing interests
- Exports data to CSV format
- Mobile-responsive design

## Setup

1. Clone the repository
2. Open `index.html` in a web browser
3. Update the property address using the `updatePropertyAddress()` function

## Technologies Used

- HTML5
- CSS3 (Bootstrap 5)
- JavaScript 