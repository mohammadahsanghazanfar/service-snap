import React from 'react'
import { useEffect } from 'react'
import WorkerModule from '../components/WorkerModule'
import Navbar from '../components/Navbar'

import Footer from '../components/Footer'


import WhyUs from '../components/WhyUs'

function WorkerPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div>
        <Navbar/>
        <WorkerModule/>
        <Footer/>
      
    </div>
  )
}

export default WorkerPage