import React from 'react'

function Footer() {
  return (
    <div>
         <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4">
          <div>
            <h3 className="font-bold mb-4">HOMIFY</h3>
            <p>©2020 Homify Online Consumer Services Pvt. Ltd.</p>
            <address className="mt-4">
              Call: 9811224460 <br/>
              Email: contactus@homify.com
            </address>
          </div>
          <div>
            <h3 className="font-bold mb-4">SERVICES</h3>
            <ul>
              {['Plumber in Bangalore', 'Electrician in Bangalore', 'Carpenter in Bangalore', 'AC Repair in Bangalore', 'Pest Control in Bangalore', 'Painter in Bangalore'].map(service => (
                <li key={service} className="text-gray-400 hover:text-white">{service}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">HOMIFY HOME MAINTENANCE PACKAGES</h3>
            <ul>
             
            </ul>
          </div>
          <div>
            <h3 className="font-bold mb-4">CUSTOMER SERVICE</h3>
            <ul>
              <li className="text-gray-400 hover:text-white">Customer Care: 9811224460</li>
              <li className="text-gray-400 hover:text-white">FAQ</li>
              <li className="text-gray-400 hover:text-white">Feedback</li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-8 text-gray-500">
          <p>Download our app</p>
          <div className="flex justify-center gap-4 mt-4">
            <img src="/images/google_play.png" alt="Google Play" className="w-32"/>
            <img src="/images/app_store.png" alt="App Store" className="w-32"/>
          </div>
        </div>
      </footer>
      
    </div>
  )
}

export default Footer
