import React,{useEffect ,useState} from 'react'
import Fan2 from '../images/Fan2.jpg';
import Motor from '../images/Motor.jpg';
import LED from '../images/LED.jpg';
import ElecServComp from './ElecServComp';
import Gen from '../images/gen.jpg'
import { useSelector } from 'react-redux';





function ElectricianServ() {

//   let servicesArr = [{
//       name: "Ceiling Fan Installation",
//       des: 'One Item',
//       price: 500,
//       img: Fan2, // Assuming Fan1 is the path to your image
//       rating: 3.8
//   },
//   {
//   name: "LED (Installation)",
//   des: 'One Item',
//   price:1000,
//   img: LED , // Assuming Fan1 is the path to your image
//   rating: 4.8
// },
// {
//   name: "Water Motor Installation",
//   des: 'One Item',
//   img: Motor, 
//   price:1000,// Assuming Fan1 is the path to your image
//   rating: 1.8
// },
// {
//     name: "Generator (Installation)",
//     des: 'One Item',
//     img: Gen, // Assuming Fan1 is the path to your image
//     rating: 1.8,
//     price:1000,
//   },
//   {
//     name: "Generator (Installation)",
//     des: 'One Item',
//     img: Gen, // Assuming Fan1 is the path to your image
//     rating: 1.8,
//     price:1000,
//   }
// ];

 const [servicesArr,setServicesArr]=useState([])

const user=useSelector(state => state.userData.user);
const requestService = async () => {
    const response = await fetch('http://localhost:5001/api/getService', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        field: 'Electrician'//s the field you want to fetch services for
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
    requestService();
    
    console.log(user)
  }, []);


  return (
      <div>
          <div className='font-bold mt-[3%] text-2xl text-center'>Electrician Services</div>

          <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4  gap-4 p-[5%] '>
              {servicesArr.map((service, index) => (
                <ElecServComp service={service} index={index}/>
              ))}
          </div>
      </div>
  );
}


export default ElectricianServ
