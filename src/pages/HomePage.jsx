import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'

// Import assets
import image1 from '../assets/image1.png'
import icon1 from '../assets/icon1.png'
import icon2 from '../assets/icon2.png'
import icon3 from '../assets/icon3.png'
import icon4 from '../assets/icon4.png'
import icon5 from '../assets/icon5.png'
import icon6 from '../assets/icon6.png'
import icon7 from '../assets/icon7.png'
import icon8 from '../assets/icon8.png'
import icon9 from '../assets/icon9.png'
import icon10 from '../assets/icon10.png'
import icon11 from '../assets/icon11.png'

const HomePage = () => {
  const [pricingPeriod, setPricingPeriod] = useState('monthly')
  const [pricingType, setPricingType] = useState('hospital')
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [openFaq, setOpenFaq] = useState(1) // Second FAQ is open by default

  // Pricing data structure
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

  // Testimonials data
  const testimonials = [
    {
      quote: "Awibi saved our hospital hours every week! Managing patients, staff, and records has never been this smooth.",
      author: "Dr. Kemi Adebayo",
      title: "Chief Medical Director, Lagos"
    },
    {
      quote: "Awibi EHR helped us integrate our lab with the hospital seamlessly. We now deliver results in minutes instead of hours.",
      author: "Mrs. Jumoke Fashola",
      title: "Radiology Manager, Ibadan"
    },
    {
      quote: "As a solo doctor, having all my patient records and consultation tools in one place has been a game-changer.",
      author: "Dr. Florence Edet",
      title: "Family Physician, Calabar"
    },
    {
      quote: "I was worried about switching from paper, but Awibi is so simple even our older staff picked it up quickly.",
      author: "Mr. Ayo Okonkwo",
      title: "Lab Technician, Enugu"
    }
  ]

  // FAQ data
  const faqs = [
    {
      question: "Is patient data safe and secure on Awibi?",
      answer: "Yes, we use industry-standard encryption and security measures to protect all patient data. Our platform is HIPAA compliant and follows international healthcare data protection standards."
    },
    {
      question: "Do I need technical experience to use Awibi EHR?",
      answer: "Not at all. Awibi is designed for everyday health professionals — with simple forms, guided flows, and support for uploads and voice input. If you can use WhatsApp, you can use Awibi."
    },
    {
      question: "Can I access the platform on mobile devices?",
      answer: "Yes, Awibi EHR is fully responsive and works seamlessly on all devices including smartphones, tablets, and desktop computers."
    },
    {
      question: "Does Awibi work offline or in low-network areas?",
      answer: "Awibi has offline capabilities for essential functions and automatically syncs when connection is restored, making it perfect for areas with unreliable internet."
    }
  ]

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Simplify HealthCare Records.{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Empower Medical Teams
              </span>
            </h1>
            <p className="text-xl lg:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
              All-in-one EHR system to manage patient data, Appointments, Prescriptions, and Billing
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg rounded-lg"
                asChild
              >
                <Link to="/pricing">Get started for free</Link>
              </Button>
              <Button 
                variant="outline" 
                className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 text-lg rounded-lg flex items-center gap-2"
              >
                <img src={icon1} alt="" className="w-5 h-5" />
                Schedule a Demo
              </Button>
            </div>
            <div className="flex justify-center">
              <img 
                src={image1} 
                alt="AWIBI EHR Dashboard" 
                className="max-w-full h-auto rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Who is it for Section */}
      <section id="about" className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
              Who is it for?
            </h2>
            <p className="text-xl text-gray-600 mb-4">
              Built for Every Level of Healthcare
            </p>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              Whether you manage a hospital, run a diagnostic lab, or consult as a healthcare professional — 
              Awibi EHR is built to fit your workflow and simplify your records.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <img src={icon2} alt="" className="w-16 h-16 mb-6" />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Hospitals & Clinics</h3>
              <p className="text-gray-600">
                Manage inpatient and outpatient care with seamless coordination between your doctors, 
                nurses, labs, and finance officers.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <img src={icon3} alt="" className="w-16 h-16 mb-6" />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Individual Health Professionals</h3>
              <p className="text-gray-600">
                Whether you run a private practice or freelance across clinics, Awibi lets you record 
                consultations, access past history, and generate PDF reports anytime, anywhere.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
              <img src={icon4} alt="" className="w-16 h-16 mb-6" />
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Labs & Imaging Centers</h3>
              <p className="text-gray-600">
                Enter and share lab results directly with hospitals and patients. Each center gets a 
                unique dashboard and tracking system.
              </p>
            </div>
          </div>

          <div className="text-center">
            <Button 
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg rounded-lg"
              asChild
            >
              <Link to="/pricing">Choose Your Role & Get Started</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column */}
            <div>
              <h2 className="text-sm font-semibold text-blue-600 mb-4 uppercase tracking-wide">Features</h2>
              <h3 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
                Powerful Features.{' '}
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Built for Everyday Care.
                </span>
              </h3>
              <p className="text-lg text-gray-600 mb-8">
                From your first patient entry to lab results and secure reports, Awibi EHR delivers 
                the essential tools you need — all in one place, easy to use, and ready to scale with you.
              </p>
              <Button 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 text-lg rounded-lg"
                asChild
              >
                <Link to="/pricing">Try AWIBI EHR for free</Link>
              </Button>
            </div>

            {/* Right Column - Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <img src={icon5} alt="" className="w-12 h-12 mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Patient Management</h4>
                <p className="text-gray-600">Track, update, and access patient records anytime.</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <img src={icon6} alt="" className="w-12 h-12 mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Smart Consultation</h4>
                <p className="text-gray-600">Type, upload, or speak — whichever works for you.</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <img src={icon7} alt="" className="w-12 h-12 mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Lab & Test Integration</h4>
                <p className="text-gray-600">Seamless upload and sharing of diagnostic results.</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100">
                <img src={icon8} alt="" className="w-12 h-12 mb-4" />
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Secure Health Reports</h4>
                <p className="text-gray-600">One-click export and safe sharing with other providers.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-16 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
              Pricing and Plans
            </h2>
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
      </section>

      {/* Testimonials Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
              Testimonials
            </h2>
            <p className="text-xl text-gray-600 mb-4">
              Trusted by Medical Professionals
            </p>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              From busy hospitals to private practices, Awibi EHR is helping healthcare teams 
              work faster, smarter, and more securely every day.
            </p>
          </div>

          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className={`bg-white p-6 rounded-xl shadow-lg border border-gray-100 transition-all duration-300 ${
                    index === currentTestimonial ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <blockquote className="text-gray-600 mb-4">
                    "{testimonial.quote}"
                  </blockquote>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.author}</div>
                    <div className="text-sm text-gray-500">{testimonial.title}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Navigation Arrows */}
            <div className="flex justify-center mt-8 gap-4">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-white shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-white shadow-lg border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600">
              Got questions? We've answered the most common things our users ask — 
              so you can start with confidence.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden"
              >
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => setOpenFaq(openFaq === index ? -1 : index)}
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  <div className={`p-2 rounded-full transition-colors ${
                    openFaq === index ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gray-100'
                  }`}>
                    <img 
                      src={icon11} 
                      alt="" 
                      className={`w-4 h-4 transition-transform ${
                        openFaq === index ? 'rotate-180' : ''
                      }`} 
                    />
                  </div>
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-4">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage

