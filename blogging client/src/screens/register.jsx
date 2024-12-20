import React, { useRef } from 'react';
import axios from 'axios';

const Register = () => {
  const username = useRef();
  const email = useRef();
  const password = useRef();

  const RegisterUser = async (event) => {
    event.preventDefault();

    // Create a single user object
    const user = {
      username: username.current.value,
      email: email.current.value,
      password: password.current.value,
    };

    try {
      // Send user object to the backend
      const response = await axios.post(
        `${process.env.BACKEND_REGISTER_URL}`, // Corrected API URL
        user
      );
      console.log(response.data); // Handle the response data
      alert(response.data.message || 'Registration successful!');
    } catch (error) {
      alert(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-12 text-center">
      <h2 className="text-2xl font-bold mb-6">Register</h2>
      <form onSubmit={RegisterUser} className="flex flex-col space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          ref={username}
          className="p-2 border rounded-md text-lg"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          ref={email}
          className="p-2 border rounded-md text-lg"
          required
        />
        <input
          type="text"
          name="password"
          placeholder="Password"
          ref={password}
          className="p-2 border rounded-md text-lg"
          required
        />
        <button
          type="submit"
          className="p-2 bg-green-500 text-white rounded-md hover:bg-green-600"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
