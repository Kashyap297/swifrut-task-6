import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";
import {
  FaUserCircle,
  FaHome,
  FaChartBar,
  FaCog,
  FaQuestionCircle,
  FaSignOutAlt,
} from "react-icons/fa"; // Import icons

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Track dropdown state

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <div className="h-screen w-64 bg-gray-50 flex flex-col justify-between shadow-lg">
      {/* User Info */}
      <div className="flex flex-col items-center px-4 py-6">
        <FaUserCircle size={80} className="text-gray-400 mb-4" />
        <div className="text-center">
          <p className="text-lg font-semibold">
            {user?.username || "Login to view Your Profile"}
          </p>
        </div>
      </div>

      {/* Sidebar Links */}
      <nav className="px-4 flex-1">
        <ul className="space-y-6">
          <li>
            <Link
              to="/"
              className="flex items-center space-x-4 text-gray-700 hover:text-gray-900"
            >
              <FaHome size={20} />
              <span className="text-md">Browse Recipes</span>
            </Link>
          </li>

          {/* Dropdown for Viewers */}
          <li
            onClick={() => setIsDropdownOpen(!isDropdownOpen)} // Move the onClick to the li element
            className="cursor-pointer"
          >
            <div className="flex justify-between items-center space-x-4 text-gray-700 hover:text-gray-900">
              <div className="flex items-center space-x-4">
                <FaUserCircle size={20} />
                <span className="text-md">My Profile</span>
              </div>
              {isDropdownOpen ? (
                <FaChevronUp size={16} /> // Replacing ▲ with FaChevronUp
              ) : (
                <FaChevronDown size={16} /> // Replacing ▼ with FaChevronDown
              )}
            </div>
            {isDropdownOpen && (
              <ul className="ml-8 space-y-2 text-gray-600 mt-3">
                <li>
                  <Link to="/myfeed">My Feed</Link>
                </li>
                <li className="mt-2">
                  <Link to="/upload-recipe">Upload Recipe</Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </nav>

      {/* Bottom Section */}
      <nav className="px-4">
        <ul className="space-y-6">
          <li>
            <Link
              to="/"
              className="flex items-center space-x-4 text-gray-700 hover:text-gray-900"
            >
              <FaCog size={20} />
              <span className="text-md">Settings</span>
            </Link>
          </li>

          <li>
            <Link
              to="/"
              className="flex items-center space-x-4 text-gray-700 hover:text-gray-900"
            >
              <FaQuestionCircle size={20} />
              <span className="text-md">FAQ</span>
            </Link>
          </li>

          <li className="pb-5">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-4 text-gray-700 hover:text-gray-900 w-full"
            >
              <FaSignOutAlt size={20} />
              <span className="text-md">Logout</span>
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
