import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../services/firebase';
import Navbar from '../components/Navbar';
import PasswordStrength from '../components/PasswordStrength';

// Icon components
const UserIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const EmailIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const LockIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);
// Reusable dark input field — defined OUTSIDE Signup to avoid
// re-creating the component type on every render (which kills focus).
const Field = ({ label, name, type, placeholder, value, icon, error, toggle, showVal, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-slate-300 mb-1.5">{label}</label>
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">{icon}</div>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500/50 transition-all duration-200"
      />
      {toggle && (
        <button type="button" onClick={toggle} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors">
          {showVal ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
          )}
        </button>
      )}
    </div>
    {error && <p className="text-red-400 text-xs mt-1.5">{error}</p>}
  </div>
);

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ fullName: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full Name is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!emailRegex.test(formData.email)) newErrors.email = 'Please enter a valid email address';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    return newErrors;
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setLoading(false);
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;
      await updateProfile(user, { displayName: formData.fullName });
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        name: formData.fullName,
        role: 'user',
        createdAt: serverTimestamp(),
      });
      navigate('/dashboard');
    } catch (error) {
      console.error('Signup Error:', error);
      let errorMessage = 'An error occurred during signup. Please try again.';
      if (error.code === 'auth/email-already-in-use') errorMessage = 'This email is already in use.';
      else if (error.code === 'auth/weak-password') errorMessage = 'The password is too weak.';
      else if (error.message) errorMessage = error.message;
      setErrors({ submit: errorMessage });
      setLoading(false);
    }
  };

  return (
    <div className="home-dark min-h-screen">
      {/* ── Parallax glow orbs ── */}
      <div className="home-parallax-orbs">
        <div className="parallax-orb parallax-orb-1"></div>
        <div className="parallax-orb parallax-orb-2"></div>
        <div className="parallax-orb parallax-orb-3"></div>
      </div>

      {/* ── Floating particles ── */}
      <div className="home-particles">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
        <div className="particle particle-5"></div>
        <div className="particle particle-6"></div>
      </div>

      <Navbar />

      <div className="relative flex items-center justify-center min-h-[calc(100vh-80px)] px-4 py-16">
        {/* Background radial glow */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(0,229,160,0.07)_0%,transparent_70%)]"></div>
        </div>

        <div className="relative w-full max-w-md">
          {/* Card */}
          <div className="home-dark-card overflow-hidden">
            {/* Top accent bar */}
            <div className="h-1 w-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500"></div>

            <div className="p-8 sm:p-10">
              {/* Header */}
              <div className="text-center mb-8">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-700/40 bg-emerald-950/40 mb-5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-xs font-semibold text-emerald-300 tracking-wide">Join CareerVerse</span>
                </div>
                <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight">
                  Create Your{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 italic">Account</span>
                </h1>
                <p className="text-slate-400 text-sm">Discover your perfect career path through AI</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSignup} className="space-y-4">
                {errors.submit && (
                  <div className="p-3 bg-red-500/10 text-red-400 text-sm rounded-xl border border-red-500/20">
                    {errors.submit}
                  </div>
                )}

                <Field
                  label="Full Name"
                  name="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  icon={<UserIcon />}
                  error={errors.fullName}
                  onChange={handleChange}
                />

                <Field
                  label="Email Address"
                  name="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  icon={<EmailIcon />}
                  error={errors.email}
                  onChange={handleChange}
                />

                <Field
                  label="Password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a password"
                  value={formData.password}
                  icon={<LockIcon />}
                  error={errors.password}
                  toggle={() => setShowPassword(!showPassword)}
                  showVal={showPassword}
                  onChange={handleChange}
                />

                {/* Password strength indicator */}
                <PasswordStrength password={formData.password} />

                <Field
                  label="Confirm Password"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  icon={<LockIcon />}
                  error={errors.confirmPassword}
                  toggle={() => setShowConfirmPassword(!showConfirmPassword)}
                  showVal={showConfirmPassword}
                  onChange={handleChange}
                />

                {/* Submit */}
                <button
                  type="submit"
                  disabled={loading}
                  className="hero-btn-primary w-full mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Creating Account...
                    </>
                  ) : (
                    <>
                      Create Account
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </>
                  )}
                </button>
              </form>

              {/* Footer link */}
              <p className="text-center text-sm text-slate-500 mt-6">
                Already have an account?{' '}
                <Link
                  to="/login"
                  className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
