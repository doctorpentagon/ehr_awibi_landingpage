# AWIBI EHR Landing Page - API Integration Guide

## Table of Contents

1. [Integration Overview](#integration-overview)
2. [Backend System Architecture](#backend-system-architecture)
3. [API Endpoints](#api-endpoints)
4. [Authentication & Security](#authentication--security)
5. [Data Models](#data-models)
6. [Frontend Integration](#frontend-integration)
7. [Payment Gateway Integration](#payment-gateway-integration)
8. [Email Service Integration](#email-service-integration)
9. [Analytics Integration](#analytics-integration)
10. [Error Handling](#error-handling)
11. [Testing Strategies](#testing-strategies)
12. [Production Considerations](#production-considerations)

## Integration Overview

The AWIBI EHR Landing Page is designed to integrate seamlessly with the main AWIBI EHR backend system. This document outlines the integration points, API specifications, and best practices for connecting the landing page to the backend services.

### Integration Architecture

```
Frontend (Landing Page)
    ↓ HTTPS/REST API
Backend Services
    ├── User Management Service
    ├── Subscription Service
    ├── Payment Processing Service
    ├── Email Service
    ├── Analytics Service
    └── Content Management Service
```

### Key Integration Points

1. **User Registration**: New user signup from landing page
2. **Subscription Management**: Plan selection and billing
3. **Payment Processing**: Stripe and Remita integration
4. **Contact Forms**: Lead generation and support requests
5. **Demo Requests**: Sales team notification system
6. **Analytics Tracking**: User behavior and conversion metrics

## Backend System Architecture

### Microservices Architecture

The AWIBI EHR backend follows a microservices architecture pattern, with each service responsible for specific business domains:

#### Core Services

**User Management Service**
- User registration and authentication
- Profile management
- Role-based access control
- Organization management

**Subscription Service**
- Plan management
- Billing cycles
- Feature access control
- Usage tracking

**Payment Service**
- Payment processing
- Invoice generation
- Refund handling
- Payment method management

**Notification Service**
- Email notifications
- SMS alerts
- In-app notifications
- Webhook management

**Analytics Service**
- User behavior tracking
- Conversion metrics
- Performance monitoring
- Business intelligence

### Database Schema

#### Users Table
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    organization_name VARCHAR(255),
    organization_type ENUM('hospital', 'laboratory', 'professional'),
    email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);
```

#### Subscriptions Table
```sql
CREATE TABLE subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    plan_id UUID NOT NULL REFERENCES plans(id),
    status ENUM('active', 'cancelled', 'expired', 'trial') NOT NULL,
    billing_period ENUM('monthly', 'yearly') NOT NULL,
    current_period_start TIMESTAMP NOT NULL,
    current_period_end TIMESTAMP NOT NULL,
    trial_end TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### Plans Table
```sql
CREATE TABLE plans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(100) NOT NULL,
    description TEXT,
    organization_type ENUM('hospital', 'laboratory', 'professional'),
    monthly_price DECIMAL(10,2) NOT NULL,
    yearly_price DECIMAL(10,2) NOT NULL,
    features JSON NOT NULL,
    limits JSON NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

#### Contact Requests Table
```sql
CREATE TABLE contact_requests (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    organization_name VARCHAR(255),
    message TEXT NOT NULL,
    request_type ENUM('general', 'demo', 'support', 'sales') DEFAULT 'general',
    status ENUM('new', 'in_progress', 'resolved', 'closed') DEFAULT 'new',
    assigned_to UUID REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## API Endpoints

### Base Configuration

```javascript
// API configuration
const API_CONFIG = {
  baseURL: process.env.VITE_API_URL || 'https://api.awibiehr.com',
  version: 'v1',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }
}

// API client setup
import axios from 'axios'

const apiClient = axios.create({
  baseURL: `${API_CONFIG.baseURL}/${API_CONFIG.version}`,
  timeout: API_CONFIG.timeout,
  headers: API_CONFIG.headers,
})

// Request interceptor for authentication
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access
      localStorage.removeItem('authToken')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
```

### User Management Endpoints

#### User Registration
```javascript
// POST /api/v1/auth/register
const registerUser = async (userData) => {
  try {
    const response = await apiClient.post('/auth/register', {
      email: userData.email,
      password: userData.password,
      firstName: userData.firstName,
      lastName: userData.lastName,
      phone: userData.phone,
      organizationName: userData.organizationName,
      organizationType: userData.organizationType,
      source: 'landing_page'
    })
    
    return {
      success: true,
      data: response.data,
      message: 'Registration successful'
    }
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Registration failed',
      details: error.response?.data?.errors || []
    }
  }
}

// Usage in registration form
const handleRegistration = async (formData) => {
  setLoading(true)
  
  const result = await registerUser(formData)
  
  if (result.success) {
    // Store authentication token
    localStorage.setItem('authToken', result.data.token)
    
    // Track registration event
    trackEvent('user_registered', {
      organization_type: formData.organizationType,
      source: 'landing_page'
    })
    
    // Redirect to dashboard or onboarding
    navigate('/dashboard')
  } else {
    setError(result.error)
    setFieldErrors(result.details)
  }
  
  setLoading(false)
}
```

#### Email Verification
```javascript
// POST /api/v1/auth/verify-email
const verifyEmail = async (token) => {
  try {
    const response = await apiClient.post('/auth/verify-email', { token })
    return { success: true, data: response.data }
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Email verification failed'
    }
  }
}

// GET /api/v1/auth/resend-verification
const resendVerification = async (email) => {
  try {
    const response = await apiClient.post('/auth/resend-verification', { email })
    return { success: true, message: 'Verification email sent' }
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to send verification email'
    }
  }
}
```

### Subscription Management Endpoints

#### Get Available Plans
```javascript
// GET /api/v1/plans
const getPlans = async (organizationType = null) => {
  try {
    const params = organizationType ? { type: organizationType } : {}
    const response = await apiClient.get('/plans', { params })
    
    return {
      success: true,
      data: response.data.plans,
      meta: response.data.meta
    }
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to fetch plans'
    }
  }
}

// Usage in pricing component
const PricingSection = () => {
  const [plans, setPlans] = useState([])
  const [loading, setLoading] = useState(true)
  const [organizationType, setOrganizationType] = useState('hospital')
  
  useEffect(() => {
    const fetchPlans = async () => {
      setLoading(true)
      const result = await getPlans(organizationType)
      
      if (result.success) {
        setPlans(result.data)
      } else {
        console.error('Failed to fetch plans:', result.error)
      }
      
      setLoading(false)
    }
    
    fetchPlans()
  }, [organizationType])
  
  // Component render logic...
}
```

#### Create Subscription
```javascript
// POST /api/v1/subscriptions
const createSubscription = async (subscriptionData) => {
  try {
    const response = await apiClient.post('/subscriptions', {
      planId: subscriptionData.planId,
      billingPeriod: subscriptionData.billingPeriod,
      paymentMethodId: subscriptionData.paymentMethodId,
      couponCode: subscriptionData.couponCode,
      organizationType: subscriptionData.organizationType
    })
    
    return {
      success: true,
      data: response.data,
      message: 'Subscription created successfully'
    }
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to create subscription',
      details: error.response?.data?.errors || []
    }
  }
}

// Usage in checkout process
const processSubscription = async (checkoutData) => {
  setProcessing(true)
  
  try {
    // First, create payment method if needed
    let paymentMethodId = checkoutData.paymentMethodId
    
    if (!paymentMethodId && checkoutData.paymentMethod === 'card') {
      const paymentResult = await createPaymentMethod(checkoutData.cardData)
      if (!paymentResult.success) {
        throw new Error(paymentResult.error)
      }
      paymentMethodId = paymentResult.data.id
    }
    
    // Create subscription
    const subscriptionResult = await createSubscription({
      ...checkoutData,
      paymentMethodId
    })
    
    if (subscriptionResult.success) {
      // Track successful subscription
      trackEvent('subscription_created', {
        plan_id: checkoutData.planId,
        billing_period: checkoutData.billingPeriod,
        organization_type: checkoutData.organizationType
      })
      
      // Redirect to success page
      navigate('/subscription/success', {
        state: { subscription: subscriptionResult.data }
      })
    } else {
      setError(subscriptionResult.error)
    }
  } catch (error) {
    setError(error.message)
  } finally {
    setProcessing(false)
  }
}
```

### Contact Form Endpoints

#### Submit Contact Request
```javascript
// POST /api/v1/contact
const submitContactRequest = async (contactData) => {
  try {
    const response = await apiClient.post('/contact', {
      firstName: contactData.firstName,
      lastName: contactData.lastName,
      email: contactData.email,
      phone: contactData.phone,
      organizationName: contactData.organizationName,
      message: contactData.message,
      requestType: contactData.requestType || 'general',
      source: 'landing_page'
    })
    
    return {
      success: true,
      data: response.data,
      message: 'Contact request submitted successfully'
    }
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to submit contact request',
      details: error.response?.data?.errors || []
    }
  }
}

// Usage in contact form
const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organizationName: '',
    message: '',
    requestType: 'general'
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    
    const result = await submitContactRequest(formData)
    
    if (result.success) {
      setSubmitted(true)
      
      // Track form submission
      trackEvent('contact_form_submitted', {
        request_type: formData.requestType,
        has_organization: !!formData.organizationName
      })
      
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        organizationName: '',
        message: '',
        requestType: 'general'
      })
    } else {
      setError(result.error)
    }
    
    setSubmitting(false)
  }
  
  // Form render logic...
}
```

#### Demo Request
```javascript
// POST /api/v1/demo/request
const requestDemo = async (demoData) => {
  try {
    const response = await apiClient.post('/demo/request', {
      firstName: demoData.firstName,
      lastName: demoData.lastName,
      email: demoData.email,
      phone: demoData.phone,
      organizationName: demoData.organizationName,
      organizationType: demoData.organizationType,
      preferredTime: demoData.preferredTime,
      specificRequirements: demoData.specificRequirements,
      source: 'landing_page'
    })
    
    return {
      success: true,
      data: response.data,
      message: 'Demo request submitted successfully'
    }
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || 'Failed to submit demo request'
    }
  }
}

// Usage in demo request modal
const DemoRequestModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    organizationName: '',
    organizationType: 'hospital',
    preferredTime: '',
    specificRequirements: ''
  })
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const result = await requestDemo(formData)
    
    if (result.success) {
      // Track demo request
      trackEvent('demo_requested', {
        organization_type: formData.organizationType,
        source: 'landing_page'
      })
      
      // Show success message
      toast.success('Demo request submitted! Our team will contact you soon.')
      onClose()
    } else {
      toast.error(result.error)
    }
  }
  
  // Modal render logic...
}
```

## Authentication & Security

### JWT Token Management

```javascript
// Token management utilities
class TokenManager {
  static setToken(token) {
    localStorage.setItem('authToken', token)
    this.scheduleTokenRefresh(token)
  }
  
  static getToken() {
    return localStorage.getItem('authToken')
  }
  
  static removeToken() {
    localStorage.removeItem('authToken')
    this.clearTokenRefresh()
  }
  
  static isTokenValid(token) {
    if (!token) return false
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      return payload.exp * 1000 > Date.now()
    } catch {
      return false
    }
  }
  
  static scheduleTokenRefresh(token) {
    if (!token) return
    
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      const expirationTime = payload.exp * 1000
      const refreshTime = expirationTime - (15 * 60 * 1000) // 15 minutes before expiry
      const timeUntilRefresh = refreshTime - Date.now()
      
      if (timeUntilRefresh > 0) {
        this.refreshTimeout = setTimeout(() => {
          this.refreshToken()
        }, timeUntilRefresh)
      }
    } catch (error) {
      console.error('Error scheduling token refresh:', error)
    }
  }
  
  static clearTokenRefresh() {
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout)
      this.refreshTimeout = null
    }
  }
  
  static async refreshToken() {
    try {
      const response = await apiClient.post('/auth/refresh')
      this.setToken(response.data.token)
      return response.data.token
    } catch (error) {
      console.error('Token refresh failed:', error)
      this.removeToken()
      window.location.href = '/login'
    }
  }
}

// Authentication context
const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    const initializeAuth = async () => {
      const token = TokenManager.getToken()
      
      if (token && TokenManager.isTokenValid(token)) {
        try {
          const response = await apiClient.get('/auth/me')
          setUser(response.data.user)
          TokenManager.scheduleTokenRefresh(token)
        } catch (error) {
          TokenManager.removeToken()
        }
      }
      
      setLoading(false)
    }
    
    initializeAuth()
  }, [])
  
  const login = async (credentials) => {
    try {
      const response = await apiClient.post('/auth/login', credentials)
      const { token, user } = response.data
      
      TokenManager.setToken(token)
      setUser(user)
      
      return { success: true, user }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed'
      }
    }
  }
  
  const logout = () => {
    TokenManager.removeToken()
    setUser(null)
  }
  
  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user
  }
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
```

### API Security Best Practices

#### Request Validation
```javascript
// Input validation middleware
const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body)
    if (error) {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        errors: error.details.map(detail => ({
          field: detail.path.join('.'),
          message: detail.message
        }))
      })
    }
    next()
  }
}

// Registration validation schema (using Joi)
const registrationSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/).required(),
  firstName: Joi.string().min(2).max(50).required(),
  lastName: Joi.string().min(2).max(50).required(),
  phone: Joi.string().pattern(/^\+?[1-9]\d{1,14}$/).optional(),
  organizationName: Joi.string().min(2).max(100).optional(),
  organizationType: Joi.string().valid('hospital', 'laboratory', 'professional').required()
})

// Usage in route
app.post('/api/v1/auth/register', validateRequest(registrationSchema), registerUser)
```

#### Rate Limiting
```javascript
// Rate limiting configuration
const rateLimit = require('express-rate-limit')

const createRateLimiter = (windowMs, max, message) => {
  return rateLimit({
    windowMs,
    max,
    message: {
      success: false,
      message,
      retryAfter: Math.ceil(windowMs / 1000)
    },
    standardHeaders: true,
    legacyHeaders: false,
  })
}

// Different rate limits for different endpoints
const authLimiter = createRateLimiter(
  15 * 60 * 1000, // 15 minutes
  5, // 5 attempts
  'Too many authentication attempts, please try again later'
)

const contactLimiter = createRateLimiter(
  60 * 60 * 1000, // 1 hour
  3, // 3 submissions
  'Too many contact form submissions, please try again later'
)

const generalLimiter = createRateLimiter(
  15 * 60 * 1000, // 15 minutes
  100, // 100 requests
  'Too many requests, please try again later'
)

// Apply rate limiting
app.use('/api/v1/auth', authLimiter)
app.use('/api/v1/contact', contactLimiter)
app.use('/api/v1', generalLimiter)
```

#### CORS Configuration
```javascript
// CORS configuration
const cors = require('cors')

const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = [
      'https://awibiehr.com',
      'https://www.awibiehr.com',
      'https://staging.awibiehr.com',
      ...(process.env.NODE_ENV === 'development' ? ['http://localhost:5173'] : [])
    ]
    
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  maxAge: 86400 // 24 hours
}

app.use(cors(corsOptions))
```

## Data Models

### Frontend Data Models

```javascript
// User model
export class User {
  constructor(data) {
    this.id = data.id
    this.email = data.email
    this.firstName = data.firstName
    this.lastName = data.lastName
    this.phone = data.phone
    this.organizationName = data.organizationName
    this.organizationType = data.organizationType
    this.emailVerified = data.emailVerified
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
  }
  
  get fullName() {
    return `${this.firstName} ${this.lastName}`
  }
  
  get displayName() {
    return this.organizationName || this.fullName
  }
  
  toJSON() {
    return {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      phone: this.phone,
      organizationName: this.organizationName,
      organizationType: this.organizationType,
      emailVerified: this.emailVerified,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString()
    }
  }
}

// Subscription model
export class Subscription {
  constructor(data) {
    this.id = data.id
    this.userId = data.userId
    this.plan = new Plan(data.plan)
    this.status = data.status
    this.billingPeriod = data.billingPeriod
    this.currentPeriodStart = new Date(data.currentPeriodStart)
    this.currentPeriodEnd = new Date(data.currentPeriodEnd)
    this.trialEnd = data.trialEnd ? new Date(data.trialEnd) : null
    this.createdAt = new Date(data.createdAt)
    this.updatedAt = new Date(data.updatedAt)
  }
  
  get isActive() {
    return this.status === 'active'
  }
  
  get isTrial() {
    return this.status === 'trial' && this.trialEnd && this.trialEnd > new Date()
  }
  
  get daysUntilExpiry() {
    const now = new Date()
    const expiryDate = this.trialEnd || this.currentPeriodEnd
    const diffTime = expiryDate - now
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }
  
  get monthlyPrice() {
    return this.billingPeriod === 'monthly' 
      ? this.plan.monthlyPrice 
      : this.plan.yearlyPrice / 12
  }
}

// Plan model
export class Plan {
  constructor(data) {
    this.id = data.id
    this.name = data.name
    this.description = data.description
    this.organizationType = data.organizationType
    this.monthlyPrice = data.monthlyPrice
    this.yearlyPrice = data.yearlyPrice
    this.features = data.features
    this.limits = data.limits
    this.isActive = data.isActive
  }
  
  getPrice(billingPeriod) {
    return billingPeriod === 'monthly' ? this.monthlyPrice : this.yearlyPrice
  }
  
  getFormattedPrice(billingPeriod, currency = 'NGN') {
    const price = this.getPrice(billingPeriod)
    const formatter = new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0
    })
    return formatter.format(price)
  }
  
  hasFeature(featureName) {
    return this.features.includes(featureName)
  }
  
  getLimit(limitName) {
    return this.limits[limitName] || 0
  }
}

// Contact request model
export class ContactRequest {
  constructor(data) {
    this.id = data.id
    this.firstName = data.firstName
    this.lastName = data.lastName
    this.email = data.email
    this.phone = data.phone
    this.organizationName = data.organizationName
    this.message = data.message
    this.requestType = data.requestType
    this.status = data.status
    this.createdAt = new Date(data.createdAt)
  }
  
  get fullName() {
    return `${this.firstName} ${this.lastName}`
  }
  
  get isNew() {
    return this.status === 'new'
  }
  
  get isPending() {
    return this.status === 'in_progress'
  }
  
  get isResolved() {
    return ['resolved', 'closed'].includes(this.status)
  }
}
```

### Data Validation

```javascript
// Validation utilities
export const validators = {
  email: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  },
  
  phone: (phone) => {
    const phoneRegex = /^\+?[1-9]\d{1,14}$/
    return phoneRegex.test(phone.replace(/\s/g, ''))
  },
  
  password: (password) => {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/
    return passwordRegex.test(password)
  },
  
  required: (value) => {
    return value !== null && value !== undefined && value.toString().trim() !== ''
  },
  
  minLength: (value, min) => {
    return value && value.toString().length >= min
  },
  
  maxLength: (value, max) => {
    return value && value.toString().length <= max
  }
}

// Form validation hook
export const useFormValidation = (initialValues, validationRules) => {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  
  const validateField = (name, value) => {
    const rules = validationRules[name]
    if (!rules) return null
    
    for (const rule of rules) {
      const error = rule(value)
      if (error) return error
    }
    
    return null
  }
  
  const validateForm = () => {
    const newErrors = {}
    
    Object.keys(validationRules).forEach(name => {
      const error = validateField(name, values[name])
      if (error) {
        newErrors[name] = error
      }
    })
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleChange = (name, value) => {
    setValues(prev => ({ ...prev, [name]: value }))
    
    if (touched[name]) {
      const error = validateField(name, value)
      setErrors(prev => ({ ...prev, [name]: error }))
    }
  }
  
  const handleBlur = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }))
    const error = validateField(name, values[name])
    setErrors(prev => ({ ...prev, [name]: error }))
  }
  
  const reset = () => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
  }
  
  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateForm,
    reset,
    isValid: Object.keys(errors).length === 0
  }
}
```

## Frontend Integration

### API Service Layer

```javascript
// API service base class
class ApiService {
  constructor(baseURL) {
    this.client = axios.create({
      baseURL,
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    
    this.setupInterceptors()
  }
  
  setupInterceptors() {
    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        const token = TokenManager.getToken()
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        
        // Add request ID for tracking
        config.headers['X-Request-ID'] = this.generateRequestId()
        
        return config
      },
      (error) => Promise.reject(error)
    )
    
    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config
        
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true
          
          try {
            await TokenManager.refreshToken()
            return this.client(originalRequest)
          } catch (refreshError) {
            TokenManager.removeToken()
            window.location.href = '/login'
            return Promise.reject(refreshError)
          }
        }
        
        return Promise.reject(error)
      }
    )
  }
  
  generateRequestId() {
    return `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }
  
  async get(url, config = {}) {
    try {
      const response = await this.client.get(url, config)
      return this.handleResponse(response)
    } catch (error) {
      return this.handleError(error)
    }
  }
  
  async post(url, data, config = {}) {
    try {
      const response = await this.client.post(url, data, config)
      return this.handleResponse(response)
    } catch (error) {
      return this.handleError(error)
    }
  }
  
  async put(url, data, config = {}) {
    try {
      const response = await this.client.put(url, data, config)
      return this.handleResponse(response)
    } catch (error) {
      return this.handleError(error)
    }
  }
  
  async delete(url, config = {}) {
    try {
      const response = await this.client.delete(url, config)
      return this.handleResponse(response)
    } catch (error) {
      return this.handleError(error)
    }
  }
  
  handleResponse(response) {
    return {
      success: true,
      data: response.data,
      status: response.status,
      headers: response.headers
    }
  }
  
  handleError(error) {
    const response = error.response
    
    return {
      success: false,
      error: response?.data?.message || error.message || 'An error occurred',
      status: response?.status,
      details: response?.data?.errors || [],
      code: response?.data?.code
    }
  }
}

// Specific service implementations
class UserService extends ApiService {
  constructor() {
    super(`${process.env.VITE_API_URL}/v1`)
  }
  
  async register(userData) {
    return this.post('/auth/register', userData)
  }
  
  async login(credentials) {
    return this.post('/auth/login', credentials)
  }
  
  async logout() {
    return this.post('/auth/logout')
  }
  
  async getProfile() {
    return this.get('/auth/me')
  }
  
  async updateProfile(profileData) {
    return this.put('/auth/profile', profileData)
  }
  
  async verifyEmail(token) {
    return this.post('/auth/verify-email', { token })
  }
  
  async resendVerification(email) {
    return this.post('/auth/resend-verification', { email })
  }
  
  async resetPassword(email) {
    return this.post('/auth/reset-password', { email })
  }
  
  async confirmPasswordReset(token, newPassword) {
    return this.post('/auth/confirm-reset', { token, password: newPassword })
  }
}

class SubscriptionService extends ApiService {
  constructor() {
    super(`${process.env.VITE_API_URL}/v1`)
  }
  
  async getPlans(organizationType = null) {
    const params = organizationType ? { type: organizationType } : {}
    return this.get('/plans', { params })
  }
  
  async createSubscription(subscriptionData) {
    return this.post('/subscriptions', subscriptionData)
  }
  
  async getSubscription() {
    return this.get('/subscriptions/current')
  }
  
  async updateSubscription(subscriptionId, updateData) {
    return this.put(`/subscriptions/${subscriptionId}`, updateData)
  }
  
  async cancelSubscription(subscriptionId, reason = null) {
    return this.post(`/subscriptions/${subscriptionId}/cancel`, { reason })
  }
  
  async reactivateSubscription(subscriptionId) {
    return this.post(`/subscriptions/${subscriptionId}/reactivate`)
  }
  
  async getInvoices() {
    return this.get('/subscriptions/invoices')
  }
  
  async downloadInvoice(invoiceId) {
    return this.get(`/subscriptions/invoices/${invoiceId}/download`, {
      responseType: 'blob'
    })
  }
}

class ContactService extends ApiService {
  constructor() {
    super(`${process.env.VITE_API_URL}/v1`)
  }
  
  async submitContactRequest(contactData) {
    return this.post('/contact', contactData)
  }
  
  async requestDemo(demoData) {
    return this.post('/demo/request', demoData)
  }
  
  async subscribeNewsletter(email) {
    return this.post('/newsletter/subscribe', { email })
  }
  
  async unsubscribeNewsletter(token) {
    return this.post('/newsletter/unsubscribe', { token })
  }
}

// Service instances
export const userService = new UserService()
export const subscriptionService = new SubscriptionService()
export const contactService = new ContactService()
```

### React Hooks for API Integration

```javascript
// Custom hooks for API operations
export const useApi = (apiFunction, dependencies = []) => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const execute = useCallback(async (...args) => {
    try {
      setLoading(true)
      setError(null)
      
      const result = await apiFunction(...args)
      
      if (result.success) {
        setData(result.data)
        return result
      } else {
        setError(result.error)
        return result
      }
    } catch (err) {
      const errorMessage = err.message || 'An unexpected error occurred'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }, dependencies)
  
  useEffect(() => {
    execute()
  }, dependencies)
  
  const retry = () => execute()
  
  return { data, loading, error, execute, retry }
}

// Specific hooks for common operations
export const useUser = () => {
  const { data: user, loading, error, execute } = useApi(
    userService.getProfile.bind(userService),
    []
  )
  
  return { user, loading, error, refetch: execute }
}

export const usePlans = (organizationType) => {
  const { data: plans, loading, error, execute } = useApi(
    () => subscriptionService.getPlans(organizationType),
    [organizationType]
  )
  
  return { plans, loading, error, refetch: execute }
}

export const useSubscription = () => {
  const { data: subscription, loading, error, execute } = useApi(
    subscriptionService.getSubscription.bind(subscriptionService),
    []
  )
  
  return { subscription, loading, error, refetch: execute }
}

// Mutation hook for API operations that modify data
export const useMutation = (apiFunction) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  
  const mutate = useCallback(async (...args) => {
    try {
      setLoading(true)
      setError(null)
      
      const result = await apiFunction(...args)
      
      if (!result.success) {
        setError(result.error)
      }
      
      return result
    } catch (err) {
      const errorMessage = err.message || 'An unexpected error occurred'
      setError(errorMessage)
      return { success: false, error: errorMessage }
    } finally {
      setLoading(false)
    }
  }, [apiFunction])
  
  return { mutate, loading, error }
}

// Usage examples
export const useRegister = () => {
  return useMutation(userService.register.bind(userService))
}

export const useLogin = () => {
  return useMutation(userService.login.bind(userService))
}

export const useCreateSubscription = () => {
  return useMutation(subscriptionService.createSubscription.bind(subscriptionService))
}

export const useSubmitContact = () => {
  return useMutation(contactService.submitContactRequest.bind(contactService))
}
```

## Payment Gateway Integration

### Stripe Integration

```javascript
// Stripe service
class StripeService {
  constructor() {
    this.stripe = null
    this.elements = null
    this.initialized = false
  }
  
  async initialize() {
    if (this.initialized) return
    
    // Load Stripe.js
    const { loadStripe } = await import('@stripe/stripe-js')
    this.stripe = await loadStripe(process.env.VITE_STRIPE_PUBLIC_KEY)
    
    if (!this.stripe) {
      throw new Error('Failed to load Stripe')
    }
    
    this.initialized = true
  }
  
  createElements(options = {}) {
    if (!this.stripe) {
      throw new Error('Stripe not initialized')
    }
    
    this.elements = this.stripe.elements({
      appearance: {
        theme: 'stripe',
        variables: {
          colorPrimary: '#2563eb',
          colorBackground: '#ffffff',
          colorText: '#1f2937',
          colorDanger: '#ef4444',
          fontFamily: 'Inter, system-ui, sans-serif',
          spacingUnit: '4px',
          borderRadius: '8px',
        },
      },
      ...options
    })
    
    return this.elements
  }
  
  createPaymentElement(options = {}) {
    if (!this.elements) {
      throw new Error('Elements not created')
    }
    
    return this.elements.create('payment', {
      layout: 'tabs',
      ...options
    })
  }
  
  async createPaymentMethod(cardElement, billingDetails) {
    if (!this.stripe) {
      throw new Error('Stripe not initialized')
    }
    
    const { error, paymentMethod } = await this.stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: billingDetails,
    })
    
    if (error) {
      return { success: false, error: error.message }
    }
    
    return { success: true, paymentMethod }
  }
  
  async confirmPayment(clientSecret, options = {}) {
    if (!this.stripe) {
      throw new Error('Stripe not initialized')
    }
    
    const { error, paymentIntent } = await this.stripe.confirmPayment({
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/payment/success`,
        ...options.confirmParams
      },
      ...options
    })
    
    if (error) {
      return { success: false, error: error.message }
    }
    
    return { success: true, paymentIntent }
  }
  
  async createSetupIntent(customerId) {
    try {
      const response = await apiClient.post('/payments/setup-intent', {
        customer_id: customerId
      })
      
      return { success: true, clientSecret: response.data.client_secret }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to create setup intent'
      }
    }
  }
}

// Stripe React component
const StripePaymentForm = ({ onSuccess, onError, amount, currency = 'ngn' }) => {
  const stripe = useStripe()
  const elements = useElements()
  const [processing, setProcessing] = useState(false)
  const [clientSecret, setClientSecret] = useState('')
  
  useEffect(() => {
    // Create payment intent on component mount
    const createPaymentIntent = async () => {
      try {
        const response = await apiClient.post('/payments/create-intent', {
          amount: amount * 100, // Convert to cents
          currency,
          automatic_payment_methods: {
            enabled: true,
          },
        })
        
        setClientSecret(response.data.client_secret)
      } catch (error) {
        onError(error.response?.data?.message || 'Failed to initialize payment')
      }
    }
    
    if (amount > 0) {
      createPaymentIntent()
    }
  }, [amount, currency, onError])
  
  const handleSubmit = async (event) => {
    event.preventDefault()
    
    if (!stripe || !elements || !clientSecret) {
      return
    }
    
    setProcessing(true)
    
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `${window.location.origin}/payment/success`,
      },
      redirect: 'if_required',
    })
    
    if (error) {
      onError(error.message)
    } else if (paymentIntent.status === 'succeeded') {
      onSuccess(paymentIntent)
    }
    
    setProcessing(false)
  }
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />
      
      <button
        type="submit"
        disabled={!stripe || processing}
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {processing ? 'Processing...' : `Pay ${formatCurrency(amount, currency)}`}
      </button>
    </form>
  )
}

// Stripe provider wrapper
const StripeWrapper = ({ children, amount, currency }) => {
  const [stripePromise, setStripePromise] = useState(null)
  
  useEffect(() => {
    const loadStripe = async () => {
      const { loadStripe } = await import('@stripe/stripe-js')
      const stripe = await loadStripe(process.env.VITE_STRIPE_PUBLIC_KEY)
      setStripePromise(stripe)
    }
    
    loadStripe()
  }, [])
  
  if (!stripePromise) {
    return <div>Loading payment form...</div>
  }
  
  return (
    <Elements
      stripe={stripePromise}
      options={{
        mode: 'payment',
        amount: amount * 100,
        currency: currency.toLowerCase(),
        appearance: {
          theme: 'stripe',
        },
      }}
    >
      {children}
    </Elements>
  )
}
```

### Remita Integration

```javascript
// Remita service
class RemitaService {
  constructor() {
    this.publicKey = process.env.VITE_REMITA_PUBLIC_KEY
    this.merchantId = process.env.VITE_REMITA_MERCHANT_ID
    this.baseURL = process.env.NODE_ENV === 'production' 
      ? 'https://remitademo.net' 
      : 'https://remitademo.net'
  }
  
  async initializePayment(paymentData) {
    try {
      const response = await apiClient.post('/payments/remita/initialize', {
        amount: paymentData.amount,
        email: paymentData.email,
        orderId: paymentData.orderId,
        description: paymentData.description,
        customFields: paymentData.customFields
      })
      
      return {
        success: true,
        data: response.data
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to initialize Remita payment'
      }
    }
  }
  
  async verifyPayment(transactionId) {
    try {
      const response = await apiClient.get(`/payments/remita/verify/${transactionId}`)
      
      return {
        success: true,
        data: response.data
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to verify payment'
      }
    }
  }
  
  openPaymentModal(paymentData, callbacks = {}) {
    const { onSuccess, onError, onClose } = callbacks
    
    if (!window.RmPaymentEngine) {
      onError?.('Remita payment engine not loaded')
      return
    }
    
    window.RmPaymentEngine.init({
      key: this.publicKey,
      merchantId: this.merchantId,
      amount: paymentData.amount,
      email: paymentData.email,
      orderId: paymentData.orderId,
      description: paymentData.description,
      onSuccess: (response) => {
        this.verifyPayment(response.transactionId)
          .then(result => {
            if (result.success) {
              onSuccess?.(result.data)
            } else {
              onError?.(result.error)
            }
          })
      },
      onError: (error) => {
        onError?.(error.message || 'Payment failed')
      },
      onClose: () => {
        onClose?.()
      }
    })
  }
}

// Remita React component
const RemitaPaymentButton = ({ 
  amount, 
  email, 
  orderId, 
  description, 
  onSuccess, 
  onError,
  className = '',
  children 
}) => {
  const [loading, setLoading] = useState(false)
  const remitaService = new RemitaService()
  
  useEffect(() => {
    // Load Remita script
    const script = document.createElement('script')
    script.src = 'https://remitademo.net/payment/v1/remita-pay-inline.bundle.js'
    script.async = true
    document.head.appendChild(script)
    
    return () => {
      document.head.removeChild(script)
    }
  }, [])
  
  const handlePayment = async () => {
    setLoading(true)
    
    try {
      const initResult = await remitaService.initializePayment({
        amount,
        email,
        orderId,
        description
      })
      
      if (!initResult.success) {
        onError(initResult.error)
        return
      }
      
      remitaService.openPaymentModal(
        {
          amount,
          email,
          orderId,
          description
        },
        {
          onSuccess: (response) => {
            onSuccess(response)
            setLoading(false)
          },
          onError: (error) => {
            onError(error)
            setLoading(false)
          },
          onClose: () => {
            setLoading(false)
          }
        }
      )
    } catch (error) {
      onError(error.message)
      setLoading(false)
    }
  }
  
  return (
    <button
      onClick={handlePayment}
      disabled={loading}
      className={`${className} disabled:opacity-50 disabled:cursor-not-allowed`}
    >
      {loading ? 'Processing...' : children}
    </button>
  )
}
```

## Email Service Integration

### Email Templates

```javascript
// Email template service
class EmailTemplateService {
  constructor() {
    this.templates = {
      welcome: {
        subject: 'Welcome to AWIBI EHR!',
        template: 'welcome'
      },
      emailVerification: {
        subject: 'Verify your email address',
        template: 'email-verification'
      },
      passwordReset: {
        subject: 'Reset your password',
        template: 'password-reset'
      },
      subscriptionConfirmation: {
        subject: 'Subscription confirmed',
        template: 'subscription-confirmation'
      },
      contactFormSubmission: {
        subject: 'Thank you for contacting us',
        template: 'contact-form-submission'
      },
      demoRequest: {
        subject: 'Demo request received',
        template: 'demo-request'
      }
    }
  }
  
  async sendEmail(templateName, recipientEmail, templateData) {
    try {
      const template = this.templates[templateName]
      if (!template) {
        throw new Error(`Template ${templateName} not found`)
      }
      
      const response = await apiClient.post('/emails/send', {
        to: recipientEmail,
        subject: template.subject,
        template: template.template,
        data: templateData
      })
      
      return {
        success: true,
        messageId: response.data.messageId
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to send email'
      }
    }
  }
  
  async sendWelcomeEmail(user) {
    return this.sendEmail('welcome', user.email, {
      firstName: user.firstName,
      organizationName: user.organizationName,
      loginUrl: `${window.location.origin}/login`
    })
  }
  
  async sendEmailVerification(user, verificationToken) {
    return this.sendEmail('emailVerification', user.email, {
      firstName: user.firstName,
      verificationUrl: `${window.location.origin}/verify-email?token=${verificationToken}`
    })
  }
  
  async sendPasswordReset(user, resetToken) {
    return this.sendEmail('passwordReset', user.email, {
      firstName: user.firstName,
      resetUrl: `${window.location.origin}/reset-password?token=${resetToken}`,
      expiryTime: '1 hour'
    })
  }
  
  async sendSubscriptionConfirmation(user, subscription) {
    return this.sendEmail('subscriptionConfirmation', user.email, {
      firstName: user.firstName,
      planName: subscription.plan.name,
      amount: subscription.plan.getFormattedPrice(subscription.billingPeriod),
      billingPeriod: subscription.billingPeriod,
      nextBillingDate: subscription.currentPeriodEnd.toLocaleDateString(),
      dashboardUrl: `${window.location.origin}/dashboard`
    })
  }
  
  async sendContactFormConfirmation(contactRequest) {
    return this.sendEmail('contactFormSubmission', contactRequest.email, {
      firstName: contactRequest.firstName,
      requestType: contactRequest.requestType,
      message: contactRequest.message,
      supportEmail: 'support@awibiehr.com'
    })
  }
  
  async sendDemoRequestConfirmation(demoRequest) {
    return this.sendEmail('demoRequest', demoRequest.email, {
      firstName: demoRequest.firstName,
      organizationName: demoRequest.organizationName,
      organizationType: demoRequest.organizationType,
      preferredTime: demoRequest.preferredTime,
      salesEmail: 'sales@awibiehr.com'
    })
  }
}

export const emailService = new EmailTemplateService()
```

### Newsletter Integration

```javascript
// Newsletter service
class NewsletterService {
  constructor() {
    this.apiKey = process.env.VITE_MAILCHIMP_API_KEY
    this.listId = process.env.VITE_MAILCHIMP_LIST_ID
  }
  
  async subscribe(email, firstName = '', lastName = '', tags = []) {
    try {
      const response = await apiClient.post('/newsletter/subscribe', {
        email,
        firstName,
        lastName,
        tags,
        source: 'landing_page'
      })
      
      return {
        success: true,
        data: response.data
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to subscribe to newsletter'
      }
    }
  }
  
  async unsubscribe(email) {
    try {
      const response = await apiClient.post('/newsletter/unsubscribe', { email })
      
      return {
        success: true,
        data: response.data
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to unsubscribe from newsletter'
      }
    }
  }
  
  async updatePreferences(email, preferences) {
    try {
      const response = await apiClient.put('/newsletter/preferences', {
        email,
        preferences
      })
      
      return {
        success: true,
        data: response.data
      }
    } catch (error) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to update preferences'
      }
    }
  }
}

// Newsletter subscription component
const NewsletterSubscription = ({ className = '' }) => {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  
  const newsletterService = new NewsletterService()
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validators.email(email)) {
      setError('Please enter a valid email address')
      return
    }
    
    setLoading(true)
    setError('')
    
    const result = await newsletterService.subscribe(email)
    
    if (result.success) {
      setSubscribed(true)
      setEmail('')
      
      // Track newsletter subscription
      trackEvent('newsletter_subscribed', {
        source: 'landing_page'
      })
    } else {
      setError(result.error)
    }
    
    setLoading(false)
  }
  
  if (subscribed) {
    return (
      <div className={`text-center ${className}`}>
        <div className="text-green-600 font-medium">
          ✓ Thank you for subscribing!
        </div>
        <p className="text-gray-600 text-sm mt-2">
          You'll receive updates about AWIBI EHR features and healthcare insights.
        </p>
      </div>
    )
  }
  
  return (
    <form onSubmit={handleSubmit} className={`${className}`}>
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email address"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Subscribing...' : 'Subscribe'}
        </button>
      </div>
      {error && (
        <p className="text-red-600 text-sm mt-2">{error}</p>
      )}
    </form>
  )
}
```

This comprehensive API integration guide provides everything needed to connect the AWIBI EHR Landing Page with backend services. It covers authentication, data management, payment processing, email services, and best practices for maintaining a robust and secure integration.

