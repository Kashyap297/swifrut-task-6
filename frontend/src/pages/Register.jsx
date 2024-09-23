import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FaFacebookF, FaGooglePlusG, FaLinkedinIn } from "react-icons/fa"; // Import icons

const Register = () => {
  const { register } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(username, email, password);
      navigate("/"); // Redirect to home page after registration
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white rounded-lg shadow-lg flex max-w-4xl">
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold mb-4">Sign up</h2>
          <div className="flex justify-center mb-6 space-x-4">
            <button className="w-10 h-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">
              <FaFacebookF />
            </button>
            <button className="w-10 h-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">
              <FaGooglePlusG />
            </button>
            <button className="w-10 h-10 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center">
              <FaLinkedinIn />
            </button>
          </div>
          <p className="text-gray-500 mb-4 text-center">or use your account</p>
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Username"
              className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder="Email"
              className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full p-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition">
              SIGN UP
            </button>
          </form>
        </div>
        <div className="w-full md:w-1/2 rounded-lg bg-green-500 text-white flex flex-col items-center justify-center p-8">
          <h2 className="text-3xl font-bold">Welcome Back!</h2>
          <p className="mb-4">
            To keep connected with us, please login with your personal info
          </p>
          <button
            onClick={() => navigate("/login")} // Navigate to the login page
            className="border border-white py-2 px-4 rounded-md hover:bg-white hover:text-green-500 transition"
          >
            SIGN IN
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
