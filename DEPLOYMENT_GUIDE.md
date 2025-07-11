# AWIBI EHR Landing Page - Deployment Guide

## Table of Contents

1. [Deployment Overview](#deployment-overview)
2. [Pre-Deployment Checklist](#pre-deployment-checklist)
3. [Environment Configuration](#environment-configuration)
4. [Static Hosting Deployment](#static-hosting-deployment)
5. [CDN and Performance Optimization](#cdn-and-performance-optimization)
6. [Domain Configuration](#domain-configuration)
7. [SSL Certificate Setup](#ssl-certificate-setup)
8. [Monitoring and Analytics](#monitoring-and-analytics)
9. [Continuous Deployment](#continuous-deployment)
10. [Troubleshooting](#troubleshooting)

## Deployment Overview

The AWIBI EHR Landing Page is a static React application that can be deployed to various hosting platforms. This guide covers multiple deployment strategies, from simple static hosting to enterprise-level deployments with CDN integration and continuous deployment pipelines.

### Deployment Architecture

The application follows a modern static site deployment pattern:

```
Source Code (GitHub/GitLab)
    ↓
Build Process (CI/CD)
    ↓
Static Assets (HTML, CSS, JS)
    ↓
CDN Distribution (Global Edge Locations)
    ↓
End Users (Worldwide)
```

### Supported Deployment Platforms

1. **Vercel** (Recommended for simplicity)
2. **Netlify** (Great for static sites)
3. **AWS S3 + CloudFront** (Enterprise solution)
4. **GitHub Pages** (Free for open source)
5. **Azure Static Web Apps** (Microsoft ecosystem)
6. **Google Cloud Storage + CDN** (Google ecosystem)

## Pre-Deployment Checklist

### Code Quality Verification

Before deploying, ensure the following checks pass:

```bash
# Run linting
pnpm run lint

# Build the application
pnpm run build

# Preview the build locally
pnpm run preview
```

### Performance Audit

```bash
# Install Lighthouse CLI (if not already installed)
npm install -g lighthouse

# Run Lighthouse audit on local build
lighthouse http://localhost:4173 --output html --output-path ./lighthouse-report.html
```

**Target Performance Metrics:**
- Performance Score: > 90
- Accessibility Score: > 95
- Best Practices Score: > 90
- SEO Score: > 90

### Security Checklist

- [ ] No sensitive data in source code
- [ ] Environment variables properly configured
- [ ] Dependencies updated to latest secure versions
- [ ] HTTPS enforced in production
- [ ] Security headers configured

### SEO Optimization

- [ ] Meta tags properly configured
- [ ] Open Graph tags added
- [ ] Sitemap generated
- [ ] Robots.txt configured
- [ ] Structured data implemented

## Environment Configuration

### Environment Variables

Create environment-specific configuration files:

#### Production Environment (.env.production)
```env
# Application Configuration
VITE_APP_NAME=AWIBI EHR
VITE_APP_VERSION=1.0.0
VITE_APP_ENVIRONMENT=production

# API Configuration
VITE_API_URL=https://api.awibiehr.com
VITE_API_VERSION=v1

# Payment Gateway Configuration
VITE_STRIPE_PUBLIC_KEY=pk_live_your_stripe_public_key
VITE_REMITA_PUBLIC_KEY=your_remita_public_key
VITE_REMITA_MERCHANT_ID=your_merchant_id

# Analytics Configuration
VITE_GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
VITE_FACEBOOK_PIXEL_ID=your_facebook_pixel_id

# Feature Flags
VITE_ENABLE_ANALYTICS=true
VITE_ENABLE_CHAT_SUPPORT=true
VITE_ENABLE_A_B_TESTING=false

# Contact Information
VITE_CONTACT_EMAIL=awibihealth@gmail.com
VITE_CONTACT_PHONE=+2348078905396
VITE_SUPPORT_EMAIL=support@awibiehr.com

# Social Media Links
VITE_LINKEDIN_URL=https://linkedin.com/company/awibi-ehr
VITE_TWITTER_URL=https://twitter.com/awibiehr
VITE_FACEBOOK_URL=https://facebook.com/awibiehr
```

#### Staging Environment (.env.staging)
```env
# Application Configuration
VITE_APP_NAME=AWIBI EHR (Staging)
VITE_APP_VERSION=1.0.0-staging
VITE_APP_ENVIRONMENT=staging

# API Configuration
VITE_API_URL=https://staging-api.awibiehr.com
VITE_API_VERSION=v1

# Payment Gateway Configuration (Test Keys)
VITE_STRIPE_PUBLIC_KEY=pk_test_your_stripe_test_key
VITE_REMITA_PUBLIC_KEY=your_remita_test_key
VITE_REMITA_MERCHANT_ID=your_test_merchant_id

# Analytics Configuration (Test)
VITE_GOOGLE_ANALYTICS_ID=GA_TEST_MEASUREMENT_ID
VITE_FACEBOOK_PIXEL_ID=your_test_facebook_pixel_id

# Feature Flags
VITE_ENABLE_ANALYTICS=false
VITE_ENABLE_CHAT_SUPPORT=false
VITE_ENABLE_A_B_TESTING=true

# Contact Information
VITE_CONTACT_EMAIL=staging@awibiehr.com
VITE_CONTACT_PHONE=+2348078905396
VITE_SUPPORT_EMAIL=staging-support@awibiehr.com
```

### Build Configuration

Update `vite.config.js` for production optimizations:

```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig(({ mode }) => ({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: mode === 'development',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: mode === 'production',
        drop_debugger: mode === 'production',
      },
    },
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          router: ['react-router-dom'],
          icons: ['lucide-react'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: 5173,
    host: true,
  },
  preview: {
    port: 4173,
    host: true,
  },
}))
```

## Static Hosting Deployment

### Vercel Deployment (Recommended)

Vercel provides the simplest deployment experience with automatic builds and global CDN.

#### Step 1: Install Vercel CLI
```bash
npm install -g vercel
```

#### Step 2: Login to Vercel
```bash
vercel login
```

#### Step 3: Deploy from Command Line
```bash
# Navigate to project directory
cd awibi-ehr-landing

# Deploy to Vercel
vercel

# Follow the prompts:
# ? Set up and deploy "awibi-ehr-landing"? [Y/n] y
# ? Which scope do you want to deploy to? [Your Account]
# ? Link to existing project? [y/N] n
# ? What's your project's name? awibi-ehr-landing
# ? In which directory is your code located? ./
```

#### Step 4: Configure Build Settings

Create `vercel.json` in the project root:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ],
  "env": {
    "VITE_APP_ENVIRONMENT": "production"
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        },
        {
          "key": "Referrer-Policy",
          "value": "strict-origin-when-cross-origin"
        }
      ]
    },
    {
      "source": "/static/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

#### Step 5: Environment Variables

Configure environment variables in Vercel dashboard:

1. Go to your project dashboard on Vercel
2. Navigate to Settings → Environment Variables
3. Add all production environment variables
4. Redeploy the application

### Netlify Deployment

Netlify offers excellent static site hosting with form handling and serverless functions.

#### Step 1: Build Configuration

Create `netlify.toml` in the project root:

```toml
[build]
  publish = "dist"
  command = "pnpm run build"

[build.environment]
  NODE_VERSION = "18"
  PNPM_VERSION = "8"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-XSS-Protection = "1; mode=block"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"

[[headers]]
  for = "/static/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "*.js"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"

[[headers]]
  for = "*.css"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

#### Step 2: Deploy via Git

1. Push your code to GitHub/GitLab
2. Connect your repository to Netlify
3. Configure build settings:
   - Build command: `pnpm run build`
   - Publish directory: `dist`
   - Node version: `18`

#### Step 3: Environment Variables

Add environment variables in Netlify dashboard:
1. Go to Site settings → Environment variables
2. Add all production environment variables
3. Trigger a new deploy

### AWS S3 + CloudFront Deployment

For enterprise-level deployments with full control over infrastructure.

#### Step 1: Create S3 Bucket

```bash
# Install AWS CLI
aws configure

# Create S3 bucket
aws s3 mb s3://awibi-ehr-landing-prod --region us-east-1

# Enable static website hosting
aws s3 website s3://awibi-ehr-landing-prod \
  --index-document index.html \
  --error-document index.html
```

#### Step 2: Configure Bucket Policy

Create `bucket-policy.json`:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::awibi-ehr-landing-prod/*"
    }
  ]
}
```

Apply the policy:
```bash
aws s3api put-bucket-policy \
  --bucket awibi-ehr-landing-prod \
  --policy file://bucket-policy.json
```

#### Step 3: Deploy to S3

```bash
# Build the application
pnpm run build

# Sync files to S3
aws s3 sync dist/ s3://awibi-ehr-landing-prod \
  --delete \
  --cache-control "public, max-age=31536000" \
  --exclude "*.html" \
  --exclude "service-worker.js"

# Upload HTML files with shorter cache
aws s3 sync dist/ s3://awibi-ehr-landing-prod \
  --delete \
  --cache-control "public, max-age=0, must-revalidate" \
  --include "*.html" \
  --include "service-worker.js"
```

#### Step 4: Create CloudFront Distribution

Create `cloudfront-config.json`:

```json
{
  "CallerReference": "awibi-ehr-landing-2024",
  "Comment": "AWIBI EHR Landing Page Distribution",
  "DefaultCacheBehavior": {
    "TargetOriginId": "S3-awibi-ehr-landing-prod",
    "ViewerProtocolPolicy": "redirect-to-https",
    "MinTTL": 0,
    "ForwardedValues": {
      "QueryString": false,
      "Cookies": {
        "Forward": "none"
      }
    },
    "TrustedSigners": {
      "Enabled": false,
      "Quantity": 0
    }
  },
  "Origins": {
    "Quantity": 1,
    "Items": [
      {
        "Id": "S3-awibi-ehr-landing-prod",
        "DomainName": "awibi-ehr-landing-prod.s3.amazonaws.com",
        "S3OriginConfig": {
          "OriginAccessIdentity": ""
        }
      }
    ]
  },
  "Enabled": true,
  "CustomErrorResponses": {
    "Quantity": 1,
    "Items": [
      {
        "ErrorCode": 404,
        "ResponsePagePath": "/index.html",
        "ResponseCode": "200",
        "ErrorCachingMinTTL": 300
      }
    ]
  }
}
```

Create the distribution:
```bash
aws cloudfront create-distribution \
  --distribution-config file://cloudfront-config.json
```

## CDN and Performance Optimization

### Caching Strategy

Implement a comprehensive caching strategy for optimal performance:

#### Static Assets Caching
- **JavaScript/CSS files**: 1 year cache (immutable)
- **Images**: 1 year cache with versioning
- **HTML files**: No cache or short cache (for updates)
- **API responses**: Appropriate cache based on data freshness

#### Cache Headers Configuration

```javascript
// In your deployment configuration
const cacheHeaders = {
  // Static assets with hash in filename
  '/assets/*': {
    'Cache-Control': 'public, max-age=31536000, immutable',
    'Expires': new Date(Date.now() + 31536000000).toUTCString()
  },
  
  // HTML files
  '*.html': {
    'Cache-Control': 'public, max-age=0, must-revalidate',
    'ETag': 'W/"hash-of-content"'
  },
  
  // Service worker
  '/service-worker.js': {
    'Cache-Control': 'public, max-age=0, must-revalidate'
  }
}
```

### Image Optimization

#### Responsive Images Implementation

```javascript
// Add to your image components
const OptimizedImage = ({ src, alt, className }) => {
  return (
    <picture>
      <source 
        srcSet={`${src}?w=400&f=webp 400w, ${src}?w=800&f=webp 800w, ${src}?w=1200&f=webp 1200w`}
        type="image/webp"
      />
      <source 
        srcSet={`${src}?w=400 400w, ${src}?w=800 800w, ${src}?w=1200 1200w`}
        type="image/jpeg"
      />
      <img 
        src={`${src}?w=800`}
        alt={alt}
        className={className}
        loading="lazy"
        decoding="async"
      />
    </picture>
  )
}
```

#### Image Compression Pipeline

```bash
# Install image optimization tools
npm install -g imagemin-cli imagemin-webp imagemin-mozjpeg imagemin-pngquant

# Optimize images before deployment
imagemin src/assets/*.{jpg,png} --out-dir=dist/assets --plugin=mozjpeg --plugin=pngquant
imagemin src/assets/*.{jpg,png} --out-dir=dist/assets --plugin=webp
```

### Performance Monitoring

#### Core Web Vitals Tracking

Add performance monitoring to your application:

```javascript
// src/utils/performance.js
export const trackWebVitals = (onPerfEntry) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
      getCLS(onPerfEntry)
      getFID(onPerfEntry)
      getFCP(onPerfEntry)
      getLCP(onPerfEntry)
      getTTFB(onPerfEntry)
    })
  }
}

// Usage in main.jsx
import { trackWebVitals } from './utils/performance'

trackWebVitals((metric) => {
  // Send to analytics
  gtag('event', metric.name, {
    value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
    event_category: 'Web Vitals',
    event_label: metric.id,
    non_interaction: true,
  })
})
```

## Domain Configuration

### Custom Domain Setup

#### DNS Configuration

Configure your DNS records to point to your hosting provider:

**For Vercel:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com

Type: A
Name: @
Value: 76.76.19.61
```

**For Netlify:**
```
Type: CNAME
Name: www
Value: your-site-name.netlify.app

Type: A
Name: @
Value: 75.2.60.5
```

**For CloudFront:**
```
Type: CNAME
Name: www
Value: d1234567890.cloudfront.net

Type: A
Name: @
Value: [CloudFront IP addresses]
```

#### Domain Verification

1. **Add domain to hosting provider**
2. **Configure DNS records**
3. **Wait for propagation** (up to 48 hours)
4. **Verify domain ownership**
5. **Enable HTTPS**

### Subdomain Strategy

Consider using subdomains for different environments:

- `www.awibiehr.com` - Production
- `staging.awibiehr.com` - Staging environment
- `dev.awibiehr.com` - Development environment
- `docs.awibiehr.com` - Documentation
- `api.awibiehr.com` - API endpoints

## SSL Certificate Setup

### Automatic SSL (Recommended)

Most modern hosting providers offer automatic SSL certificates:

#### Vercel SSL
- Automatically provisions SSL certificates
- Supports custom domains
- Auto-renewal included

#### Netlify SSL
- Free SSL certificates via Let's Encrypt
- Automatic renewal
- Custom certificate upload option

#### CloudFront SSL
```bash
# Request SSL certificate via AWS Certificate Manager
aws acm request-certificate \
  --domain-name awibiehr.com \
  --subject-alternative-names www.awibiehr.com \
  --validation-method DNS \
  --region us-east-1
```

### SSL Configuration Best Practices

#### Security Headers

Implement comprehensive security headers:

```javascript
// Security headers configuration
const securityHeaders = {
  'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
  'Content-Security-Policy': `
    default-src 'self';
    script-src 'self' 'unsafe-inline' https://www.google-analytics.com;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    font-src 'self' https://fonts.gstatic.com;
    img-src 'self' data: https:;
    connect-src 'self' https://api.awibiehr.com;
  `.replace(/\s+/g, ' ').trim(),
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'DENY',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()'
}
```

#### SSL Testing

Verify SSL configuration:

```bash
# Test SSL configuration
curl -I https://awibiehr.com

# Check SSL certificate details
openssl s_client -connect awibiehr.com:443 -servername awibiehr.com

# Use online tools
# - SSL Labs SSL Test: https://www.ssllabs.com/ssltest/
# - Security Headers: https://securityheaders.com/
```

## Monitoring and Analytics

### Google Analytics 4 Setup

#### Implementation

```javascript
// src/utils/analytics.js
export const initializeAnalytics = () => {
  // Google Analytics 4
  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_GOOGLE_ANALYTICS_ID}`
  document.head.appendChild(script)

  window.dataLayer = window.dataLayer || []
  function gtag() {
    dataLayer.push(arguments)
  }
  gtag('js', new Date())
  gtag('config', import.meta.env.VITE_GOOGLE_ANALYTICS_ID, {
    page_title: document.title,
    page_location: window.location.href,
  })

  window.gtag = gtag
}

// Track custom events
export const trackEvent = (eventName, parameters = {}) => {
  if (window.gtag) {
    window.gtag('event', eventName, parameters)
  }
}

// Track page views
export const trackPageView = (path) => {
  if (window.gtag) {
    window.gtag('config', import.meta.env.VITE_GOOGLE_ANALYTICS_ID, {
      page_path: path,
    })
  }
}
```

#### Event Tracking

```javascript
// Track important user interactions
const trackUserInteractions = () => {
  // Pricing plan selection
  trackEvent('pricing_plan_selected', {
    plan_name: planName,
    plan_price: planPrice,
    billing_period: billingPeriod
  })

  // Contact form submission
  trackEvent('contact_form_submitted', {
    form_location: 'contact_page'
  })

  // Download button clicks
  trackEvent('app_download_clicked', {
    platform: 'ios' // or 'android'
  })

  // Demo request
  trackEvent('demo_requested', {
    source: 'hero_section'
  })
}
```

### Error Monitoring

#### Sentry Integration

```bash
# Install Sentry
pnpm add @sentry/react @sentry/tracing
```

```javascript
// src/utils/sentry.js
import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'

export const initializeSentry = () => {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    integrations: [
      new Integrations.BrowserTracing(),
    ],
    tracesSampleRate: 1.0,
    environment: import.meta.env.VITE_APP_ENVIRONMENT,
  })
}

// Error boundary component
export const SentryErrorBoundary = Sentry.withErrorBoundary(App, {
  fallback: ({ error, resetError }) => (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">
          Something went wrong
        </h1>
        <p className="text-gray-600 mb-4">
          We've been notified of this error and are working to fix it.
        </p>
        <button
          onClick={resetError}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          Try again
        </button>
      </div>
    </div>
  ),
})
```

### Performance Monitoring

#### Real User Monitoring (RUM)

```javascript
// src/utils/rum.js
class PerformanceMonitor {
  constructor() {
    this.metrics = {}
    this.init()
  }

  init() {
    // Monitor page load performance
    window.addEventListener('load', () => {
      this.collectLoadMetrics()
    })

    // Monitor navigation performance
    this.observeNavigation()
    
    // Monitor resource loading
    this.observeResources()
  }

  collectLoadMetrics() {
    const navigation = performance.getEntriesByType('navigation')[0]
    
    this.metrics = {
      dns: navigation.domainLookupEnd - navigation.domainLookupStart,
      tcp: navigation.connectEnd - navigation.connectStart,
      ssl: navigation.connectEnd - navigation.secureConnectionStart,
      ttfb: navigation.responseStart - navigation.requestStart,
      download: navigation.responseEnd - navigation.responseStart,
      dom: navigation.domContentLoadedEventEnd - navigation.navigationStart,
      load: navigation.loadEventEnd - navigation.navigationStart,
    }

    this.sendMetrics()
  }

  observeNavigation() {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'navigation') {
          this.trackNavigationTiming(entry)
        }
      }
    })
    
    observer.observe({ entryTypes: ['navigation'] })
  }

  observeResources() {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.entryType === 'resource') {
          this.trackResourceTiming(entry)
        }
      }
    })
    
    observer.observe({ entryTypes: ['resource'] })
  }

  sendMetrics() {
    // Send to analytics service
    if (window.gtag) {
      Object.entries(this.metrics).forEach(([key, value]) => {
        window.gtag('event', 'performance_metric', {
          metric_name: key,
          metric_value: Math.round(value),
          custom_parameter: 'performance_monitoring'
        })
      })
    }
  }
}

// Initialize performance monitoring
export const performanceMonitor = new PerformanceMonitor()
```

## Continuous Deployment

### GitHub Actions Workflow

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'pnpm'
    
    - name: Install pnpm
      run: npm install -g pnpm
    
    - name: Install dependencies
      run: pnpm install
    
    - name: Run linting
      run: pnpm run lint
    
    - name: Run tests
      run: pnpm run test
    
    - name: Build application
      run: pnpm run build
      env:
        VITE_APP_ENVIRONMENT: production
        VITE_API_URL: ${{ secrets.VITE_API_URL }}
        VITE_STRIPE_PUBLIC_KEY: ${{ secrets.VITE_STRIPE_PUBLIC_KEY }}
        VITE_GOOGLE_ANALYTICS_ID: ${{ secrets.VITE_GOOGLE_ANALYTICS_ID }}

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'pnpm'
    
    - name: Install pnpm
      run: npm install -g pnpm
    
    - name: Install dependencies
      run: pnpm install
    
    - name: Build application
      run: pnpm run build
      env:
        VITE_APP_ENVIRONMENT: production
        VITE_API_URL: ${{ secrets.VITE_API_URL }}
        VITE_STRIPE_PUBLIC_KEY: ${{ secrets.VITE_STRIPE_PUBLIC_KEY }}
        VITE_GOOGLE_ANALYTICS_ID: ${{ secrets.VITE_GOOGLE_ANALYTICS_ID }}
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'
        working-directory: ./
```

### GitLab CI/CD Pipeline

Create `.gitlab-ci.yml`:

```yaml
stages:
  - test
  - build
  - deploy

variables:
  NODE_VERSION: "18"

cache:
  paths:
    - node_modules/
    - .pnpm-store/

before_script:
  - npm install -g pnpm
  - pnpm config set store-dir .pnpm-store

test:
  stage: test
  image: node:$NODE_VERSION
  script:
    - pnpm install
    - pnpm run lint
    - pnpm run test
  artifacts:
    reports:
      junit: junit.xml
    paths:
      - coverage/

build:
  stage: build
  image: node:$NODE_VERSION
  script:
    - pnpm install
    - pnpm run build
  artifacts:
    paths:
      - dist/
    expire_in: 1 hour
  only:
    - main
    - develop

deploy_staging:
  stage: deploy
  image: node:$NODE_VERSION
  script:
    - pnpm install -g netlify-cli
    - netlify deploy --dir=dist --site=$NETLIFY_STAGING_SITE_ID --auth=$NETLIFY_AUTH_TOKEN
  environment:
    name: staging
    url: https://staging.awibiehr.com
  only:
    - develop

deploy_production:
  stage: deploy
  image: node:$NODE_VERSION
  script:
    - pnpm install -g netlify-cli
    - netlify deploy --dir=dist --prod --site=$NETLIFY_SITE_ID --auth=$NETLIFY_AUTH_TOKEN
  environment:
    name: production
    url: https://awibiehr.com
  only:
    - main
  when: manual
```

### Deployment Automation Scripts

Create deployment scripts for different environments:

#### deploy.sh
```bash
#!/bin/bash

set -e

# Configuration
ENVIRONMENT=${1:-production}
BUILD_DIR="dist"

echo "🚀 Starting deployment for $ENVIRONMENT environment..."

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Run tests
echo "🧪 Running tests..."
pnpm run lint
pnpm run test

# Build application
echo "🔨 Building application..."
if [ "$ENVIRONMENT" = "production" ]; then
  pnpm run build
else
  pnpm run build:staging
fi

# Deploy based on environment
echo "🌐 Deploying to $ENVIRONMENT..."
case $ENVIRONMENT in
  "production")
    # Deploy to production
    vercel --prod --confirm
    ;;
  "staging")
    # Deploy to staging
    netlify deploy --dir=$BUILD_DIR --site=$NETLIFY_STAGING_SITE_ID
    ;;
  *)
    echo "❌ Unknown environment: $ENVIRONMENT"
    exit 1
    ;;
esac

echo "✅ Deployment completed successfully!"

# Post-deployment checks
echo "🔍 Running post-deployment checks..."
./scripts/health-check.sh $ENVIRONMENT

echo "🎉 Deployment process completed!"
```

#### health-check.sh
```bash
#!/bin/bash

ENVIRONMENT=${1:-production}

if [ "$ENVIRONMENT" = "production" ]; then
  URL="https://awibiehr.com"
else
  URL="https://staging.awibiehr.com"
fi

echo "🔍 Running health checks for $URL..."

# Check if site is accessible
HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" $URL)

if [ $HTTP_STATUS -eq 200 ]; then
  echo "✅ Site is accessible (HTTP $HTTP_STATUS)"
else
  echo "❌ Site is not accessible (HTTP $HTTP_STATUS)"
  exit 1
fi

# Check if critical pages load
PAGES=("/" "/pricing" "/contact" "/download")

for page in "${PAGES[@]}"; do
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$URL$page")
  if [ $STATUS -eq 200 ]; then
    echo "✅ $page loads successfully"
  else
    echo "❌ $page failed to load (HTTP $STATUS)"
    exit 1
  fi
done

# Check performance
echo "📊 Running Lighthouse audit..."
lighthouse $URL --output=json --output-path=./lighthouse-report.json --chrome-flags="--headless"

# Parse Lighthouse results
PERFORMANCE=$(cat lighthouse-report.json | jq '.lhr.categories.performance.score * 100')
echo "📈 Performance Score: $PERFORMANCE"

if (( $(echo "$PERFORMANCE >= 90" | bc -l) )); then
  echo "✅ Performance score meets requirements"
else
  echo "⚠️ Performance score below threshold (90)"
fi

echo "🎉 Health checks completed!"
```

## Troubleshooting

### Common Deployment Issues

#### Build Failures

**Issue**: Build fails with "out of memory" error
```bash
# Solution: Increase Node.js memory limit
export NODE_OPTIONS="--max-old-space-size=4096"
pnpm run build
```

**Issue**: Missing environment variables
```bash
# Solution: Check environment variable configuration
echo $VITE_API_URL
# If empty, add to your deployment platform's environment variables
```

**Issue**: Import path errors
```bash
# Solution: Check import paths and aliases
# Ensure vite.config.js has correct path aliases
resolve: {
  alias: {
    '@': path.resolve(__dirname, './src'),
  },
}
```

#### Runtime Issues

**Issue**: Blank page after deployment
```javascript
// Solution: Check for JavaScript errors in browser console
// Common causes:
// 1. Missing environment variables
// 2. Incorrect base URL configuration
// 3. CSP (Content Security Policy) blocking resources

// Add error boundary to catch and display errors
const ErrorBoundary = ({ children }) => {
  const [hasError, setHasError] = useState(false)
  
  useEffect(() => {
    const handleError = (error) => {
      console.error('Application error:', error)
      setHasError(true)
    }
    
    window.addEventListener('error', handleError)
    return () => window.removeEventListener('error', handleError)
  }, [])
  
  if (hasError) {
    return <div>Something went wrong. Check console for details.</div>
  }
  
  return children
}
```

**Issue**: Routing not working (404 on refresh)
```javascript
// Solution: Configure server to serve index.html for all routes
// For Netlify: Add _redirects file
/* /index.html 200

// For Vercel: Add vercel.json
{
  "routes": [
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}

// For Apache: Add .htaccess
RewriteEngine On
RewriteRule ^(?!.*\.).*$ /index.html [L]
```

#### Performance Issues

**Issue**: Slow loading times
```javascript
// Solution: Implement performance optimizations

// 1. Code splitting
const LazyComponent = lazy(() => import('./LazyComponent'))

// 2. Image optimization
<img 
  src="image.jpg" 
  loading="lazy" 
  decoding="async"
  alt="Description"
/>

// 3. Preload critical resources
<link rel="preload" href="/critical.css" as="style" />
<link rel="preload" href="/hero-image.jpg" as="image" />

// 4. Service worker for caching
// Register service worker in main.jsx
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js')
}
```

### Debugging Tools

#### Browser Developer Tools
- **Network Tab**: Check for failed requests
- **Console Tab**: Look for JavaScript errors
- **Performance Tab**: Analyze loading performance
- **Application Tab**: Check service worker and storage

#### Online Testing Tools
- **GTmetrix**: Performance analysis
- **PageSpeed Insights**: Google's performance tool
- **WebPageTest**: Detailed performance metrics
- **SSL Labs**: SSL configuration testing

#### Command Line Tools
```bash
# Test site accessibility
curl -I https://awibiehr.com

# Check DNS resolution
nslookup awibiehr.com

# Test SSL certificate
openssl s_client -connect awibiehr.com:443

# Performance testing
lighthouse https://awibiehr.com --output html
```

### Rollback Procedures

#### Quick Rollback
```bash
# For Vercel
vercel rollback [deployment-url]

# For Netlify
netlify api rollbackSiteDeploy --site-id=SITE_ID --deploy-id=PREVIOUS_DEPLOY_ID

# For AWS S3
aws s3 sync s3://backup-bucket/previous-version/ s3://awibi-ehr-landing-prod/
```

#### Automated Rollback
```javascript
// health-check-and-rollback.js
const axios = require('axios')

const healthCheck = async (url) => {
  try {
    const response = await axios.get(url, { timeout: 10000 })
    return response.status === 200
  } catch (error) {
    return false
  }
}

const rollback = async () => {
  // Implement rollback logic based on your deployment platform
  console.log('Rolling back to previous version...')
  // Execute rollback commands
}

const main = async () => {
  const isHealthy = await healthCheck('https://awibiehr.com')
  
  if (!isHealthy) {
    console.log('Health check failed. Initiating rollback...')
    await rollback()
  } else {
    console.log('Health check passed. Deployment successful.')
  }
}

main()
```

This comprehensive deployment guide provides everything needed to successfully deploy and maintain the AWIBI EHR Landing Page in production environments. The guide covers multiple deployment strategies, performance optimization, monitoring, and troubleshooting to ensure a robust and reliable deployment process.

