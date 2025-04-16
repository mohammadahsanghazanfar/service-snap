import React from 'react'
import { useEffect } from 'react'
import ElectricianServ from '../components/ElectricianServ'
import Navbar from '../components/Navbar'
import Services from '../components/Services'
import Footer from '../components/Footer'
import Pending from '../components/Pending'


import WhyUs from '../components/WhyUs'

function PendingPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
        <Navbar/>
        
       <Pending/>
        <Footer/>
      
    </div>
  )
}

export default PendingPage
