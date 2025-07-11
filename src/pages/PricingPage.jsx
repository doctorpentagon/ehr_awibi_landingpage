import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

// Import assets
import icon9 from '../assets/icon9.png'
import icon10 from '../assets/icon10.png'

const PricingPage = () => {
  const [pricingPeriod, setPricingPeriod] = useState('monthly')
  const [pricingType, setPricingType] = useState('hospital')

  // Pricing data structure (same as HomePage)
  const pricingData = {
    monthly: {
      hospital: [
        {
          name: "Free Trial for one month",
          price: "N0/mo",
          features: ["10 staffs", "40 Patients", "5 Department", "100 appointments"],
          highlighted: false
        },
        {
          name: "Basic Package",
          price: "N78,500/mo",
          features: ["100 staffs", "300 Patients", "10 Department", "500 appointments"],
          highlighted: false
        },
        {
          name: "Standard Package",
          price: "N314,400/mo",
          features: ["200 staffs", "500 Patients", "20 Department", "1000 appointments"],
          highlighted: true
        },
        {
          name: "Premium Package",
          price: "N785,000/mo",
          features: ["1000 staffs", "5000 Patients", "50 Department", "10,000 appointments"],
          highlighted: false
        }
      ],
      laboratory: [
        {
          name: "Free Trial for one month",
          price: "N0/mo",
          features: ["5 staffs", "20 Patients", "2 Department", "50 tests"],
          highlighted: false
        },
        {
          name: "Basic Package",
          price: "N45,000/mo",
          features: ["20 staffs", "100 Patients", "5 Department", "200 tests"],
          highlighted: false
        },
        {
          name: "Standard Package",
          price: "N120,000/mo",
          features: ["50 staffs", "300 Patients", "10 Department", "500 tests"],
          highlighted: true
        },
        {
          name: "Premium Package",
          price: "N300,000/mo",
          features: ["200 staffs", "1000 Patients", "20 Department", "2000 tests"],
          highlighted: false
        }
      ],
      professional: [
        {
          name: "Free Trial for one month",
          price: "N0/mo",
          features: ["1 staff", "10 Patients", "1 Department", "20 appointments"],
          highlighted: false
        },
        {
          name: "Basic Package",
          price: "N15,000/mo",
          features: ["3 staffs", "50 Patients", "2 Department", "100 appointments"],
          highlighted: false
        },
        {
          name: "Standard Package",
          price: "N35,000/mo",
          features: ["5 staffs", "100 Patients", "3 Department", "200 appointments"],
          highlighted: true
        },
        {
          name: "Premium Package",
          price: "N75,000/mo",
          features: ["10 staffs", "300 Patients", "5 Department", "500 appointments"],
          highlighted: false
        }
      ]
    },
    yearly: {
      hospital: [
        {
          name: "Free Trial for one month",
          price: "N0/mo",
          features: ["10 staffs", "40 Patients", "5 Department", "100 appointments"],
          highlighted: false
        },
        {
          name: "Basic Package",
          price: "N785,000/yr",
          features: ["100 staffs", "300 Patients", "10 Department", "500 appointments"],
          highlighted: false
        },
        {
          name: "Standard Package",
          price: "N3,144,000/yr",
          features: ["200 staffs", "500 Patients", "20 Department", "1000 appointments"],
          highlighted: true
        },
        {
          name: "Premium Package",
          price: "N7,850,000/yr",
          features: ["1000 staffs", "5000 Patients", "50 Department", "10,000 appointments"],
          highlighted: false
        }
      ],
      laboratory: [
        {
          name: "Free Trial for one month",
          price: "N0/mo",
          features: ["5 staffs", "20 Patients", "2 Department", "50 tests"],
          highlighted: false
        },
        {
          name: "Basic Package",
          price: "N450,000/yr",
          features: ["20 staffs", "100 Patients", "5 Department", "200 tests"],
          highlighted: false
        },
        {
          name: "Standard Package",
          price: "N1,200,000/yr",
          features: ["50 staffs", "300 Patients", "10 Department", "500 tests"],
          highlighted: true
        },
        {
          name: "Premium Package",
          price: "N3,000,000/yr",
          features: ["200 staffs", "1000 Patients", "20 Department", "2000 tests"],
          highlighted: false
        }
      ],
      professional: [
        {
          name: "Free Trial for one month",
          price: "N0/mo",
          features: ["1 staff", "10 Patients", "1 Department", "20 appointments"],
          highlighted: false
        },
        {
          name: "Basic Package",
          price: "N150,000/yr",
          features: ["3 staffs", "50 Patients", "2 Department", "100 appointments"],
          highlighted: false
        },
        {
          name: "Standard Package",
          price: "N350,000/yr",
          features: ["5 staffs", "100 Patients", "3 Department", "200 appointments"],
          highlighted: true
        },
        {
          name: "Premium Package",
          price: "N750,000/yr",
          features: ["10 staffs", "300 Patients", "5 Department", "500 appointments"],
          highlighted: false
        }
      ]
    }
  }

  return (
    <div className="min-h-screen bg-white py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
            Pricing and Plans
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            No Pressure Pricing For Every Provider
          </p>
          <p className="text-lg text-gray-600 max-w-4xl mx-auto mb-12">
            We give you full access to essential features at zero cost. When you're ready, 
            choose a plan that fits your team — no lock-ins, no surprises.
          </p>

          {/* Pricing Controls */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            {/* Monthly/Yearly Toggle */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  pricingPeriod === 'monthly'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setPricingPeriod('monthly')}
              >
                Monthly
              </button>
              <button
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  pricingPeriod === 'yearly'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setPricingPeriod('yearly')}
              >
                Yearly
              </button>
            </div>

            {/* Type Toggle */}
            <div className="flex items-center bg-gray-100 rounded-lg p-1">
              <button
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  pricingType === 'hospital'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setPricingType('hospital')}
              >
                Hospital
              </button>
              <button
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  pricingType === 'laboratory'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setPricingType('laboratory')}
              >
                Laboratory
              </button>
              <button
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  pricingType === 'professional'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
                onClick={() => setPricingType('professional')}
              >
                Professional
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricingData[pricingPeriod][pricingType].map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-xl border-2 p-8 ${
                plan.highlighted
                  ? 'border-blue-500 shadow-xl scale-105'
                  : 'border-gray-200 shadow-lg'
              }`}
            >
              {plan.highlighted && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{plan.name}</h3>
                <div className="text-3xl font-bold text-gray-900 mb-6">{plan.price}</div>
                
                <div className="text-left mb-8">
                  <p className="text-sm font-medium text-gray-900 mb-4">What's included</p>
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm text-gray-600">
                        <img src={icon9} alt="" className="w-4 h-4 mr-3" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                
                <Button 
                  className={`w-full py-3 rounded-lg font-medium flex items-center justify-center gap-2 ${
                    plan.highlighted
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                  }`}
                  asChild
                >
                  <Link to="/checkout" state={{ plan, period: pricingPeriod, type: pricingType }}>
                    Get Started
                    <img src={icon10} alt="" className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default PricingPage

