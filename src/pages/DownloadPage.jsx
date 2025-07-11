import icon14 from '../assets/icon14.png'
import icon15 from '../assets/icon15.png'

const DownloadPage = () => {
  return (
    <div className="min-h-screen bg-white py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6">
          Download app
        </h1>
        
        <h2 className="text-2xl lg:text-3xl font-semibold text-gray-800 mb-8">
          Download Awibi EHR and Simplify Patient Care
        </h2>
        
        <p className="text-lg text-gray-600 mb-12 max-w-3xl mx-auto">
          Smart, secure, and optimized for doctors, nurses, and hospital admins. 
          Start managing health records with confidence — anytime, anywhere.
        </p>

        {/* Download Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
          <a
            href="#"
            className="inline-flex items-center justify-center bg-black text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition-colors duration-200 shadow-lg"
          >
            <img src={icon14} alt="Download on App Store" className="h-12 w-auto" />
          </a>
          
          <a
            href="#"
            className="inline-flex items-center justify-center bg-black text-white px-8 py-4 rounded-xl hover:bg-gray-800 transition-colors duration-200 shadow-lg"
          >
            <img src={icon15} alt="Get it on Google Play" className="h-12 w-auto" />
          </a>
        </div>

        {/* Additional Information */}
        <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-xl">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Why Download AWIBI EHR Mobile App?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">📱 Mobile Optimized</h4>
              <p className="text-gray-600 text-sm">
                Access patient records and manage appointments on the go with our mobile-first design.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">🔒 Secure & Private</h4>
              <p className="text-gray-600 text-sm">
                Bank-level encryption ensures your patient data remains safe and compliant.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">⚡ Offline Ready</h4>
              <p className="text-gray-600 text-sm">
                Continue working even without internet connection. Data syncs when you're back online.
              </p>
            </div>
          </div>
        </div>

        {/* System Requirements */}
        <div className="mt-12 text-left max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Requirements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">iOS Requirements</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• iOS 12.0 or later</li>
                <li>• iPhone, iPad, and iPod touch</li>
                <li>• 50MB available storage</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-medium text-gray-900 mb-2">Android Requirements</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Android 6.0 (API level 23) or higher</li>
                <li>• 50MB available storage</li>
                <li>• Internet connection required</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DownloadPage

