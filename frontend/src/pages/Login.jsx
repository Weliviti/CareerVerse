import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, setPersistence, browserLocalPersistence, browserSessionPersistence } from 'firebase/auth';
import { auth } from '../services/firebase';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';

/**
 * Login Page Component — Dark Theme
 */
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { set2FAPending } = useAuth();

  const validateForm = () => {
    const newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length <= 6) {
      newErrors.password = 'Password must be more than 6 characters';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setLoading(true);
    try {
      await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);

      // Check 2FA status from backend
      try {
        const token = await userCredential.user.getIdToken();
        const loginResponse = await api.post('/api/auth/login', { token });
        const loginData = loginResponse.data?.data;

        if (loginData?.two_fa_enabled) {
          // User has 2FA enabled — send OTP and redirect to verification
          try {
            const otpResponse = await api.post('/api/auth/2fa/send-otp?purpose=login');
            const masked = otpResponse.data?.data?.masked_email || 'your email';
            set2FAPending(userCredential.user, masked);
            toast.success('Verification code sent to your email');
            navigate('/verify-otp');
          } catch (otpError) {
            console.error('Failed to send OTP:', otpError);
            toast.error('Failed to send verification code. Please try again.');
          }
          return;
        }
      } catch (loginCheckError) {
        // If backend check fails, proceed without 2FA (graceful degradation)
        console.error('2FA check failed, proceeding:', loginCheckError);
      }

      toast.success('Welcome back!');
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      let errorMessage = 'Invalid credentials';
      if (error.code === 'auth/user-not-found') errorMessage = 'No account found with this email';
      else if (error.code === 'auth/wrong-password') errorMessage = 'Incorrect password';
      else if (error.code === 'auth/too-many-requests') errorMessage = 'Too many failed attempts. Please try again later';
      else if (error.code === 'auth/network-request-failed') errorMessage = 'Network error. Please check your connection';
      toast.error(errorMessage);
    } finally {
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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(0,229,160,0.08)_0%,transparent_70%)]"></div>
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
                  <span className="text-xs font-semibold text-emerald-300 tracking-wide">CareerVerse</span>
                </div>
                <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight">
                  Welcome <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 italic">Back</span>
                </h1>
                <p className="text-slate-400 text-sm">
                  Login to continue your career journey
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Email</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </div>
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500/50 focus:bg-white/8 transition-all duration-200"
                    />
                  </div>
                  {errors.email && <p className="text-red-400 text-xs mt-1.5">{errors.email}</p>}
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1.5">Password</label>
                  <div className="relative">
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={e => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      className="w-full pl-10 pr-10 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-emerald-500/50 focus:bg-white/8 transition-all duration-200"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                    >
                      {showPassword ? (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                      )}
                    </button>
                  </div>
                  {errors.password && <p className="text-red-400 text-xs mt-1.5">{errors.password}</p>}
                </div>

                {/* Remember Me */}
                <div className="flex items-center gap-2">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-white/20 bg-white/5 text-emerald-500 focus:ring-emerald-500/30 cursor-pointer"
                  />
                  <label htmlFor="remember-me" className="text-sm text-slate-400 cursor-pointer select-none">
                    Remember me
                  </label>
                </div>

                {/* Submit Button */}
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
                      Signing In...
                    </>
                  ) : (
                    <>
                      Sign In
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </>
                  )}
                </button>
              </form>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/8"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-3 text-xs text-slate-600 bg-transparent"></span>
                </div>
              </div>

              {/* Footer link */}
              <p className="text-center text-sm text-slate-500">
                Don't have an account?{' '}
                <a
                  href="/signup"
                  className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors"
                >
                  Sign up
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
