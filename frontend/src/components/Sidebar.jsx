import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Sidebar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Track dropdown state

  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect to login page after logout
  };

  return (
    <div className="h-screen w-64 bg-gray-800 text-white flex flex-col">
      <div className="py-4 px-6 text-2xl font-bold">Recipe App</div>

      <nav className="flex flex-col mt-8 space-y-4 px-6">
        {/* Display the logged-in user's name */}
        {user && (
          <div className="text-sm py-2 px-4 text-gray-300">
            Welcome, {user.username}!
          </div>
        )}

        <Link to="/" className="hover:bg-gray-700 py-2 px-4 rounded">
          Browse All Recipes
        </Link>

        {/* Dropdown for Recipes */}
        {user && (
          <div>
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="hover:bg-gray-700 py-2 px-4 rounded w-full text-left flex justify-between items-center"
            >
              Recipes
              <span>{isDropdownOpen ? "▲" : "▼"}</span>
            </button>

            {/* Dropdown Content */}
            {isDropdownOpen && (
              <div className="ml-4 space-y-2">
                <Link
                  to="/myfeed"
                  className="hover:bg-gray-700 py-2 px-4 rounded block"
                >
                  My Feed
                </Link>
                <Link
                  to="/upload-recipe"
                  className="hover:bg-gray-700 py-2 px-4 rounded block"
                >
                  Upload Recipe
                </Link>
              </div>
            )}
          </div>
        )}

        {!user ? (
          <>
            <Link to="/login" className="hover:bg-gray-700 py-2 px-4 rounded">
              Login
            </Link>
            <Link
              to="/register"
              className="hover:bg-gray-700 py-2 px-4 rounded"
            >
              Register
            </Link>
          </>
        ) : (
          <>
            <button
              onClick={handleLogout}
              className="hover:bg-gray-700 py-2 px-4 rounded"
            >
              Logout
            </button>
          </>
        )}
      </nav>
    </div>
  );
};

export default Sidebar;
