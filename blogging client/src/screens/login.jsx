import axios from 'axios';
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  let email = useRef();
  let password = useRef();
  let navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    console.log("Token in useEffect:", token); // Debug log
    if (token) {
        navigate("/"); // Redirect to home if logged in
    }
}, []);

  let loginUser = async (event) => {
    event.preventDefault();
    const user = {
      email: email.current.value,
      password: password.current.value,
    };

    try {
      let response = await axios.post(
        "http://localhost:3000/api/v1/login",
        user
      );
      console.log(response.data); // Log response
      console.log(response.data.accessToken); // Log token

      // Save token to localStorage
      localStorage.setItem("authToken", response.data.accessToken);

      alert(response.data.message || 'Login successful!');
      navigate("/"); // Redirect to home page
    } catch (error) {
      alert(error.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 text-center">
      <h2 className="text-2xl font-bold mb-6">Login</h2>
      <form
        onSubmit={loginUser}
        className="flex flex-col space-y-4"
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          ref={email}
          className="p-2 border rounded-md text-lg"
        />
        <input
          type="text" // Changed input type for security
          name="password"
          placeholder="Password"
          ref={password}
          className="p-2 border rounded-md text-lg"
        />
        <button
          type="submit"
          className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
