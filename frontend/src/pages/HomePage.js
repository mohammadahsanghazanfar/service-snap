import React, { useEffect } from 'react'
import Navbar from '../components/Navbar'
import { useLocation } from 'react-router-dom';
import Services from '../components/Services'
import Footer from '../components/Footer'
import WhyUs from '../components/WhyUs'
import Plumb from '../images/Plumb.webp';
import Elect from '../images/Elect.webp';
import HomeIcon from '../images/HomeIcon.png';
import Sofa1 from '../images/Sofa1.webp';
import { useDispatch } from 'react-redux';
import { userActions } from '../store';

function HomePage() {
  
  const location = useLocation();
  const dispatch=useDispatch(); 
     
  const getEmailFromURL = () => {
    const params = new URLSearchParams(location.search);
    return params.get('email');
  };

   useEffect(()=>{
      const email=getEmailFromURL();

      console.log(email)

      if(email){
        
           const fetchData= async ()=>{
                  
            try {

              const response=await fetch(`http://localhost:5001/api/users/${encodeURIComponent(email)}`)
              if (response.ok) {
                          const data = await response.json();
                          console.log('Fetched data:', data); // Check the fetched data
                          if (data) {
              
                            dispatch(userActions.setUser(data.user));
                            console.log(data.user)
                            dispatch(userActions.setIsAuthenticated(true));
                            
                          }}
               
            }
            catch(error){
              console.log(error)
            }

           }
         
           fetchData()

      }
      
   },[])

  return (
    <div>
      <Navbar/>
      <WhyUs Icon={Sofa1} Icon2={Elect} Icon3={Plumb}/>
      <Services />
       {/* Testimonials Section */}
       <section className="py-12 bg-gray-200">
        <h2 className="text-2xl font-bold text-center mb-8">Testimonials</h2>
        <div className="max-w-2xl mx-auto text-center text-gray-600">
          <p className="italic">
            "Aristotle maintained the sharp distinction between science and the practical knowledge of artisans..."
          </p>
          <p className="mt-4 font-semibold">John Doe, New Delhi</p>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="py-12 bg-blue-600 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">LOOKING TO BE A PART OF HOMIFY?</h2>
        <button className="px-6 py-3 bg-white text-blue-600 rounded-full font-bold">JOIN US</button>
      </section>
      <Footer/>
    </div>
    
  )
}

export default HomePage
