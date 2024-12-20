import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check token in localStorage on component mount
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsLoggedIn(!!token); // Update state based on token presence
    
  }, []);

  // Logout function
  let logout = async () => {
    try {
      let response = await axios.post(
        "http://localhost:3000/api/v1/logout"
      );
      console.log(response.data);
      alert(response.data.message || 'Logout successful!');
      localStorage.removeItem("authToken"); // Remove token
      setIsLoggedIn(false); // Update login state
      navigate("/login"); // Redirect to login page
    } catch (error) {
      alert(error.response?.data?.message || 'Logout failed');
    }
  };

  return (
    <div className="navbar px-3 flex justify-between py-2 bg-black text-white">
      <div className="bg-red-300">
        <h1 className="text-1.8rem">Blogging Web</h1>
      </div>
      <div className="flex items-center justify-end gap-5 pe-4 w-30rem">
        {!isLoggedIn && ( // Show Login/Register if not logged in
          <>
            <div className="login">
              <Link to="login">Login</Link>
            </div>
            <div className="register">
              <Link to="register">Register</Link>
            </div>
          </>
        )}
        {isLoggedIn && ( // Show Logout if logged in
          <div className="logout">
            <button
              className="bg-red w-6rem px-2 py-2 rounded"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
