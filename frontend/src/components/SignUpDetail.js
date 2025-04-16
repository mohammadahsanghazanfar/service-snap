import React, { useRef, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userActions } from "../store"; // Adjust the import based on your Redux setup.
import { useSelector } from "react-redux";

function SignUpDetail() {
  const usernameRef = useRef(null);
  const fieldRef = useRef(null);
  const cnicRef = useRef(null);
  const [email,setEmail]=useState(null)

   

  const user=useSelector(state => state.userData.user);

  useEffect(()=>{
       const email1=localStorage.getItem('email')
       console.log(email1)
       setEmail(email1)
  })

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("email",email);
    formData.append("field", fieldRef.current.value);

    if (cnicRef.current.files[0]) {
      formData.append("cnic", cnicRef.current.files[0]);
    }

    try {
      const response = await fetch(
        "http://localhost:5001/account/externalloginconfirmation",
        {
          method: "POST",
          body: formData,
        }
      );

      if (response.ok) {
        const data = await response.json();
        dispatch(userActions.setUser(data.user));
        dispatch(userActions.setEmail(data.user.email));
        dispatch(userActions.setIsAuthenticated(true));
        localStorage.setItem("authtoken", data.user.authToken);
        localStorage.setItem("userEmail", data.user.email);
         console.log(data.user)
        navigate("/"); // Redirect upon success
      } else {
        console.error("Error submitting form");
      }
    } catch (error) {
      console.error("Error submitting form", error);
    }
  };

  const job = [
    "Electrician",
    "Plumber",
    "Painter",
    "PestController",
    "AcExpert",
  ];

  return (
    <div className="md:p-8">
      <div className="bg-gray-200 rounded-md p-8">
        <div className="bg-white p-8 w-full rounded-md">
          <form onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-lg font-medium mb-2"
              >
                Email
              </label>
              <input
                type="text"
                id="email"
                name="email"
                 value={email}
                placeholder={email}
                className="w-full px-4 py-4 text-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div>
              <label
                htmlFor="field"
                className="block text-lg font-medium mb-2 mt-4"
              >
                Field
              </label>
              <select
                id="field"
                name="field"
                ref={fieldRef}
                className="w-full text-lg cursor-pointer px-4 py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                style={{ color: "#b0b0b0" }}
                required
              >
                <option value="">Choose field</option>
                {job.map((jobs, index) => (
                  <option key={index} value={jobs}>
                    {jobs}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="cnic"
                className="block text-lg font-medium mt-4 mb-2"
              >
                CNIC
              </label>
              <input
                type="file"
                id="cnic"
                name="cnic"
                ref={cnicRef}
                className="w-full px-4 py-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button
              type="submit"
              className="mt-8 px-6 py-4 rounded-md bg-blue-600 font-bold hover:bg-blue-700 text-white"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignUpDetail;
