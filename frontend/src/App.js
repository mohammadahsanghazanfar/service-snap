import React, { useState, useEffect } from 'react';

import { useDispatch } from "react-redux";
import { userActions } from "./store";



import {
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";

import HomePage from './pages/HomePage';
import ElectricianPage from './pages/ElectricianPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import VerficationEmailPage from './pages/VerficationEmailPage';
import SignUpDelPage from './pages/SignUpDelPage';
import PlumberPage from './pages/PlumberPage';
import AcPage from './pages/AcPage';
import WorkerPage from './pages/WorkerPage';
import Pending from './components/Pending';
import PendingPage from './pages/PendingPage';
import AdminPage from './pages/AdminPage';
import UsersPage from './pages/UsersPage';
import AddServicesPage from './pages/AddServicesPage';




function App() {
  // console.log("App component rendered");
  // const theme = useSelector(state => state.userData.theme);
  // const isAdmin=localStorage.getItem('adminLogin')
  // const userEmail = localStorage.getItem('userEmail');
  // const dispatch=useDispatch()
  
  // const backgroundStyle = theme === 'dark'
  //   ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('https://www.royalroadcdn.com/public/blog/a-price-update-AACA_vNKbxU.jpg?time=1719852695')`
  //   : `url('https://www.royalroadcdn.com/public/blog/a-price-update-AACA_vNKbxU.jpg?time=1719852695')`;

  //   const fetchData = async () => {
  //     const email = localStorage.getItem('userEmail');
  //     console.log('Fetching with email:', email);
    
  //     try {
  //       const response = await fetch('http://localhost:5001/api/token', {
  //         method: 'POST',
  //         headers: { 'Content-Type': 'application/json' },
  //         body: JSON.stringify({
  //           email:email,
  //         }),
  //       });
    
  //       console.log('Response:', response);
    
  //       if (!response.ok) {
  //         throw new Error('Network response was not ok');
  //       }
    
  //       const data = await response.json();
  //       console.log('Data:', data);
  //       console.log(data.user)
  //       dispatch(userActions.setEmail(data.user.email));
  //       dispatch(userActions.setUser(data.user));
       
  //     } catch (error) {
  //       console.error('Error logging in', error);
  //     }
  //   };
  //   useEffect(()=>{
  //      const userEmail = localStorage.getItem("userEmail");
  //      console.log(isAdmin)
  //      if(userEmail){
  //       fetchData()
  //      }
       
      
  //   })  

  return (
    <div
      // style={{
      //   backgroundImage: backgroundStyle,
      //   backgroundSize: 'cover',
      //   backgroundRepeat:'no-repeat',
      //   backgroundPosition: 'center',
      //   minHeight: '100vh', // Ensures the background covers the full viewport height
      // }}
    >
      <BrowserRouter>


      <Routes>
          
          <Route path="/" element={<HomePage />} />
  
          </Routes> 
          

      <Routes>
          
          <Route path="/electrician-services" element={<ElectricianPage />} />
  
          </Routes> 

          <Routes>
          
          <Route path="/login" element={<LoginPage />} />
  
          </Routes> 
          <Routes>
          
          <Route path="/sign-up" element={<SignUpPage />} />
  
          </Routes> 

          <Routes>
          
          <Route path="/verify-email" element={<VerficationEmailPage />} />
  
          </Routes>
          
          <Routes>
          
          <Route path="/signup-detail" element={<SignUpDelPage />} />
  
          </Routes>
         
          <Routes>
          
          <Route path="/plumber-services" element={<PlumberPage/>} />
  
          </Routes>

          <Routes>
          
          <Route path="/ac-repair" element={<AcPage/>} />
  
          </Routes>
          <Routes>
          
          <Route path="/worker-page" element={<WorkerPage/>} />
  
          </Routes>
          <Routes>
          
          <Route path="/pen" element={<PendingPage/>} />
  
          </Routes>
          <Routes>
        <Route path="/admin-dashboard" element={<AdminPage />}>
          <Route path="users" element={<UsersPage />} />
          <Route path="add-services" element={<AddServicesPage/>} />
          {/* Add more nested routes here like services, complaints, etc. */}
        </Route>
      </Routes>
        
      
      
      
     
          
      
       



        {/* // ---------------------------------------------------------------------------SABHEEE Routes ends----------------------------------------------------- */}



      </BrowserRouter>
    </div>
  );
}

export default App;
