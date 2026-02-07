import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useAuth } from '../context/AuthContext';
import Button from './ui/Button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();

  // Check if we're on the profile page
  const isProfilePage = location.pathname === '/profile';

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {/* Brand Logo */}
            <div className="flex-shrink-0 flex items-center cursor-pointer">
              <span className="text-2xl font-bold text-primary-600">
                CareerVerse
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:ml-8 md:flex md:space-x-8">
              <a
                href="#"
                className="text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-primary-500 text-sm font-medium"
              >
                Home
              </a>
              <a
                href="#"
                className="text-gray-500 hover:text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 border-transparent hover:border-gray-300 text-sm font-medium transition-colors"
              >
                About
              </a>
            </div>
          </div>

          {/* Desktop Right Side Buttons */}
          <div className="hidden md:flex items-center space-x-6">
            {!currentUser ? (
              // Show Login/Signup when user is not logged in
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="text-gray-700 hover:text-primary-600 font-medium transition-colors"
                >
                  Login
                </button>
                <Button variant="primary" size="sm" onClick={() => navigate('/signup')}>
                  Sign Up
                </Button>
              </>
            ) : (
              // Show Profile, user email and Logout when logged in
              <>
                {!isProfilePage && (
                  <>
                    <button
                      onClick={() => navigate('/profile')}
                      className="text-sm text-gray-700 hover:text-primary-600 font-medium transition-colors"
                    >
                      Profile
                    </button>
                    <span className="text-sm text-gray-700">
                      {currentUser.email}
                    </span>
                  </>
                )}
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary-500 transition-colors"
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {!isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className="md:hidden bg-white border-t border-gray-100"
          id="mobile-menu"
        >
          <div className="pt-2 pb-3 space-y-1">
            <a
              href="#"
              className="bg-primary-50 border-primary-500 text-primary-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium"
            >
              Home
            </a>
            <a
              href="#"
              className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors"
            >
              About
            </a>
          </div>
          <div className="pt-4 pb-4 border-t border-gray-200 px-4">
            {!currentUser ? (
              // Show Login/Signup when user is not logged in
              <div className="flex flex-col space-y-3">
                <Button
                  variant="outline"
                  size="md"
                  className="w-full justify-center"
                  onClick={() => navigate('/login')}
                >
                  Login
                </Button>
                <Button
                  variant="primary"
                  size="md"
                  className="w-full justify-center"
                  onClick={() => navigate('/signup')}
                >
                  Signup
                </Button>
              </div>
            ) : (
              // Show Profile, user email and Logout when logged in
              <div className="flex flex-col space-y-3">
                {!isProfilePage && (
                  <>
                    <Button
                      variant="primary"
                      size="md"
                      className="w-full justify-center"
                      onClick={() => navigate('/profile')}
                    >
                      Profile
                    </Button>
                    <div className="text-sm text-gray-700 text-center">
                      {currentUser.email}
                    </div>
                  </>
                )}
                <Button
                  variant="outline"
                  size="md"
                  className="w-full justify-center"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
