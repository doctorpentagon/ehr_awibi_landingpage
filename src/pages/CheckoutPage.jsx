import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { CreditCard, Building2, Gift } from 'lucide-react'

const CheckoutPage = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [showCoupon, setShowCoupon] = useState(false)
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    saveCard: false,
    couponCode: ''
  })

  // Get plan data from navigation state
  const planData = location.state
  
  useEffect(() => {
    if (!planData) {
      navigate('/pricing')
    }
  }, [planData, navigate])

  if (!planData) {
    return null
  }

  const { plan, period, type } = planData

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const formatCardNumber = (value) => {
    // Remove all non-digit characters
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    // Add spaces every 4 digits
    const matches = v.match(/\d{4,16}/g)
    const match = matches && matches[0] || ''
    const parts = []
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }
    if (parts.length) {
      return parts.join(' ')
    } else {
      return v
    }
  }

  const formatExpiryDate = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '')
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4)
    }
    return v
  }

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value)
    setFormData(prev => ({ ...prev, cardNumber: formatted }))
  }

  const handleExpiryChange = (e) => {
    const formatted = formatExpiryDate(e.target.value)
    setFormData(prev => ({ ...prev, expiryDate: formatted }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (plan.price === 'N0/mo') {
      // Free trial - no payment required
      alert('Free trial activated! You can now access AWIBI EHR with your trial limits.')
      navigate('/')
    } else {
      // Paid plan - process payment
      alert(`Payment processing for ${plan.name}. In a real implementation, this would integrate with payment providers.`)
      navigate('/')
    }
  }

  const handleStripePayment = () => {
    alert('Stripe payment integration would be implemented here.')
  }

  const handleRemitaPayment = () => {
    alert('Remita payment integration would be implemented here.')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600">
            <h1 className="text-2xl font-bold text-white">
              Payment for {plan.name}
            </h1>
            <p className="text-blue-100 mt-2">
              {type.charAt(0).toUpperCase() + type.slice(1)} • {period.charAt(0).toUpperCase() + period.slice(1)}
            </p>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Payment Form */}
              <div className="lg:col-span-2">
                {/* Payment Method Selection */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Pay With:</h3>
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-colors ${
                        paymentMethod === 'card'
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      <CreditCard className="w-4 h-4" />
                      Card
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('transfer')}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-colors ${
                        paymentMethod === 'transfer'
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-300 text-gray-700 hover:border-gray-400'
                      }`}
                    >
                      <Building2 className="w-4 h-4" />
                      Transfer
                    </button>
                  </div>
                </div>

                {/* Payment Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  {paymentMethod === 'card' && (
                    <>
                      <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700 mb-2">
                          Card Number
                        </label>
                        <input
                          type="text"
                          id="cardNumber"
                          name="cardNumber"
                          value={formData.cardNumber}
                          onChange={handleCardNumberChange}
                          placeholder="1234 5678 9101 1121"
                          maxLength="19"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          required={plan.price !== 'N0/mo'}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700 mb-2">
                            Expiration Date
                          </label>
                          <input
                            type="text"
                            id="expiryDate"
                            name="expiryDate"
                            value={formData.expiryDate}
                            onChange={handleExpiryChange}
                            placeholder="MM/YY"
                            maxLength="5"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required={plan.price !== 'N0/mo'}
                          />
                        </div>
                        <div>
                          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700 mb-2">
                            CVV
                          </label>
                          <input
                            type="text"
                            id="cvv"
                            name="cvv"
                            value={formData.cvv}
                            onChange={handleInputChange}
                            placeholder="123"
                            maxLength="4"
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            required={plan.price !== 'N0/mo'}
                          />
                        </div>
                      </div>

                      <div className="flex items-center">
                        <input
                          type="checkbox"
                          id="saveCard"
                          name="saveCard"
                          checked={formData.saveCard}
                          onChange={handleInputChange}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label htmlFor="saveCard" className="ml-2 text-sm text-gray-700">
                          Save card details
                        </label>
                      </div>
                    </>
                  )}

                  {paymentMethod === 'transfer' && (
                    <div className="bg-gray-50 p-6 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-4">Bank Transfer Details</h4>
                      <div className="space-y-2 text-sm text-gray-600">
                        <p><strong>Bank:</strong> First Bank of Nigeria</p>
                        <p><strong>Account Name:</strong> AWIBI HEALTH TECHNOLOGIES</p>
                        <p><strong>Account Number:</strong> 2034567890</p>
                        <p><strong>Amount:</strong> {plan.price}</p>
                      </div>
                      <p className="text-sm text-blue-600 mt-4">
                        Please use your email address as the transfer reference and send proof of payment to awibihealth@gmail.com
                      </p>
                    </div>
                  )}

                  {/* Coupon Code */}
                  <div>
                    <button
                      type="button"
                      onClick={() => setShowCoupon(!showCoupon)}
                      className="flex items-center gap-2 text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      <Gift className="w-4 h-4" />
                      Have a coupon code?
                    </button>
                    {showCoupon && (
                      <div className="mt-3">
                        <input
                          type="text"
                          name="couponCode"
                          value={formData.couponCode}
                          onChange={handleInputChange}
                          placeholder="Enter coupon code"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    )}
                  </div>

                  {/* Payment Buttons */}
                  <div className="space-y-4">
                    {plan.price !== 'N0/mo' && (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <Button
                          type="button"
                          onClick={handleStripePayment}
                          className="bg-purple-600 hover:bg-purple-700 text-white py-3"
                        >
                          Pay with Stripe
                        </Button>
                        <Button
                          type="button"
                          onClick={handleRemitaPayment}
                          className="bg-green-600 hover:bg-green-700 text-white py-3"
                        >
                          Pay with Remita
                        </Button>
                      </div>
                    )}
                    
                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 text-lg font-medium"
                    >
                      {plan.price === 'N0/mo' ? 'Start Free Trial' : 'Proceed to Pay'}
                    </Button>
                  </div>
                </form>

                {/* Privacy Notice */}
                <p className="text-xs text-gray-500 mt-6">
                  Your personal data will be used to process your order, support your experience 
                  throughout this website, and for other purposes described in our privacy policy.
                </p>

                {/* Payment Issues */}
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <strong>Having payment issues?</strong> Reach out to us at{' '}
                    <a href="mailto:awibihealth@gmail.com" className="text-yellow-900 underline">
                      awibihealth@gmail.com
                    </a>{' '}
                    or call{' '}
                    <a href="tel:+2348078905396" className="text-yellow-900 underline">
                      +2348078905396
                    </a>
                  </p>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 p-6 rounded-lg sticky top-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Plan</span>
                      <span className="font-medium">{plan.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Type</span>
                      <span className="font-medium capitalize">{type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Billing</span>
                      <span className="font-medium capitalize">{period}</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between">
                        <span className="font-semibold">Total</span>
                        <span className="font-bold text-lg">{plan.price}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2 text-sm text-gray-600">
                    <h4 className="font-medium text-gray-900">What's included:</h4>
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-center">
                        <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage

