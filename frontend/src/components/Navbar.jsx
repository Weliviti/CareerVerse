import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser } = useAuth();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-full sticky top-0 z-50 overflow-hidden">
      {/* Glassmorphism navbar background */}
      <div className="navbar-glass">
        <div className="max-w-5xl mx-auto px-8">
          <div className="flex items-center justify-between h-[72px]">

            {/* Logo */}
            <div
              className="flex items-center cursor-pointer shrink-0 group"
              onClick={() => navigate('/')}
            >
              <span className="navbar-logo">
                Career<span className="navbar-logo-accent">Verse</span>
              </span>
            </div>

            {/* Center Nav Links — Desktop */}
            <div className="hidden md:flex items-center gap-1">
              {currentUser ? (
                <>
                  <button
                    onClick={() => navigate('/simulation-hub')}
                    className={`navbar-link ${isActive('/simulation-hub') ? 'navbar-link-active' : ''}`}
                  >
                    <span className="navbar-link-text">Simulation Hub</span>
                  </button>
                  <button
                    onClick={() => navigate('/dashboard')}
                    className={`navbar-link ${isActive('/dashboard') ? 'navbar-link-active' : ''}`}
                  >
                    <span className="navbar-link-text">Dashboard</span>
                  </button>
                  <button
                    onClick={() => navigate('/about')}
                    className={`navbar-link ${isActive('/about') ? 'navbar-link-active' : ''}`}
                  >
                    <span className="navbar-link-text">About</span>
                  </button>
                  <button
                    onClick={() => navigate('/our-team')}
                    className={`navbar-link ${isActive('/our-team') ? 'navbar-link-active' : ''}`}
                  >
                    <span className="navbar-link-text">Our Team</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate('/')}
                    className={`navbar-link ${isActive('/') ? 'navbar-link-active' : ''}`}
                  >
                    <span className="navbar-link-text">Home</span>
                  </button>
                  <button
                    onClick={() => navigate('/about')}
                    className={`navbar-link ${isActive('/about') ? 'navbar-link-active' : ''}`}
                  >
                    <span className="navbar-link-text">About</span>
                  </button>
                  <button
                    onClick={() => navigate('/community')}
                    className={`navbar-link ${isActive('/community') ? 'navbar-link-active' : ''}`}
                  >
                    <span className="navbar-link-text">Community</span>
                  </button>
                </>
              )}
            </div>

            {/* Right Side — Desktop */}
            <div className="hidden md:flex items-center gap-4 shrink-0">
              {!currentUser ? (
                <>
                  <button className="navbar-icon-btn" aria-label="Toggle theme">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => navigate('/login')}
                    className="navbar-login-btn"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => navigate('/signup')}
                    className="navbar-signup-btn"
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => navigate('/profile')}
                    className={`navbar-link flex items-center gap-2 ${isActive('/profile') ? 'navbar-link-active' : ''}`}
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <span className="navbar-link-text">Profile</span>
                  </button>
                  <button
                    onClick={handleLogout}
                    className="navbar-signout-btn"
                  >
                    Sign Out
                  </button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="navbar-icon-btn text-lg"
              >
                {isMenuOpen ? '✕' : '☰'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Curved bottom edge */}
      <div className="navbar-curve"></div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md border-t shadow-xl px-6 py-5 space-y-1">
          {currentUser ? (
            <>
              <button onClick={() => { navigate('/simulation-hub'); setIsMenuOpen(false); }} className="navbar-mobile-link">
                Simulation Hub
              </button>
              <button onClick={() => { navigate('/dashboard'); setIsMenuOpen(false); }} className="navbar-mobile-link">
                Dashboard
              </button>
              <button onClick={() => { navigate('/about'); setIsMenuOpen(false); }} className="navbar-mobile-link">
                About
              </button>
              <button onClick={() => { navigate('/community'); setIsMenuOpen(false); }} className="navbar-mobile-link">
                Community
              </button>
              <button onClick={() => { navigate('/profile'); setIsMenuOpen(false); }} className="navbar-mobile-link">
                Profile
              </button>
              <div className="pt-2 border-t border-gray-100 mt-2">
                <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="navbar-mobile-link text-red-500">
                  Sign Out
                </button>
              </div>
            </>
          ) : (
            <>
              <button onClick={() => { navigate('/'); setIsMenuOpen(false); }} className="navbar-mobile-link">
                Home
              </button>
              <button onClick={() => { navigate('/about'); setIsMenuOpen(false); }} className="navbar-mobile-link">
                About
              </button>
              <button onClick={() => { navigate('/community'); setIsMenuOpen(false); }} className="navbar-mobile-link">
                Community
              </button>
              <div className="pt-3 space-y-2 border-t border-gray-100 mt-2">
                <button onClick={() => { navigate('/login'); setIsMenuOpen(false); }} className="navbar-mobile-link">
                  Login
                </button>
                <button onClick={() => { navigate('/signup'); setIsMenuOpen(false); }} className="block w-full navbar-signup-btn text-center">
                  Sign Up
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
