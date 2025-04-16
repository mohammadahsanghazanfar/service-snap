import React from "react";
import { useFormik } from "formik";
import { useNavigate } from 'react-router-dom';
import { DatePicker, notification } from "antd";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { userActions } from "../store";

const LoginComp = () => {

   const navigate=useNavigate()
   const dispatch=useDispatch()

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('Email should be valid')
      .required('Email is required'),
    password: Yup.string()
      .min(8, 'Password must not be less than 8 characters')
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await fetch('http://localhost:5001/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: values.email,
            password: values.password,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log(data);
           localStorage.setItem('userEmail', data.email);
          localStorage.setItem('username', data.username);
          localStorage.setItem('isAuthenticated', true);

          dispatch(userActions.setEmail(data.user.email));
          dispatch(userActions.setUser(data.user));

          if (data.user.role === 'worker') {
            navigate('/worker-page');
          } else {
            navigate('/');
          }
        } else {
          console.error('Login failed');
          notification.error({
            message: 'Error',
            description: 'Enter valid credentials',
          });
        }
      } catch (error) {
        console.error('Error logging in', error);
      }
    },
  });

    const isFormInvalid=!formik.isValid || !formik.dirty;

    const handleGoogleSignIn = () => {
      window.location.href = 'http://localhost:5001/auth/google/callback';
    };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md bg-white text-lg shadow-lg rounded-lg p-8">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Login to Homify
        </h2>
        <form onSubmit={formik.handleSubmit}>
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

          <div className="relative mb-6 mt-8 ">
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
                <div className=" absolute text-red-500">{formik.errors.password}</div>
              ) : null}
            </div>
         
            <div className="mt-10 flex items-center justify-between">
          <button
              type="submit"
              id="btn"
              className={`w-full py-2 px-4 rounded-md text-white ${
                isFormInvalid
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 transition duration-300"
              }`}
              disabled={isFormInvalid}
            >
              Sign In
            </button>
          </div>
          <div className="mt-4 p-2 text-center rounded-md bg-red-500 hover:bg-red-600 cursor-pointer">
            <button className="text-white"
            onClick={handleGoogleSignIn}
            >
            Sign In
            <i className="fab fa-google ml-2 text-red"></i>
                
            </button>
          </div>
          <div className="mt-4 text-center">
            <a
              href="/forgot-password"
              className="text-sm text-blue-500 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to='/sign-up' className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginComp;
