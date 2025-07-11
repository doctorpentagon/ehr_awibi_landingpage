# AWIBI EHR Landing Page

A professional, responsive landing page for AWIBI EHR (Electronic Health Records) system built with React, Vite, and Tailwind CSS. This project demonstrates modern web development practices with pixel-perfect implementation based on Figma designs.

## 🚀 Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd awibi-ehr-landing

# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview
```

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [Installation Guide](#installation-guide)
- [Development Guide](#development-guide)
- [Deployment Guide](#deployment-guide)
- [API Integration](#api-integration)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)
- [Contributing](#contributing)
- [License](#license)

## 🎯 Project Overview

AWIBI EHR Landing Page is a comprehensive marketing website designed to showcase the features and benefits of the AWIBI Electronic Health Records system. The project targets healthcare professionals, hospitals, laboratories, and individual practitioners across Africa.

### Key Objectives

- **Professional Presentation**: Create a modern, trustworthy interface that appeals to healthcare professionals
- **User Experience**: Provide intuitive navigation and clear information architecture
- **Conversion Optimization**: Guide visitors through a structured journey from awareness to subscription
- **Mobile Responsiveness**: Ensure optimal experience across all devices
- **Performance**: Deliver fast loading times and smooth interactions

### Target Audience

1. **Hospitals & Clinics**: Large healthcare institutions requiring comprehensive patient management
2. **Individual Health Professionals**: Doctors and practitioners running private practices
3. **Labs & Imaging Centers**: Diagnostic facilities needing result management and sharing capabilities

## 🛠 Technology Stack

### Core Technologies

- **React 18**: Modern JavaScript library for building user interfaces
- **Vite**: Next-generation frontend build tool for fast development
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development
- **React Router DOM**: Declarative routing for React applications

### UI Components & Libraries

- **shadcn/ui**: High-quality, accessible React components
- **Lucide React**: Beautiful, customizable SVG icons
- **Framer Motion**: Production-ready motion library for React

### Development Tools

- **ESLint**: JavaScript linting utility for code quality
- **PostCSS**: Tool for transforming CSS with JavaScript
- **pnpm**: Fast, disk space efficient package manager

### Font & Typography

- **Inter**: Modern, highly legible typeface optimized for user interfaces

## 📁 Project Structure

```
awibi-ehr-landing/
├── public/                     # Static assets
├── src/                        # Source code
│   ├── assets/                 # Images, icons, and media files
│   │   ├── icon1.png          # Feature icons
│   │   ├── icon2.png
│   │   ├── ...
│   │   ├── logodark.png       # Dark theme logo
│   │   ├── logowhite.png      # Light theme logo
│   │   ├── image1.png         # Hero section image
│   │   └── ...
│   ├── components/             # Reusable React components
│   │   ├── ui/                # shadcn/ui components
│   │   ├── Header.jsx         # Navigation header
│   │   └── Footer.jsx         # Site footer
│   ├── pages/                  # Page components
│   │   ├── HomePage.jsx       # Main landing page
│   │   ├── PricingPage.jsx    # Standalone pricing page
│   │   ├── ContactPage.jsx    # Contact form page
│   │   ├── DownloadPage.jsx   # App download page
│   │   └── CheckoutPage.jsx   # Payment processing page
│   ├── App.jsx                # Main application component
│   ├── App.css               # Global styles and Tailwind imports
│   ├── main.jsx              # Application entry point
│   └── index.css             # Base CSS styles
├── components.json            # shadcn/ui configuration
├── eslint.config.js          # ESLint configuration
├── index.html                # HTML entry point
├── package.json              # Project dependencies and scripts
├── pnpm-lock.yaml           # Dependency lock file
├── postcss.config.js        # PostCSS configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── vite.config.js           # Vite build configuration
├── README.md                # Project documentation
├── TESTING_RESULTS.md       # Testing documentation
└── DEPLOYMENT_GUIDE.md      # Deployment instructions
```

## ✨ Features

### 🏠 Homepage Features

#### Hero Section
- Compelling headline with gradient text effects
- Clear value proposition for healthcare professionals
- Dual call-to-action buttons (Get Started, Schedule Demo)
- Professional dashboard mockup image

#### Who Is It For Section
- Three distinct user personas with dedicated cards
- Clear benefit statements for each target audience
- Professional iconography and visual hierarchy

#### Features Showcase
- Two-column responsive layout
- Four key feature highlights with icons
- Benefit-focused messaging
- Strategic call-to-action placement

#### Dynamic Pricing Section
- Interactive pricing toggles (Monthly/Yearly)
- Multi-tier pricing options (Hospital/Laboratory/Professional)
- Real-time price updates based on selections
- "Most Popular" plan highlighting
- Feature comparison lists

#### Testimonials Carousel
- Four customer testimonials with navigation
- Professional headshots and credentials
- Geographic diversity (Lagos, Ibadan, Calabar, Enugu)
- Interactive navigation arrows

#### FAQ Accordion
- Expandable question sections
- Pre-opened default question for engagement
- Comprehensive coverage of common concerns
- Professional styling with hover effects

### 📄 Additional Pages

#### Pricing Page
- Standalone pricing interface
- Identical functionality to homepage pricing section
- Clean, focused layout for price comparison

#### Contact Page
- Two-section layout (dark header, light content)
- Contact information with clickable links
- Comprehensive contact form with validation
- Professional styling consistent with brand

#### Download Page
- Centralized content layout
- App Store and Google Play download buttons
- Feature highlights and system requirements
- Mobile app benefits explanation

#### Checkout Page
- Dynamic plan information from pricing selection
- Multiple payment methods (Card, Bank Transfer)
- Payment gateway integration placeholders (Stripe, Remita)
- Order summary with plan details
- Coupon code functionality
- Form validation and user feedback

### 🎨 Design Features

#### Visual Design
- Consistent blue-purple gradient theme
- Professional typography with Inter font family
- Proper spacing and visual hierarchy
- High-quality iconography and imagery
- Responsive design for all screen sizes

#### Interactive Elements
- Smooth hover effects and transitions
- Mobile-friendly navigation with hamburger menu
- Form validation with real-time feedback
- Loading states and user feedback
- Accessibility considerations

#### Performance Optimizations
- Optimized image loading
- Efficient CSS with Tailwind utilities
- Fast build times with Vite
- Minimal JavaScript bundle size
- Progressive enhancement approach

## 🔧 Installation Guide

### Prerequisites

Before installing the AWIBI EHR Landing Page, ensure you have the following software installed on your system:

- **Node.js** (version 16.0 or higher)
- **pnpm** (recommended) or npm/yarn
- **Git** for version control

### Step-by-Step Installation

#### 1. Clone the Repository

```bash
git clone <repository-url>
cd awibi-ehr-landing
```

#### 2. Install Dependencies

Using pnpm (recommended):
```bash
pnpm install
```

Using npm:
```bash
npm install
```

Using yarn:
```bash
yarn install
```

#### 3. Environment Setup

Create a `.env.local` file in the root directory for environment variables:

```env
# Development environment
VITE_APP_NAME=AWIBI EHR
VITE_API_URL=http://localhost:3000/api
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key
VITE_REMITA_PUBLIC_KEY=your_remita_public_key
```

#### 4. Start Development Server

```bash
pnpm run dev
```

The application will be available at `http://localhost:5173`

