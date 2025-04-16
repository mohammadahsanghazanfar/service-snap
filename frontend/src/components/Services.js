import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css'; // Import AOS styles
import AC from '../images/AC.png';
import Plumber from '../images/Plumber.png';
import Electrician from '../images/Electrician.png';
import Carpenter from '../images/Carpenter.png';
import Pest from '../images/Pest.png';
import App from '../images/App.png';
import Painter from '../images/Painter.png';
import { Link } from 'react-router-dom';

function Services() {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // Initialize AOS with duration of animation
  }, []);

  return (
    <div>
      <h3 className="text-center font-bold text-2xl mt-2" data-aos="fade-up">
        Our Services
      </h3>

      <div
        className="p-8 mt-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-gray-500 sm:w-[90%] bg-white sm:ml-[5%]"
      >
        <div data-aos="fade-up " className='sm:border sm:p-6 sm:rounded'>
          <img src={AC} className="h-40 w-auto mx-auto rounded" />
         <p className="text-center mt-3"><Link to='/ac-repair'>AC Repair</Link> </p>
        </div>

        <div data-aos="fade-up" data-aos-delay="100" className='sm:border sm:p-6 sm:rounded'>
          <img src={Plumber} className="w-auto h-40 mx-auto rounded" />
          <p className="text-center mt-3"><Link to='/plumber-services'>Plumber</Link></p>
        </div>

        <div data-aos="fade-up" data-aos-delay="200" className='sm:border sm:p-6 sm:rounded'>
          <img src={Electrician} className="h-40 w-auto mx-auto rounded" />
          <p className="text-center mt-3"> <Link to='/electrician-services'>Electrician</Link></p>
        </div>

        <div data-aos="fade-up" data-aos-delay="300" className='sm:border sm:p-6 sm:rounded'>
          <img src={Carpenter} className="h-40 w-auto mx-auto rounded" />
          <p className="text-center mt-3">Carpenter</p>
        </div>

        <div data-aos="fade-up" data-aos-delay="400" className='sm:border sm:p-6 sm:rounded'>
          <img src={Pest} className="h-40 w-auto mx-auto rounded" />
          <p className="text-center mt-3">Pest Control</p>
        </div>

        <div data-aos="fade-up" data-aos-delay="500" className='sm:border sm:p-6 sm:rounded'>
          <img src={App} className="h-40 w-auto mx-auto rounded" />
          <p className="text-center mt-3">Appliances</p>
        </div>

        <div data-aos="fade-up" data-aos-delay="600" className='sm:border sm:p-6 sm:rounded'>
          <img src={Painter} className="h-40 w-auto mx-auto rounded" />
          <p className="text-center mt-3">Painter</p>
        </div>
      </div>
    </div>
  );
}

export default Services;
