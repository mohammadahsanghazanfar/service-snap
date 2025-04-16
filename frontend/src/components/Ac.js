import React from 'react'
import Fan2 from '../images/Fan2.jpg';
import Motor from '../images/Motor.jpg';
import Ac2 from '../images/Ac2.jpeg';
import Ac1 from '../images/Ac-install.webp'
import LED from '../images/LED.jpg';
import AcComp from './AcComp';
import Gen from '../images/gen.jpg'





function Ac() {
  let servicesArr = [{
      name: "AC Installation ",
      des: 'New AC unit installation (split, central, or window AC) Replacement of old or faulty AC unitsDuctless mini-split system installation',
      price: 500,
      img: Ac2,  // Assuming Fan1 is the path to your image
      rating: 3.8
  },
  {
  name: "LED (Installation)",
  des: 'One Item',
  price:1000,
  img: LED , // Assuming Fan1 is the path to your image
  rating: 4.8
},
{
  name: "Water Motor Installation",
  des: 'One Item',
  img: Motor, 
  price:1000,// Assuming Fan1 is the path to your image
  rating: 1.8
},
{
    name: "Generator (Installation)",
    des: 'One Item',
    img: Gen, // Assuming Fan1 is the path to your image
    rating: 1.8,
    price:1000,
  },
  {
    name: "Generator (Installation)",
    des: 'One Item',
    img: Gen, // Assuming Fan1 is the path to your image
    rating: 1.8,
    price:1000,
  }
];

  return (
      <div>
          <div className='font-bold mt-[3%] text-2xl text-center'>AC Services</div>

          <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4  gap-4 p-[5%] '>
              {servicesArr.map((service, index) => (
                <AcComp service={service} index={index}/>
              ))}
          </div>
      </div>
  );
}


export default Ac;
