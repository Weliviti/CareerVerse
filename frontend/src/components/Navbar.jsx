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

          {/* Logo */}
          <div className="flex items-center cursor-pointer" onClick={() => navigate('/')}>
            <span className="text-2xl font-bold text-teal-600">
              CareerVerse
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => navigate('/')}
              className="text-gray-700 hover:text-teal-600 text-sm font-medium"
            >
              Home
            </button>
            {currentUser && (
              <button
                onClick={() => navigate('/simulation-hub')}
                className="text-gray-700 hover:text-teal-600 text-sm font-medium"
              >
                Simulation Hub
              </button>
            )}
            <button
              onClick={() => navigate('/about')}
              className="text-gray-700 hover:text-teal-600 text-sm font-medium"
            >
              About
            </button>
          </div>

          {/* Desktop Right */}
          <div className="hidden md:flex items-center space-x-4">
            {!currentUser ? (
              <>
                <button
                  onClick={() => navigate('/login')}
                  className="text-gray-700 hover:text-teal-600 font-medium"
                >
                  Login
                </button>
                <Button variant="primary" size="sm" onClick={() => navigate('/signup')}>
                  Sign Up
                </Button>
              </>
            ) : (
              <>
                {!isProfilePage && (
                  <>
                    <button
                      onClick={() => navigate('/profile')}
                      className="text-gray-700 hover:text-teal-600 font-medium text-sm"
                    >
                      Profile
                    </button>
                    <span className="text-sm text-gray-600">
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

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-500 hover:bg-gray-100"
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t px-4 py-4 space-y-3">
          <button
            onClick={() => navigate('/')}
            className="block w-full text-left text-gray-700"
          >
            Home
          </button>
          {currentUser && (
            <button
              onClick={() => navigate('/simulation-hub')}
              className="block w-full text-left text-gray-700"
            >
              Simulation Hub
            </button>
          )}
          <button
            onClick={() => navigate('/about')}
            className="block w-full text-left text-gray-700"
          >
            About
          </button>

          {!currentUser ? (
            <>
              <Button className="w-full" variant="outline" onClick={() => navigate('/login')}>
                Login
              </Button>
              <Button className="w-full" variant="primary" onClick={() => navigate('/signup')}>
                Sign Up
              </Button>
            </>
          ) : (
            <>
              {!isProfilePage && (
                <>
                  <Button className="w-full" variant="primary" onClick={() => navigate('/profile')}>
                    Profile
                  </Button>
                  <p className="text-sm text-center text-gray-600">
                    {currentUser.email}
                  </p>
                </>
              )}
              <Button className="w-full" variant="outline" onClick={handleLogout}>
                Logout
              </Button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
