import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaSun, FaMoon, FaUser } from 'react-icons/fa';

function Navbar({ darkMode, toggleDarkMode, user, onLogout }) {
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-primary-600">
            HealthCare HMS
          </Link>
          
          <div className="flex items-center space-x-4">
            <Link to="/" className="hover:text-primary-600">Dashboard</Link>
            <Link to="/appointments" className="hover:text-primary-600">Appointments</Link>
            <Link to="/records" className="hover:text-primary-600">Records</Link>
            
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {darkMode ? <FaSun className="text-yellow-400" /> : <FaMoon />}
            </button>
            
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center space-x-2 hover:text-primary-600"
              >
                <FaUser />
                <span>{user?.name || 'User'}</span>
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 z-10">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => setShowProfileMenu(false)}
                  >
                    Profile Settings
                  </Link>
                  <hr className="my-2 border-gray-200 dark:border-gray-700" />
                  <button
                    onClick={() => {
                      onLogout();
                      setShowProfileMenu(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;