// PlumberServ.js
import React, { useEffect, useState } from 'react';
import PlumberServComp from './PlumberServComp'; // Assuming this is another component that will display each service

function PlumberServ() {
  const [servicesArr, setServicesArr] = useState([]);

  const requestService = async () => {
    const response = await fetch('http://localhost:5001/api/getService', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        field: 'Plumber', // Here, 'Plumber' is the field you want to fetch services for
      }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Fetched services:', data.services); // Debugging to see the services array
      setServicesArr(data.services); // Update the services array in state
    } else {
      console.error('Failed to fetch services');
    }
  };

  useEffect(() => {
    requestService(); // Fetch services on component mount
  }, []);

  return (
    <div>
      <div className='font-bold mt-[3%] text-2xl text-center'>Plumbing Services</div>
      <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-4 p-[5%]'>
        {servicesArr.map((service, index) => (
          <PlumberServComp key={index} service={service} />
        ))}
      </div>
    </div>
  );
}

export default PlumberServ;
