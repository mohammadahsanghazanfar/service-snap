import React,{useState} from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../store";
import { notification } from "antd";

function PlumberServComp({ service, index }) {
   const [arr,setArr]=useState([])
   const dispatch=useDispatch()

  const addToCart=(e)=>{
    e.preventDefault();
     const obj={
          img:service.img,
          name:service.name,
          price:service.price,
          des:service.des,
          domain:'Plumber'
     }
     arr.push(obj)
     console.log(arr)

     dispatch(userActions.setItems(obj))
      notification.success({
        message:"Success",
        description:"Item added to cart successfully"
      })
    
  }

  return (
    <div>
      <div key={index} className=" border-b sm:border p-4 sm:rounded">
        <img
          src={service.img}
          alt={service.name}
          className="w-full  h-48 object-contain sm:object-cover rounded"
        />
        <div className="font-semibold text-xl sm:ml-0 ml-[15%]  mt-[5%]">
          {service.name}
        </div>
        <p className="sm:ml-0 ml-[15%] font-bold"> Price: Rs {service.price}</p>
        <p className="sm:ml-0 ml-[15%]">{service.des}</p>
       
        <div className="flex items-center  ">
          <span className="text-yellow-500 sm:ml-0 ml-[15%]">
            {"★".repeat(Math.floor(service.rating))}
          </span>
          <span className="text-gray-500">({service.rating})</span>
        </div>

        <button 
        onClick={addToCart}
        className="px-2 py-2 bg-red-600 mt-[3%] hover:bg-red-700 ml-[15%] font-bold rounded-md text-white lg:relative left-[60%] top-[-15%]">
          Add+
        </button>
      </div>
    </div>
  );
}

export default PlumberServComp;
