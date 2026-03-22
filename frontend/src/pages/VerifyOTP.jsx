import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { signOut } from 'firebase/auth';
import { auth } from '../services/firebase';
import api from '../services/api';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';

/**
 * OTP Verification Page
 * Shown after login when the user has 2FA enabled.
 * Expects pendingUser and maskedEmail to be set in AuthContext.
 */
const VerifyOTP = () => {
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [loading, setLoading] = useState(false);
    const [resendCooldown, setResendCooldown] = useState(0);
    const inputRefs = useRef([]);
    const navigate = useNavigate();
    const { pendingUser, maskedEmail, complete2FA } = useAuth();

    // Redirect if no pending 2FA
    useEffect(() => {
        if (!pendingUser) {
            navigate('/login');
        }
    }, [pendingUser, navigate]);

    // Resend cooldown timer
    useEffect(() => {
        if (resendCooldown > 0) {
            const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [resendCooldown]);

    // Auto-focus first input
    useEffect(() => {
        if (inputRefs.current[0]) {
            inputRefs.current[0].focus();
        }
    }, []);

    const handleChange = (index, value) => {
        // Allow only digits
        if (value && !/^\d$/.test(value)) return;

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        // Auto-focus next input
        if (value && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    const handleKeyDown = (index, e) => {
        // On backspace, go to previous input
        if (e.key === 'Backspace' && !otp[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData('text').trim();
        if (/^\d{6}$/.test(pastedData)) {
            const digits = pastedData.split('');
            setOtp(digits);
            inputRefs.current[5]?.focus();
        }
    };

    const handleVerify = async (e) => {
        e.preventDefault();
        const code = otp.join('');

        if (code.length !== 6) {
            toast.error('Please enter the full 6-digit code');
            return;
        }

        setLoading(true);
        try {
            const response = await api.post('/api/auth/2fa/verify-otp', {
                code: code,
                purpose: 'login',
            });

            if (response.data?.success && response.data?.data?.verified) {
                // Complete 2FA — promotes pendingUser to currentUser
                complete2FA();
                toast.success('Verification successful!');
                navigate('/dashboard');
            } else {
                toast.error(response.data?.message || 'Invalid code');
                setOtp(['', '', '', '', '', '']);
                inputRefs.current[0]?.focus();
            }
        } catch (error) {
            const msg = error.response?.data?.message || 'Verification failed. Please try again.';
            toast.error(msg);
            setOtp(['', '', '', '', '', '']);
            inputRefs.current[0]?.focus();
        } finally {
            setLoading(false);
        }
    };

    const handleResend = async () => {
        if (resendCooldown > 0) return;

        try {
            await api.post('/api/auth/2fa/send-otp?purpose=login');
            toast.success('A new code has been sent to your email');
            setResendCooldown(60);
            setOtp(['', '', '', '', '', '']);
            inputRefs.current[0]?.focus();
        } catch (error) {
            const msg = error.response?.data?.message || 'Failed to resend code';
            toast.error(msg);
        }
    };

    const handleCancel = async () => {
        try {
            await signOut(auth);
        } catch { /* expected */ }
        navigate('/login');
    };

    if (!pendingUser) return null;

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
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse_at_center,rgba(0,229,160,0.08)_0%,transparent_70%)]"></div>
                </div>

                <div className="relative w-full max-w-md">
                    <div className="home-dark-card overflow-hidden">
                        {/* Top accent bar */}
                        <div className="h-1 w-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-500"></div>

                        <div className="p-8 sm:p-10">
                            {/* Shield icon */}
                            <div className="mx-auto w-16 h-16 rounded-full bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center mb-6">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>

                            {/* Header */}
                            <div className="text-center mb-8">
                                <h1 className="text-2xl font-extrabold text-white mb-2 tracking-tight">
                                    Two-Step <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Verification</span>
                                </h1>
                                <p className="text-slate-400 text-sm">
                                    We sent a 6-digit code to{' '}
                                    <span className="text-emerald-400 font-medium">{maskedEmail || 'your email'}</span>
                                </p>
                            </div>

                            {/* OTP Input */}
                            <form onSubmit={handleVerify}>
                                <div className="flex justify-center gap-3 mb-8">
                                    {otp.map((digit, index) => (
                                        <input
                                            key={index}
                                            ref={(el) => { inputRefs.current[index] = el; }}
                                            type="text"
                                            inputMode="numeric"
                                            maxLength={1}
                                            value={digit}
                                            onChange={(e) => handleChange(index, e.target.value)}
                                            onKeyDown={(e) => handleKeyDown(index, e)}
                                            onPaste={index === 0 ? handlePaste : undefined}
                                            className="w-12 h-14 text-center text-xl font-bold rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/30 transition-all duration-200"
                                            disabled={loading}
                                        />
                                    ))}
                                </div>

                                {/* Verify Button */}
                                <button
                                    type="submit"
                                    disabled={loading || otp.join('').length !== 6}
                                    className="hero-btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? (
                                        <>
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Verifying...
                                        </>
                                    ) : (
                                        <>
                                            Verify Code
                                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </svg>
                                        </>
                                    )}
                                </button>
                            </form>

                            {/* Resend & Cancel */}
                            <div className="mt-6 text-center space-y-3">
                                <p className="text-sm text-slate-500">
                                    Didn't receive the code?{' '}
                                    <button
                                        onClick={handleResend}
                                        disabled={resendCooldown > 0}
                                        className="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors disabled:text-slate-600 disabled:cursor-not-allowed"
                                    >
                                        {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend Code'}
                                    </button>
                                </p>
                                <button
                                    onClick={handleCancel}
                                    className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
                                >
                                    ← Back to Login
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyOTP;