### Verification

After installation, verify the setup by:

1. Opening the application in your browser
2. Checking that all pages load correctly
3. Testing interactive features (pricing toggles, navigation)
4. Ensuring responsive design works on different screen sizes

## 🚀 Development Guide

### Development Workflow

#### Starting Development

1. **Start the development server**:
   ```bash
   pnpm run dev
   ```

2. **Open your browser** to `http://localhost:5173`

3. **Make changes** to the source code - the server will automatically reload

#### Code Organization

##### Component Structure
- **Functional Components**: All components use React functional components with hooks
- **Props Validation**: Components include proper prop types and default values
- **Reusability**: Components are designed for maximum reusability
- **Separation of Concerns**: Logic, styling, and presentation are properly separated

##### State Management
- **Local State**: Uses React's `useState` for component-level state
- **Props Drilling**: Minimal props drilling with strategic state placement
- **Context API**: Available for global state if needed in future iterations

##### Styling Approach
- **Tailwind CSS**: Utility-first approach for rapid development
- **Custom CSS**: Minimal custom CSS in App.css for specific needs
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Design System**: Consistent spacing, colors, and typography

#### Adding New Features

##### Creating New Components

1. **Create component file** in `src/components/`:
   ```jsx
   // src/components/NewComponent.jsx
   import React from 'react'
   
   const NewComponent = ({ prop1, prop2 }) => {
     return (
       <div className="component-container">
         {/* Component content */}
       </div>
     )
   }
   
   export default NewComponent
   ```

