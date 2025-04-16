import React from "react";
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';
import { DatePicker, notification } from "antd";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { userActions } from "../store";
const SignUpComp = () => {
 
  const navigate=useNavigate()
  const dispatch=useDispatch()

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .max(20, "Username must not exceed 20 characters")
      .required("Username is required"),
    email: Yup.string()
      .email("Email should be valid")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Minimum 8 characters required")
      .required("Password is required"),
    password2: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Password confirmation required"),
    area: Yup.string().required("Area is required"),
    role: Yup.string().required("Role is required"),
    
  });

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      password2: "",
      role: "",
      area: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const response = await fetch("http://localhost:5001/api/createUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: values.username,
          email: values.email,
          password: values.password,
          city:'lahore',
          area:values.area,
          role:values.role
        }),
      });

      const json = await response.json();
      if (!json.success) {
        notification.error({
          message: "Error",
          description: json.message || "Enter valid cred",
        });
      } else {
        notification.success({
          message: "Success",
          description: json.message || "Data added successfully",
        });
        console.log(json.user)
        dispatch(userActions.setUser(json.user))
        localStorage.setItem('role',json.user.role)
        localStorage.setItem('email',json.user.email)
        if(json.user.role ==='customer'){
                navigate('/')
        }
        if(json.user.role==='worker'){
          navigate('/signup-detail')
        }
        else{
          //dispatch(userActions.setIsAuthenticated(true))
          //navigate('/electrician-services')

        }

      }
    },
  });
  const isFormInvalid = !formik.isValid || !formik.dirty;

  const areas = [
    "Gulberg",
    "DHA",
    "Model Town",
    "Bahria Town",
    "Iqbal Town",
    "Johar Town",
    "Faisal Town",
    "Raiwind Road",
    "Lahore Cantt",
    "Walled City",
  ];

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {/* Updated container width and padding */}
      <div className="w-full lg:w-[50%] md:mt-[3%] bg-white text-lg shadow-lg rounded-lg p-10">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Sign in to Homify
        </h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="relative mb-6">
            <label
              htmlFor="username"
              className="block text-gray-700 text-lg font-medium mb-2"
            >
              User Name
            </label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.username}
              placeholder="Enter your username"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            {formik.touched.username && formik.errors.username ? (
              <div className="absolute text-red-500 ">
                {formik.errors.username}
              </div>
            ) : null}
          </div>

          <div className="relative mb-6 mt-8">
            <label
              htmlFor="email"
              className="block text-gray-700 text-lg font-medium mb-2"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              placeholder="Enter your email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />

            {formik.touched.email && formik.errors.email ? (
              <div className="absolute text-red-500">{formik.errors.email}</div>
            ) : null}
          </div>

          <div className="relative mb-6 mt-8 grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="password"
                className="block text-gray-700 text-lg font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                placeholder="Enter your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {formik.touched.password && formik.errors.password ? (
                <div className="text-red-500">{formik.errors.password}</div>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="password2"
                className="block text-gray-700 text-lg font-medium mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="password2"
                name="password2"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password2}
                placeholder="Confirm your password"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              {formik.touched.password2 && formik.errors.password2 ? (
                <div className="absoulte text-red-500">
                  {formik.errors.password2}
                </div>
              ) : null}
            </div>
          </div>

          <div className="relative mb-6">
            <label
              htmlFor="city"
              className="block text-gray-700 text-lg font-medium mb-2"
            >
              City
            </label>
            <input
              type="text"
              id="city"
              placeholder="Lahore"
              readOnly
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>

          <div className=" relative mb-6 grid grid-cols-2 gap-2">
            <div>
              <label
                htmlFor="area"
                className="block text-gray-700 text-lg font-medium mb-2"
              >
                Area
              </label>
              <select
                id="area"
                name="area"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.area}
                className="w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                style={{ color: "#b0b0b0" }}
              >
                <option value="">Choose Area</option>
                {areas.map((area, index) => (
                  <option key={index} value={area}>
                    {area}
                  </option>
                ))}
              </select>
              {formik.touched.area && formik.errors.area ? (
                <div className="absolute text-red-500">
                  {formik.errors.area}
                </div>
              ) : null}
            </div>
            <div>
              <label
                htmlFor="role"
                className="block text-gray-700 text-lg font-medium mb-2"
              >
                Role
              </label>
              <select
                id="role"
                name="role"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.role}
                style={{ color: "#b0b0b0" }}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Choose Role</option>
                <option value="customer">Customer</option>
                <option value="worker">Worker</option>
              </select>
              {formik.touched.role && formik.errors.role ? (
                <div className="absolute text-red-500">
                  {formik.errors.role}
                </div>
              ) : null}
            </div>
          </div>

          <div className="mt-10 flex items-center justify-between">
            <button
              type="submit"
              className={`w-full py-2 px-4 rounded-md text-white ${
                isFormInvalid
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 transition duration-300"
              }`}
              disabled={isFormInvalid}
            >
              Sign Up
            </button>
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-500 hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpComp;
