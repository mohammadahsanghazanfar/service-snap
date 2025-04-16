import React from 'react'
import { useEffect } from 'react'
import ElectricianServ from '../components/ElectricianServ'
import Navbar from '../components/Navbar'
import Services from '../components/Services'
import Footer from '../components/Footer'
import Elect  from '../images/Elect.webp';
import Elect1  from '../images/Elect1.webp';
import Elect3  from '../images/Elect3.webp';
import PlumberServ from '../components/PlumberServ'

import WhyUs from '../components/WhyUs'

function PlumberPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
        <Navbar/>
        <WhyUs Icon={Elect1} Icon2={Elect} Icon3={Elect3}/> 
        <PlumberServ/>
        <Footer/>
      
    </div>
  )
}

export default PlumberPage
