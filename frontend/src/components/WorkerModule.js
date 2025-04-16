import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import WokerComp from './WokerComp';
function WorkerModule() {
  const user = useSelector(state => state.userData.user);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user?.field) return;

      try {
        const response = await fetch("http://localhost:5001/allOrders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ domain: user.field }),
        });

        const data = await response.json();

        if (data.success) {
          setOrders(data.orders);
          console.log(data.orders);
        } else {
          console.log("No matching orders found");
        }
      } catch (err) {
        console.error("Error fetching orders:", err);
      }
    };

    fetchOrders();
  }, [user]);

  return (
    <div >
      

      {orders.length === 0 ? (
        <p>No orders found</p>
      ) : (
        orders.map((order, orderIndex) => (
          <div key={orderIndex} className="border p-4 mb-4 rounded-md  shadow-md">
            <h3 className="text-center text-xl font-bold mt-4">Orders</h3>

            {order.services.some(service => service.domain === user.field) ? (
              <ul className=" pl-5 grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4  gap-4 p-[5%] ">
                {order.services
                  .filter(service => service.domain === user.field)
                  .map((service, serviceIndex) => (
                   <WokerComp service={service} serviceIndex={serviceIndex} order={order} users={user}/>
                  ))}
              </ul>
            ) : (
              <p className="text-gray-500">No matching services found in this order.</p>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default WorkerModule;