2. **Import and use** in parent components:
   ```jsx
   import NewComponent from './components/NewComponent'
   ```

##### Adding New Pages

1. **Create page component** in `src/pages/`:
   ```jsx
   // src/pages/NewPage.jsx
   import React from 'react'
   
   const NewPage = () => {
     return (
       <div className="min-h-screen">
         {/* Page content */}
       </div>
     )
   }
   
   export default NewPage
   ```

2. **Add route** in `App.jsx`:
   ```jsx
   import NewPage from './pages/NewPage'
   
   // In the Routes component
   <Route path="/new-page" element={<NewPage />} />
   ```

3. **Update navigation** in `Header.jsx`:
   ```jsx
   const navigation = [
     // existing items
     { name: 'New Page', href: '/new-page' },
   ]
   ```

#### Styling Guidelines

##### Tailwind CSS Best Practices

1. **Use utility classes** for common styling:
   ```jsx
   <div className="bg-white p-6 rounded-lg shadow-lg">
   ```

2. **Create custom utilities** for repeated patterns:
   ```css
   @layer utilities {
     .gradient-text {
       @apply bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent;
     }
   }
   ```

3. **Responsive design** with breakpoint prefixes:
   ```jsx
   <div className="text-sm md:text-base lg:text-lg">
   ```

##### Color Scheme
- **Primary**: Blue (#2563eb) to Purple (#9333ea) gradient
- **Secondary**: Gray scale for text and backgrounds
- **Accent**: Blue for interactive elements
- **Success**: Green for positive actions
- **Warning**: Yellow for cautions
- **Error**: Red for errors

#### Testing During Development

##### Manual Testing Checklist

1. **Functionality Testing**:
   - All navigation links work correctly
   - Forms submit and validate properly
   - Interactive elements respond to user input
   - Pricing toggles update content correctly

2. **Visual Testing**:
   - Layout appears correctly on different screen sizes
   - Images and icons load properly
   - Typography and spacing are consistent
   - Colors and gradients render correctly

3. **Performance Testing**:
   - Page load times are acceptable
   - Animations are smooth
   - No console errors or warnings
   - Memory usage remains stable

##### Browser Testing

Test the application in multiple browsers:
- **Chrome** (primary development browser)
- **Firefox** for compatibility
- **Safari** for WebKit rendering
- **Edge** for Microsoft compatibility

#### Debugging

##### Common Issues and Solutions

1. **Component Not Rendering**:
   - Check import/export statements
   - Verify component is properly added to routes
   - Check for JavaScript errors in console

2. **Styling Issues**:
   - Verify Tailwind classes are correct
   - Check for CSS conflicts
   - Ensure responsive breakpoints are appropriate

3. **State Management Issues**:
   - Use React Developer Tools for state inspection
   - Check component re-rendering patterns
   - Verify event handlers are properly bound

##### Development Tools

- **React Developer Tools**: Browser extension for React debugging
- **Tailwind CSS IntelliSense**: VS Code extension for class suggestions
- **ES7+ React/Redux/React-Native snippets**: Code snippets for faster development
- **Prettier**: Code formatting for consistency

### Code Quality Standards

#### ESLint Configuration

The project includes ESLint configuration for code quality:

```javascript
// eslint.config.js
export default [
  {
    rules: {
      'react/prop-types': 'warn',
      'no-unused-vars': 'warn',
      'no-console': 'warn',
    }
  }
]
```

#### Best Practices

1. **Component Naming**: Use PascalCase for component names
2. **File Organization**: Group related files in appropriate directories
3. **Import Organization**: Order imports logically (React, libraries, local)
4. **Code Comments**: Add comments for complex logic
5. **Error Handling**: Implement proper error boundaries and validation

## 📚 Detailed Documentation

For comprehensive documentation covering every aspect of the project, please refer to the following files:

- **[TECHNICAL_DOCUMENTATION.md](./TECHNICAL_DOCUMENTATION.md)**: In-depth technical details
- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)**: Complete deployment instructions
- **[API_INTEGRATION.md](./API_INTEGRATION.md)**: Backend integration guidelines
- **[TESTING_RESULTS.md](./TESTING_RESULTS.md)**: Testing documentation and results

## 🤝 Contributing

We welcome contributions to improve the AWIBI EHR Landing Page. Please read our contributing guidelines and follow the established code standards.

## 📄 License

This project is licensed under the MIT License. See the LICENSE file for details.

---

**Built with ❤️ by the AWIBI Development Team**

