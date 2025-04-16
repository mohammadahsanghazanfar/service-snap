import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux"; // Assuming you're using Redux for user data

function Pending() {
  const user = useSelector((state) => state.userData.user); // Get user data from Redux
  const [pendingOrders, setPendingOrders] = useState([]); // State to store pending orders

  const fetchPendingOrders = async () => {
    try {
      const response = await fetch("http://localhost:5001/pendingOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          acceptorEmail: user.email,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setPendingOrders(data.userData); // Save the fetched data to state
      }
    } catch (error) {
      console.error("Error fetching pending orders:", error);
    }
  };

  useEffect(() => {
    fetchPendingOrders();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-bold">Pending Orders</h2>
      <ul className=" grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4  gap-4 p-[5%]  ">
        {pendingOrders.length > 0 ? (
          pendingOrders.map((order, index) => (
            <div className="border rounded">
            <li key={index} className="p-2 ">
            <b>serviceName: </b> {order.serviceName}
            </li>
            <li key={index} className="p-2 ">
             <b>Prices: </b> Rs {order.money} 
            </li>
            </div>
            
          ))
        ) : (
          <p>No pending orders found.</p>
        )}
      </ul>
    </div>
  );
}

export default Pending;

