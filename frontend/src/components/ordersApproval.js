import React, { useEffect, useState,useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox ,faTachometerAlt } from '@fortawesome/free-solid-svg-icons';
import ApprovalOrdersComp from './ApprovalOrdersComp';

function OrdersApproval() {
  const [flattenedOrders, setFlattenedOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 8;
  const phoneRef=useRef()

  const searchOrders = async () => {
    const searchValue = phoneRef.current.value.trim().toLowerCase()
    if (!searchValue) return;
    try {
      const response = await fetch("http://localhost:5001/api/particularOrder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mobile: searchValue }),
      });
      const data = await response.json();
      const orders=data.orders
      const flat = orders.flatMap(order =>
        order.services.map(service => {
          const { services, ...orderWithoutServices } = order; // remove .services to avoid duplication
          return {
            ...orderWithoutServices,
            serviceName: service.serviceName,
            servicePrice: service.price,
            serviceDescription: service.des,
            serviceDomain: service.domain,
          };
        })
      );
      setFlattenedOrders(flat)
      setCurrentPage(1);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };


  // Fetch orders from backend and flatten them
  const getOrders = async () => {
    try {
      const response = await fetch('http://localhost:5001/allOrders');
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }

      const data = await response.json();
      if (data.success) {
        const orders = data.orders;

        // Flattening the orders
        const flat = orders.flatMap(order =>
          order.services.map(service => {
            const { services, ...orderWithoutServices } = order; // remove .services to avoid duplication
            return {
              ...orderWithoutServices,
              serviceName: service.serviceName,
              servicePrice: service.price,
              serviceDescription: service.des,
              serviceDomain: service.domain,
            };
          })
        );

        setFlattenedOrders(flat);
        setCurrentPage(1); // reset to first page
      } else {
        console.error(data.message);
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  // Pagination logic
  const indexOfLast = currentPage * ordersPerPage;
  const indexOfFirst = indexOfLast - ordersPerPage;
  const currentOrders = flattenedOrders.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(flattenedOrders.length / ordersPerPage);

  return (
    <div className='mt-8'>

      <div className="ml-10 mt-14 inline text-lg w-[50%] text-black">
              <FontAwesomeIcon icon={faTachometerAlt} />
              <span className="ml-2">Admin Dashboard</span>
            </div>
      
            <div className="ml-[40%] mt-14 text-lg w-[50%] inline text-black">
              <label>Search User:</label>
              <input
                ref={phoneRef}
                onChange={(e) => {
                  if (e.target.value.trim() === '') {
                    getOrders(); // Reload all users when cleared
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    searchOrders();
                    setCurrentPage(1); // Reset to first page
                  }
                }}
                className="border border-black ml-1"
              />
            </div>
      
            <div className="ml-[40%] mt-4 text-lg">
              <FontAwesomeIcon icon={faBox} />
              <span className="ml-2">All Orders List</span>
            </div>

      <table className="min-w-full bg-white mt-6 border border-gray-300 rounded-lg">
        <thead className="bg-gray-100">
          <tr> 
            <th className="py-2 px-4 border-b text-left">#</th>
            <th className="py-2 px-4 border-b text-left">Name</th>
            <th className="py-2 px-4 border-b text-left">Email</th>
            <th className="py-2 px-4 border-b text-left">Cell#</th>
            <th className="py-2 px-4 border-b text-left">Location</th>
            <th className="py-2 px-4 border-b text-left">Service Name</th>
            <th className="py-2 px-4 border-b text-left">Price</th>
            <th className="py-2 px-4 border-b text-left">Accept</th>
            <th className="py-2 px-4 border-b text-left">Reject</th>
          </tr>
        </thead>
        <tbody>
          {currentOrders.map((order, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <ApprovalOrdersComp order={order} index={indexOfFirst + index} refresh={getOrders} />
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            onClick={() => setCurrentPage(i + 1)}
            className={`px-4 py-2 rounded ${
              currentPage === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
}

export default OrdersApproval;
