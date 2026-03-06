import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import BackToTop from '../components/ui/BackToTop';
import Footer from '../components/Footer';
import api from '../services/api';
import toast from 'react-hot-toast';

const SimulationHub = () => {
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [launching, setLaunching] = useState(false);
    const userName = currentUser?.displayName || currentUser?.email?.split('@')[0] || 'User';

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
                        <div className="home-dark-card group">
                            <div className="p-6 flex items-center justify-between">
                                <div>
                                    <p className="text-slate-400 text-sm font-medium mb-1">Completed</p>
                                    <h3 className="text-3xl font-bold text-white">3</h3>
                                </div>
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <svg className="w-7 h-7 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Avg Score Card */}
                        <div className="home-dark-card group">
                            <div className="p-6 flex items-center justify-between">
                                <div>
                                    <p className="text-slate-400 text-sm font-medium mb-1">Avg Score</p>
                                    <h3 className="text-3xl font-bold text-white">86%</h3>
                                </div>
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <svg className="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Total Time Card */}
                        <div className="home-dark-card group">
                            <div className="p-6 flex items-center justify-between">
                                <div>
                                    <p className="text-slate-400 text-sm font-medium mb-1">Total Time</p>
                                    <h3 className="text-3xl font-bold text-white">57m</h3>
                                </div>
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                                    <svg className="w-7 h-7 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <BackToTop />
            <Footer />
        </div>
    );
};

export default SimulationHub;
