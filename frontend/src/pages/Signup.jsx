import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../services/firebase';
import Navbar from '../components/Navbar';
import PasswordStrength from '../components/PasswordStrength';

/* ── Icon SVGs ── */
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

const CalendarIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
);

const GraduationIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422" />
  </svg>
);

const LanguageIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
  </svg>
);

const ArrowRightIcon = () => (
  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
);

/* ── Reusable dark input field ── */
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

/* ── Select dropdown field ── */
const SelectField = ({ label, name, value, icon, error, options, placeholder, onChange }) => (
  <div>
    <label className="block text-sm font-medium text-slate-300 mb-1.5">{label}</label>
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">{icon}</div>
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="signup-select w-full pl-10 pr-10 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-500/50 transition-all duration-200 appearance-none cursor-pointer"
      >
        <option value="" disabled>{placeholder}</option>
        {options.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
    {error && <p className="text-red-400 text-xs mt-1.5">{error}</p>}
  </div>
);

/* ── Constants ── */
const EDUCATION_OPTIONS = [
  { value: 'high_school', label: 'High School' },
  { value: 'undergraduate', label: 'Undergraduate' },
  { value: 'graduate', label: 'Graduate' },
  { value: 'postgraduate', label: 'Postgraduate' },
];

const LANGUAGE_OPTIONS = [
  { value: 'en', label: 'English' },
  { value: 'si', label: 'Sinhala' },
  { value: 'ta', label: 'Tamil' },
];

const CAREER_OPTIONS = [
  'Teaching',
  'Medicine',
  'Law',
  'Engineering',
  'Business',
  'Other',
];

/* ── Step Indicator ── */
const StepIndicator = ({ currentStep }) => (
  <div className="signup-step-indicator">
    {/* Step 1 circle */}
    <div className={`signup-step-circle ${currentStep > 1 ? 'signup-step-done' : 'signup-step-active'}`}>
      {currentStep > 1 ? <CheckIcon /> : <span>1</span>}
    </div>

    {/* Line */}
    <div className={`signup-step-line ${currentStep > 1 ? 'signup-step-line-done' : ''}`} />

    {/* Step 2 circle */}
    <div className={`signup-step-circle ${currentStep === 2 ? 'signup-step-active' : 'signup-step-inactive'}`}>
      <span>2</span>
    </div>

    {/* Labels */}
    <span className={`signup-step-label signup-step-label-1 ${currentStep >= 1 ? 'text-emerald-400' : 'text-slate-500'}`}>
      Account
    </span>
    <span className={`signup-step-label signup-step-label-2 ${currentStep === 2 ? 'text-emerald-400' : 'text-slate-500'}`}>
      Profile
    </span>
  </div>
);

/* ════════════════════════════════════════════
   Main Signup Component
   ════════════════════════════════════════════ */
const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    dateOfBirth: '',
    educationLevel: '',
    language: '',
    careerInterests: [],
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const toggleInterest = (interest) => {
    setFormData(prev => {
      const current = prev.careerInterests;
      const updated = current.includes(interest)
        ? current.filter(i => i !== interest)
        : [...current, interest];
      return { ...prev, careerInterests: updated };
    });
    if (errors.careerInterests) setErrors(prev => ({ ...prev, careerInterests: '' }));
  };

  /* ── Validation ── */
  const validateStep1 = () => {
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

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of birth is required';
    if (!formData.educationLevel) newErrors.educationLevel = 'Education level is required';
    if (!formData.language) newErrors.language = 'Language preference is required';
    if (formData.careerInterests.length === 0) newErrors.careerInterests = 'Select at least one career interest';
    return newErrors;
  };

  const handleNext = () => {
    const stepErrors = validateStep1();
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setErrors({});
    setStep(2);
  };

  const handleBack = () => {
    setErrors({});
    setStep(1);
  };

  /* ── Submit ── */
  const handleSignup = async (e) => {
    e.preventDefault();
    if (step === 1) {
      handleNext();
      return;
    }

    setLoading(true);
    setErrors({});
    const stepErrors = validateStep2();
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
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
        dateOfBirth: formData.dateOfBirth,
        educationLevel: formData.educationLevel,
        language: formData.language,
        careerInterests: formData.careerInterests,
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
      {/* Parallax glow orbs */}
      <div className="home-parallax-orbs">
        <div className="parallax-orb parallax-orb-1"></div>
        <div className="parallax-orb parallax-orb-2"></div>
        <div className="parallax-orb parallax-orb-3"></div>
      </div>

      {/* Floating particles */}
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
              <div className="text-center mb-6">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-700/40 bg-emerald-950/40 mb-5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  <span className="text-xs font-semibold text-emerald-300 tracking-wide">Join CareerVerse</span>
                </div>
                <h1 className="text-3xl font-extrabold text-white mb-2 tracking-tight">
                  Create Your{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 italic">Account</span>
                </h1>
                <p className="text-slate-400 text-sm">
                  {step === 1
                    ? 'Set up your credentials to get started'
                    : 'Tell us a bit about yourself'}
                </p>
              </div>

              {/* Step Indicator */}
              <StepIndicator currentStep={step} />

              {/* Form */}
              <form onSubmit={handleSignup} className="space-y-4 mt-6">
                {errors.submit && (
                  <div className="p-3 bg-red-500/10 text-red-400 text-sm rounded-xl border border-red-500/20">
                    {errors.submit}
                  </div>
                )}

                {/* ── Step 1: Credentials ── */}
                {step === 1 && (
                  <div className="signup-step-content space-y-4">
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

                    <button
                      type="button"
                      onClick={handleNext}
                      className="hero-btn-primary w-full mt-2"
                    >
                      Continue
                      <ArrowRightIcon />
                    </button>
                  </div>
                )}

                {/* ── Step 2: Profile Details ── */}
                {step === 2 && (
                  <div className="signup-step-content space-y-4">
                    {/* Date of Birth */}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-1.5">Date of Birth</label>
                      <div className="relative">
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"><CalendarIcon /></div>
                        <input
                          name="dateOfBirth"
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={handleChange}
                          className="w-full pl-10 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:outline-none focus:border-emerald-500/50 transition-all duration-200 signup-date-input"
                        />
                      </div>
                      {errors.dateOfBirth && <p className="text-red-400 text-xs mt-1.5">{errors.dateOfBirth}</p>}
                    </div>

                    {/* Education Level */}
                    <SelectField
                      label="Education Level"
                      name="educationLevel"
                      value={formData.educationLevel}
                      icon={<GraduationIcon />}
                      error={errors.educationLevel}
                      placeholder="Select your education level"
                      options={EDUCATION_OPTIONS}
                      onChange={handleChange}
                    />

                    {/* Language */}
                    <SelectField
                      label="Language Preference"
                      name="language"
                      value={formData.language}
                      icon={<LanguageIcon />}
                      error={errors.language}
                      placeholder="Select your preferred language"
                      options={LANGUAGE_OPTIONS}
                      onChange={handleChange}
                    />

                    {/* Career Interests */}
                    <div>
                      <label className="block text-sm font-medium text-slate-300 mb-2">Career Interests</label>
                      <div className="flex flex-wrap gap-2">
                        {CAREER_OPTIONS.map(interest => (
                          <button
                            type="button"
                            key={interest}
                            onClick={() => toggleInterest(interest)}
                            className={`signup-chip ${formData.careerInterests.includes(interest) ? 'signup-chip-selected' : ''}`}
                          >
                            {interest}
                          </button>
                        ))}
                      </div>
                      {errors.careerInterests && <p className="text-red-400 text-xs mt-1.5">{errors.careerInterests}</p>}
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-3 mt-2">
                      <button
                        type="button"
                        onClick={handleBack}
                        className="signup-back-btn flex-1"
                      >
                        <ArrowLeftIcon />
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="hero-btn-primary flex-[2] disabled:opacity-50 disabled:cursor-not-allowed"
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
                            <ArrowRightIcon />
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
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
