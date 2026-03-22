import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { db } from '../services/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Navbar from '../components/Navbar';
import BackToTop from '../components/ui/BackToTop';
import Footer from '../components/Footer';
import api from '../services/api';
import toast from 'react-hot-toast';

const SimulationHub = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [launching, setLaunching] = useState(false);
    const [userName, setUserName] = useState(currentUser?.displayName || currentUser?.email?.split('@')[0] || 'User');

    useEffect(() => {
        const fetchUserData = async () => {
            if (currentUser?.uid) {
                try {
                    const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
                    if (userDoc.exists() && userDoc.data().name) {
                        setUserName(userDoc.data().name);
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            }
        };

        fetchUserData();
    }, [currentUser]);

    const handleLaunch = async (simulationType) => {
        if (launching) return;

        setLaunching(true);
        const toastId = toast.loading(`Preparing ${simulationType} simulation...`);

        try {
            // Mapping frontend types to backend expected types
            // Backend expects: 'doctor', 'teacher', or 'lawyer'
            const backendType = simulationType === 'educator' ? 'teacher' : 'doctor';

            const response = await api.post('/api/simulations/launch', {
                simulation_type: backendType
            });

            if (response.data.success) {
                toast.success('Simulation ready!', { id: toastId });

                // Navigate in same tab so localStorage and auth context are shared
                navigate(`/simulation/play/${simulationType}`);
            } else {
                throw new Error(response.data.message || 'Failed to launch simulation');
            }
        } catch (error) {
            console.error('Launch Error:', error);
            const errorMessage = error.response?.data?.message || error.message || 'Failed to start simulation';
            toast.error(errorMessage, { id: toastId });
            setLaunching(false);
        }
    };

    return (
        <div className="home-dark min-h-screen">
            {/* ── Parallax glow orbs (fixed, scroll depth) ── */}
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
                <div className="particle particle-7"></div>
                <div className="particle particle-8"></div>
            </div>

            <Navbar />

            {/* Hero / Welcome Section */}
            <section className="relative overflow-hidden">
                {/* Background decoration — dark radial glows */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(0,229,160,0.12)_0%,transparent_70%)]"></div>
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-teal-900/30 rounded-full filter blur-3xl animate-blob"></div>
                    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-900/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
                </div>

                <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 sm:pt-20 sm:pb-16">
                    <div className="text-center">
                        {/* Badge Pill */}
                        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-emerald-700/40 bg-emerald-950/40 backdrop-blur-sm mb-8">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            <span className="text-sm font-semibold text-emerald-300 tracking-wide">Simulation Hub</span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight">
                            <span className="text-white">Welcome back, </span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 italic">{userName}</span>
                        </h1>

                        {/* Description */}
                        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-400 leading-relaxed">
                            Choose a simulation to discover your natural career aptitude through
                            immersive AI-powered scenarios.
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="relative overflow-hidden pb-8">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Completed Card */}
                        <div className="home-dark-stat-card group">
                            <div className="stat-card-inner p-6 flex items-center justify-between">
                                <div>
                                    <p className="text-slate-400 text-sm font-medium mb-1">Completed</p>
                                    <h3 className="text-3xl font-bold text-white">3</h3>
                                </div>
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center transition-transform duration-300">
                                    <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Avg Score Card */}
                        <div className="home-dark-stat-card group">
                            <div className="stat-card-inner p-6 flex items-center justify-between">
                                <div>
                                    <p className="text-slate-400 text-sm font-medium mb-1">Avg Score</p>
                                    <h3 className="text-3xl font-bold text-white">86%</h3>
                                </div>
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center transition-transform duration-300">
                                    <svg className="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Total Time Card */}
                        <div className="home-dark-stat-card group">
                            <div className="stat-card-inner p-6 flex items-center justify-between">
                                <div>
                                    <p className="text-slate-400 text-sm font-medium mb-1">Total Time</p>
                                    <h3 className="text-3xl font-bold text-white">57m</h3>
                                </div>
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-center transition-transform duration-300">
                                    <svg className="w-7 h-7 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Available Simulations Section */}
            <section className="py-16 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(5,15,10,0.3) 50%, transparent 100%)' }}>
                <div className="absolute top-20 right-10 w-64 h-64 bg-teal-900/15 rounded-full filter blur-3xl" style={{ animation: 'pulse-glow 5s ease-in-out infinite' }}></div>
                <div className="absolute bottom-10 left-10 w-64 h-64 bg-emerald-900/15 rounded-full filter blur-3xl" style={{ animation: 'pulse-glow 6s ease-in-out infinite 1s' }}></div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <span className="inline-block px-4 py-1.5 rounded-full border border-emerald-700/40 bg-emerald-950/40 text-sm font-semibold text-emerald-300 mb-5">
                            Choose Your Path
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight">
                            <span className="text-white">Available </span>
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 italic">Simulations</span>
                        </h2>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                            Step into realistic career scenarios and discover where your skills shine
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* The Educator */}
                        <div className="home-dark-card group flex flex-col">
                            <div className="p-8 flex-1 flex flex-col">
                                <div className="w-14 h-14 rounded-2xl bg-blue-500/15 border border-blue-500/20 flex items-center justify-center mb-6">
                                    <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" />
                                        <path d="M6 12v5c3 3 9 3 12 0v-5" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">The Educator</h3>
                                <p className="text-emerald-400 font-medium text-sm mb-3">Teach a 10th Grade English Class</p>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">
                                    Guide students through a lesson on Shakespeare's Romeo and Juliet. Handle classroom dynamics, answer questions, and inspire learning.
                                </p>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    <span className="px-2.5 py-1 text-xs font-medium bg-white/5 border border-white/10 text-slate-300 rounded-full">Empathy</span>
                                    <span className="px-2.5 py-1 text-xs font-medium bg-white/5 border border-white/10 text-slate-300 rounded-full">Clarity</span>
                                    <span className="px-2.5 py-1 text-xs font-medium bg-white/5 border border-white/10 text-slate-300 rounded-full">Classroom Control</span>
                                </div>
                                <div className="flex items-center justify-between text-xs text-slate-500 mb-6">
                                    <span className="flex items-center gap-1">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        20 minutes
                                    </span>
                                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-semibold">Medium</span>
                                </div>
                                <button
                                    onClick={() => handleLaunch('educator')}
                                    disabled={launching}
                                    className={`home-dark-sim-btn ${launching ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    <svg className="w-5 h-5 fill-current mr-2" viewBox="0 0 20 20">
                                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.333-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                    </svg>
                                    {launching ? 'Launching...' : 'Launch Simulation'}
                                </button>
                            </div>
                        </div>

                        {/* The Diagnostician */}
                        <div className="home-dark-card group flex flex-col">
                            <div className="p-8 flex-1 flex flex-col">
                                <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center mb-6">
                                    <svg className="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">The Diagnostician</h3>
                                <p className="text-emerald-400 font-medium text-sm mb-3">Diagnose a Complex Medical Case</p>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">
                                    Interview a patient, analyze symptoms, order tests, and reach a diagnosis. Balance empathy with analytical thinking under pressure.
                                </p>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    <span className="px-2.5 py-1 text-xs font-medium bg-white/5 border border-white/10 text-slate-300 rounded-full">Diagnostic Logic</span>
                                    <span className="px-2.5 py-1 text-xs font-medium bg-white/5 border border-white/10 text-slate-300 rounded-full">Empathy</span>
                                    <span className="px-2.5 py-1 text-xs font-medium bg-white/5 border border-white/10 text-slate-300 rounded-full">Communication</span>
                                </div>
                                <div className="flex items-center justify-between text-xs text-slate-500 mb-6">
                                    <span className="flex items-center gap-1">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        20 minutes
                                    </span>
                                    <span className="px-2 py-0.5 rounded-full bg-red-500/15 text-red-400 font-semibold">Hard</span>
                                </div>
                                <button
                                    onClick={() => handleLaunch('diagnostician')}
                                    disabled={launching}
                                    className={`home-dark-sim-btn ${launching ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    <svg className="w-5 h-5 fill-current mr-2" viewBox="0 0 20 20">
                                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.333-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                    </svg>
                                    {launching ? 'Launching...' : 'Launch Simulation'}
                                </button>
                            </div>
                        </div>

                        {/* The Judge */}
                        <div className="home-dark-card group flex flex-col">
                            <div className="p-8 flex-1 flex flex-col">
                                <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center mb-6">
                                    <svg className="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">The Judge</h3>
                                <p className="text-emerald-400 font-medium text-sm mb-3">Solve a serious mystry case</p>
                                <p className="text-slate-400 text-sm leading-relaxed mb-6 flex-1">
                                    Interview a suspect, analyze evidence, and make a ruling. Balance justice with mercy and legal expertise.
                                </p>
                                <div className="flex flex-wrap gap-2 mb-6">
                                    <span className="px-2.5 py-1 text-xs font-medium bg-white/5 border border-white/10 text-slate-300 rounded-full">Logical Reasoning</span>
                                    <span className="px-2.5 py-1 text-xs font-medium bg-white/5 border border-white/10 text-slate-300 rounded-full">Empathy</span>
                                    <span className="px-2.5 py-1 text-xs font-medium bg-white/5 border border-white/10 text-slate-300 rounded-full">Communication</span>
                                </div>
                                <div className="flex items-center justify-between text-xs text-slate-500 mb-6">
                                    <span className="flex items-center gap-1">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        20 minutes
                                    </span>
                                    <span className="px-2 py-0.5 rounded-full bg-red-500/15 text-red-400 font-semibold">Hard</span>
                                </div>
                                <button
                                    onClick={() => handleLaunch('judge')}
                                    disabled={launching}
                                    className={`home-dark-sim-btn ${launching ? 'opacity-50 cursor-not-allowed' : ''}`}
                                >
                                    <svg className="w-5 h-5 fill-current mr-2" viewBox="0 0 20 20">
                                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.333-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                    </svg>
                                    {launching ? 'Launching...' : 'Launch Simulation'}
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

            {/* CTA Banner Section — Bold teal gradient */}
            <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #064e3b 0%, #0d9488 50%, #065f46 100%)' }}>
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 transform -translate-x-1/3 translate-y-1/3 w-96 h-96 bg-emerald-900 opacity-20 rounded-full blur-3xl"></div>
                </div>

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                        Complete All <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-teal-100 italic">Simulations</span>
                    </h2>
                    <p className="text-lg text-emerald-100/70 mb-10 max-w-2xl mx-auto">
                        Get comprehensive career recommendations by completing all simulation paths
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={() => { window.scrollTo(0, 0); navigate('/dashboard'); }}
                            className="hero-btn-primary"
                            style={{ background: 'linear-gradient(135deg, #00e5a0, #00c98d)', boxShadow: '0 4px 20px rgba(0,229,160,0.3)' }}
                        >
                            View Dashboard
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
                        <button
                            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                            className="hero-btn-outline"
                            style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', borderColor: 'rgba(255,255,255,0.25)' }}
                        >
                            Try Another Simulation
                        </button>
                    </div>
                </div>
            </section>

            <BackToTop />
            <Footer />
        </div>
    );
};

export default SimulationHub;
