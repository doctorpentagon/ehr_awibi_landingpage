import { Link } from 'react-router-dom'
import logoWhite from '../assets/logowhite.png'
import linkedInLogo from '../assets/linkedInlogo.png'
import twitterLogo from '../assets/twitterlogo.png'

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Column 1 - Logo and Description */}
          <div className="lg:col-span-1">
            <img 
              src={logoWhite} 
              alt="AWIBI EHR" 
              className="h-8 w-auto mb-4"
            />
            <p className="text-gray-300 text-sm leading-relaxed">
              At awibi, we believe africa deserves good and standard healthcare. 
              let us be your partner in healthcare innovation!
            </p>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  to="/#about" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  About us
                </Link>
              </li>
              <li>
                <Link 
                  to="/#features" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link 
                  to="/pricing" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  Pricing & Plans
                </Link>
              </li>
              <li>
                <a 
                  href="#" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  Privacy & Terms
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 - Socials */}
          <div>
            <h3 className="text-white font-semibold mb-4">Socials</h3>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="hover:opacity-80 transition-opacity duration-200"
                aria-label="LinkedIn"
              >
                <img 
                  src={linkedInLogo} 
                  alt="LinkedIn" 
                  className="h-6 w-6"
                />
              </a>
              <a 
                href="#" 
                className="hover:opacity-80 transition-opacity duration-200"
                aria-label="Twitter"
              >
                <img 
                  src={twitterLogo} 
                  alt="Twitter" 
                  className="h-6 w-6"
                />
              </a>
            </div>
          </div>

          {/* Column 4 - Help */}
          <div>
            <h3 className="text-white font-semibold mb-4">Help</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/contact" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  Contact us
                </Link>
              </li>
              <li>
                <a 
                  href="mailto:awibihealth@gmail.com" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  awibihealth@gmail.com
                </a>
              </li>
              <li>
                <a 
                  href="tel:+2348078905396" 
                  className="text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                >
                  +2348078905396
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom border */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <p className="text-gray-400 text-sm text-center">
            © 2024 AWIBI EHR. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer

