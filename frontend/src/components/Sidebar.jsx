import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import {
  FaChevronUp,
  FaChevronDown,
  FaUserCircle,
  FaHome,
  FaCog,
  FaQuestionCircle,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="h-screen w-64 bg-gray-900 text-white flex flex-col justify-between shadow-lg">
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
              className="flex items-center space-x-4 text-gray-400 hover:text-white"
            >
              <FaHome size={20} />
              <span className="text-md">Browse Recipes</span>
            </Link>
          </li>

          {/* Dropdown for Profile */}
          <li
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="cursor-pointer"
          >
            <div className="flex justify-between items-center space-x-4 text-gray-400 hover:text-white">
              <div className="flex items-center space-x-4">
                <FaUserCircle size={20} />
                <span className="text-md">My Profile</span>
              </div>
              {isDropdownOpen ? (
                <FaChevronUp size={16} />
              ) : (
                <FaChevronDown size={16} />
              )}
            </div>
            {isDropdownOpen && (
              <ul className="ml-8 space-y-2 text-gray-500 mt-3">
                <li>
                  <Link to="/myfeed" className="hover:text-white">
                    My Feed
                  </Link>
                </li>
                <li className="mt-2">
                  <Link to="/upload-recipe" className="hover:text-white">
                    Upload Recipe
                  </Link>
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
              className="flex items-center space-x-4 text-gray-400 hover:text-white"
            >
              <FaCog size={20} />
              <span className="text-md">Settings</span>
            </Link>
          </li>

          <li>
            <Link
              to="/"
              className="flex items-center space-x-4 text-gray-400 hover:text-white"
            >
              <FaQuestionCircle size={20} />
              <span className="text-md">FAQ</span>
            </Link>
          </li>

          <li className="pb-5">
            <button
              onClick={handleLogout}
              className="flex items-center space-x-4 text-gray-400 hover:text-white w-full"
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
