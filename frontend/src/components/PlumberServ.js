import React from 'react'
import Fan2 from '../images/Fan2.jpg';
import Motor from '../images/Motor.jpg';
import LED from '../images/LED.jpg';
import leak from '../images/leak.jpg';
import Drain from '../images/Drain.jpg'
import pipe from '../images/pipe.jpg'
import water from '../images/water.png'
import PlumberServComp from './PlumberServComp';
import toilet from '../images/toilet.webp'
import shower from '../images/shower.webp'

import Gen from '../images/gen.jpg'





function PlumberServ() {
  let servicesArr = [{
      name: "Leak Detection and Repair",
      des: 'One Item',
      price: 500,
      img: leak, // Assuming Fan1 is the path to your image
      rating: 3.8
  },
  {
  name: "Drain Cleaning and Unclogging",
  des: 'One Item',
  price:1000,
  img: Drain, // Assuming Fan1 is the path to your image
  rating: 4.8
},
{
  name: "Pipe Installation and Repair",
  des: 'One Item',
  img: pipe, 
  price:1000,// Assuming Fan1 is the path to your image
  rating: 1.8
},
{
    name: "Water Heater Services",
    des: 'One Item',
    img: water, // Assuming Fan1 is the path to your image
    rating: 1.8,
    price:1000,
  },
  {
    name: " Toilet Repair and Installation",
    des: 'One Item',
    img: toilet, // Assuming Fan1 is the path to your image
    rating: 1.8,
    price:1000,
  },
  {
    name: " Shower and Tub Repair",
    des: 'One Item',
    img: shower, // Assuming Fan1 is the path to your image
    rating: 2.8,
    price:1000,
  }
];

  return (
      <div>
          <div className='font-bold mt-[3%] text-2xl text-center'>Plumbing Services</div>

          <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4  gap-4 p-[5%] '>
              {servicesArr.map((service, index) => (
                <PlumberServComp service={service} index={index}/>
              ))}
          </div>
      </div>
  );
}


export default PlumberServ;
