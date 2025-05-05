import React from 'react'
import {message } from 'antd';

function ApprovalOrdersComp({order,index,refresh}) {


       const ApproveOrder=async()=>{


         try{
        const response = await fetch("http://localhost:5001/api/adminApproval", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            
            username:order.username,
            email: order.email,
            money:order.servicePrice,
            serviceName:order.serviceName,
            servicedes:order.servicedes,
            cell:order.mobile,
            location:order.area,
            address:order.address
          }),
        });

         const data=await response.json()
         if(response.ok){
            message.success("Order Approved")
           
         } 
         else{
           message.error("Something went wrong")
         }}
         catch(error){
             message.error(error)
         }
       }
  
       const rejectOrder=async()=>{
        try{
                const response=await fetch("http://localhost:5001/api/rejectOrder",{
                 method:"DELETE",
                 headers: { "Content-Type": "application/json" },
                 body: JSON.stringify({
                       id:order._id
                 })
               })
               const data = await response.json();

               if (response.ok) {
                refresh()
              
                 message.success("Order Rejected");
                 
               } else {
                 message.error("Failed to reject order");
               }}
             catch (error) {
               message.error("Error rejecting order");
             }
       }

  return (
    
    <>
        <td className="py-4 px-4 border-b">{index + 1}</td>
              <td  className="py-2 px-4 border-b">{order.username}</td>
              <td className="py-2 px-4 border-b">{order.email}</td>
              <td className="py-2 px-4 border-b">{order.mobile}</td>
              <td className="py-2 px-4 border-b">{order.area}</td>
              <td className="py-2 px-4 border-b">{order.serviceName}</td>
              <td className="py-2 px-4 border-b">{order.servicePrice}</td>
              
           
        <td className="py-2 px-4 border-b">
          
          
          
            <button
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              onClick={ApproveOrder}
            >
              Approve
            </button>
          
        </td>
        <td className="py-2 px-4 border-b">
          
          
          
          <button
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
            onClick={rejectOrder}
             
          >
                Reject
          </button>
        
      </td>
      </>
      
    
  )
}

export default ApprovalOrdersComp
