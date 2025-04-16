import React, { useEffect, useState, useRef } from "react";
import { notification } from "antd";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userActions } from "../store";
import { Link } from "react-router-dom";
import { Form } from "antd"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CheckoutForm from "./CheckoutForm";

import { faCreditCard } from "@fortawesome/free-solid-svg-icons";
import {
  faUser,
  faCartArrowDown,
  faChevronDown,
  faTools
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const valid = localStorage.getItem('isAuthenticated') === "true" //useSelector((state) => state.userData.isAuthenticated);
  const cartItems = useSelector((state) => state.userData.items);
  const user = useSelector((state) => state.userData.user);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showServicesDropdown, setShowServicesDropdown] = useState(false);
  const [cartIsClicked, setCartIsClicked] = useState(false);
  const [totalPrice, setTotalPrice] = useState();
  const [showModal, setModal] = useState(false);
  const dispatch = useDispatch();

  const addRef = useRef();
  const [add, setAdd] = useState('')
  const [paymentMethod, setPaymentMethod] = useState("cash");


  useEffect(() => {
    let sum = 0;
    for (let i = 0; i < cartItems.length; i++) {
      sum = sum + cartItems[i].price;
    }
    setTotalPrice(sum);



    navigator.geolocation.getCurrentPosition(pos => {
      const { latitude, longitude } = pos.coords;
      console.log(latitude, longitude)
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
      fetch(url).then(res => res.json()).then(data => setAdd(data.address))
    })

  }, [cartItems]);

  const handleClose = () => {
    setModal(false)
  }

  const removeItem = (index) => {
    dispatch(userActions.setRemoveItem(index));
  };
  const handleOk = () => {
    console.log(user)

  };

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };
  const logout = () => {
    localStorage.setItem('isAuthenticated', false)
  }




  return (
    <div className="font-sans text-gray-700">
      {/* Header */}
      <header className="flex p-4 bg-white shadow-md items-center">
        <div className="text-3xl font-bold ml-[8%] text-blue-600 p-4">
          HOMIFY
        </div>
        <nav className="hidden lg:flex space-x-8 lg:ml-[12%] xl:ml-[12%] lg:pr-[20%] text-gray-500 p-4 text-xl">
          {/* Services Link with Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setShowServicesDropdown(true)}
            onMouseLeave={() => setShowServicesDropdown(false)}
          >

            <Link
              to="/services"
              className="flex items-center space-x-2 hover:text-blue-600"
            >
              <FontAwesomeIcon icon={faTools} />
              <span>Services</span>
            </Link>



            {showServicesDropdown && (
              <div
                className="absolute top-full mt-2 bg-white shadow-md rounded-lg w-40 py-2"
                onMouseEnter={() => setShowServicesDropdown(true)}
                onMouseLeave={() => setShowServicesDropdown(false)}
              >
                <Link
                  to="/service1"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Service 1
                </Link>
                <Link
                  to="/service2"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Service 2
                </Link>
                <Link
                  to="/service3"
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  Service 3
                </Link>
              </div>
            )}
          </div>

          <a href="#" className="hover:text-blue-600 w-[50%]">
            About Us
          </a>
          <a href="#" className="hover:text-blue-600">
            Contact
          </a>
          <a href="#" className="hover:text-blue-600">
            Worker
          </a>

          {/* User Authentication Dropdown */}
          {valid ? (
            <div
              className="relative flex items-center lg:absolute left-[85%] mt-[-0.4%]"
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => setShowDropdown(false)}
            >
              <div className="w-10 h-10 rounded-full cursor-pointer text-white flex items-center justify-center font-bold">
                <FontAwesomeIcon
                  icon={faUser}
                  className="text-black text-3xl"
                />
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="text-black ml-1 text-sm font-bold"
                />
              </div>
              {showDropdown && (
                <div className="absolute top-full right-0 mt-2 bg-white shadow-md rounded-lg w-40 py-2">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  {user.role === "worker" ? (
                    <Link
                      to="/pen"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Pending
                    </Link>
                  ) : (
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Settings
                    </Link>
                  )}
                  <button
                    onClick={logout}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/login"
              className="hover:bg-blue-700 cursor-pointer lg:absolute left-[85%] mt-[-0.5%] text-xl bg-blue-600 font-bold rounded-md text-white p-4"
            >
              Login
            </Link>
          )}
        </nav>

        {/* Cart Icon */}
        {valid && (
          <div
            className="absolute left-[81%]"
            onMouseLeave={() => setCartIsClicked(false)}
          >
            <FontAwesomeIcon
              icon={faCartArrowDown}
              className="text-4xl cursor-pointer mt-1 text-black"
              onClick={() => setCartIsClicked(!cartIsClicked)}
            />
            {cartIsClicked && (
              <div
                className="absolute top-full right-0 mt-2 bg-white shadow-lg rounded-lg w-72 sm:w-96 py-4 px-6 border border-gray-200"
                style={{ zIndex: 10 }}
              >
                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">
                  Shopping Cart
                </h3>
                {cartItems.length > 0 ? (
                  <div className="max-h-60 overflow-y-auto">
                    <ul>
                      {cartItems.map((item, index) => (
                        <li
                          key={index}
                          className="flex items-center justify-between mb-4 la  mb-0 px-4 py-2 border-b last:border-none"
                        >
                          <div className="flex  space-x-4">
                            <img
                              src={item.img}
                              alt={item.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div>
                              <p className="text-sm font-medium text-gray-800">
                                {item.name}
                              </p>
                              <p className="text-xs text-gray-500">
                                {item.des}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-bold text-gray-800">
                              ${item.price}
                            </p>
                            <button
                              className="text-xs text-red-500 hover:underline"
                              onClick={() => removeItem(index)}
                            >
                              Remove
                            </button>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-2 ml-4 font-bold text-red-600">
                      {" "}
                      TotalPrice: Rs {totalPrice}
                    </p>
                  </div>
                ) : (
                  <p className="text-center text-gray-700">
                    Your cart is empty.
                  </p>
                )}
                {cartItems.length > 0 && (
                  <div className="mt-4">
                    <button
                      onClick={() => setModal(!showModal)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 rounded"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}


        <CheckoutForm showModal={showModal} user={user} totalPrice={totalPrice} handleClose={handleClose} cartItems={cartItems} />


      </header>
    </div>
  );
};

export default Navbar;
