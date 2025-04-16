import React from "react";
import { Modal } from "antd";
import user from "../images/user.jpg";

function WokerComp({ service, serviceIndex,order,users }) {

        
  const handleDelete=async()=>{
                try{
                  const response = await fetch("http://localhost:5001/deleteOrders", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ 
                             
                      email:order.email,
                      serviceName:service.name,
                             
                             
                    }),
                  });

                  const data = await response.json();
                  if (!response.ok) {
                      alert("Error:", data.error);
                  } else {
                      alert("Success:", data.message);
                  }
                }
                catch(err){
                  console.log(err)
                }


  }

  const handleAccept = async () => {
    Modal.confirm({
      title: "Confirm Order Acceptance",
      content: "Are you sure you want to accept this order?",
      okText: "Yes",
      cancelText: "No",
      onOk: async () => {
        try {
          const response = await fetch("http://localhost:5001/acceptOrders", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                     username:order.username,
                     acceptor:users.username,
                     phoneNumber:order.mobile,
                     acceptorPhone:users.phoneNumber,
                     email:order.email,
                     acceptorEmail:users.email,
                     money:service.price,
                     serviceName:service.name,
                     area:order.area,
                     
                     address:order.address,
                     paymentMethod:"cash",
            }),
          });

          const data = await response.json();

          if (data.success) {
            console.log("Order accepted successfully!");
            alert('Ordered')
            handleDelete()
          } else {
            console.log("Failed to accept order");
            alert(' not Ordered')
          }
        } catch (error) {
          console.error("Error accepting order:", error);
        }
      },
    });
  };

  return (
    <div>
      <li key={serviceIndex} className="p-4 border rounded-md my-1">
        <img
          src={user}
          className="w-32 h-32 object-cover rounded sm:w-full sm:h-full"
          alt="User"
        />
        <div className="mt-3">
          <strong>Name:</strong> {service.name}
        </div>
        <br />
        <div className="mb-3">
          <strong>Price:</strong> {service.price}
        </div>
        <button
          className="bg-red-500 text-gray-900 cursor-pointer font-bold rounded p-2 sm:ml-[60%] md:ml-[70%]"
          onClick={handleAccept}
        >
          Accept
        </button>
      </li>
    </div>
  );
}

export default WokerComp;

