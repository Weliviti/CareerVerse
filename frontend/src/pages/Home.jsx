import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BackToTop from '../components/ui/BackToTop';
import Button from '../components/ui/Button';
import Footer from '../components/Footer';

function Home() {
    const navigate = useNavigate();

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

            {/* Hero Section */}
            <section className="relative overflow-hidden">
                {/* Background decoration — dark radial glows */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[-20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(0,229,160,0.12)_0%,transparent_70%)]"></div>
                    <div className="absolute -top-40 -right-40 w-96 h-96 bg-teal-900/30 rounded-full filter blur-3xl animate-blob"></div>
                    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-emerald-900/20 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
                </div>

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:pt-20 sm:pb-28">
                    <div className="text-center">
                        {/* Badge Pill */}
                        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-emerald-700/40 bg-emerald-950/40 backdrop-blur-sm mb-10">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            <span className="text-sm font-semibold text-emerald-300 tracking-wide">AI-Powered Career Intelligence</span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="hero-heading mb-6">
                            <span className="block text-white">Discover Your</span>
                            <span className="block hero-heading-accent">Dream Career</span>
                        </h1>

                        {/* Description */}
                        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-400 mb-12 leading-relaxed">
                            Experience the future of career exploration with immersive 3D
                            simulations, AI-powered matching, and real-world scenarios that help
                            you find your perfect path.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button onClick={() => { window.scrollTo(0, 0); navigate('/login'); }} className="hero-btn-primary">
                                Launch Experience
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </button>
                            <button className="hero-btn-outline">
                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                                    <path d="M10 8l6 4-6 4V8z" />
                                </svg>
                                Watch Demo
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Mission Section */}
            <section className="py-24 relative overflow-hidden">
                {/* Background glows */}
                <div className="absolute top-10 left-20 w-80 h-80 bg-teal-900/15 rounded-full filter blur-3xl" style={{ animation: 'pulse-glow 5s ease-in-out infinite' }}></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-900/10 rounded-full filter blur-3xl" style={{ animation: 'pulse-glow 6s ease-in-out infinite 2s' }}></div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        {/* Text Content */}
                        <div className="flex-1">
                            <span className="inline-block px-4 py-1.5 rounded-full border border-emerald-700/40 bg-emerald-950/40 text-sm font-semibold text-emerald-300 mb-6">
                                Our Purpose
                            </span>
                            <h2 className="text-3xl sm:text-4xl font-extrabold mb-8 tracking-tight">
                                <span className="text-white">Our </span>
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 italic">Mission</span>
                            </h2>
                            <div className="space-y-6 text-slate-400 text-base sm:text-lg leading-relaxed">
                                <p>
                                    Traditional career assessments rely on self-reported answers to hypothetical
                                    questions. But knowing what you would do and actually doing it are two different
                                    things.
                                </p>
                                <p>
                                    CareerVerse puts you in realistic, AI-powered simulations where your natural
                                    skills shine through. Our advanced AI analyzes how you communicate, solve
                                    problems, and handle stress in real-time scenarios.
                                </p>
                                <p className="text-emerald-400 font-semibold">
                                    The result? Career recommendations based on demonstrated aptitude, not just
                                    preferences.
                                </p>
                            </div>
                        </div>

                        {/* Visual Element */}
                        <div className="flex-1 w-full max-w-lg">
                            <div className="home-dark-card group">
                                <div className="aspect-square p-12 flex flex-col items-center justify-center text-center">
                                    <div className="w-48 h-48 mb-8 text-emerald-400">
                                        <svg
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="1.5"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <path d="M9.5 2C7.84315 2 6.5 3.34315 6.5 5C6.5 6.65685 7.84315 8 9.5 8" />
                                            <path d="M9.5 8V16" />
                                            <path d="M9.5 16C7.84315 16 6.5 17.3431 6.5 19C6.5 20.6569 7.84315 22 9.5 22" />
                                            <path d="M14.5 2C16.1569 2 17.5 3.34315 17.5 5C17.5 6.65685 16.1569 8 14.5 8" />
                                            <path d="M14.5 8V16" />
                                            <path d="M14.5 16C16.1569 16 17.5 17.3431 17.5 19C17.5 20.6569 16.1569 22 14.5 22" />
                                            <path d="M9.5 12H14.5" />
                                            <path d="M6.5 5H4.5C3.39543 5 2.5 5.89543 2.5 7V17C2.5 18.1046 3.39543 19 4.5 19H6.5" />
                                            <path d="M17.5 5H19.5C20.6046 5 21.5 5.89543 21.5 7V17C21.5 18.1046 20.6046 19 19.5 19H17.5" />
                                        </svg>
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-2">AI Powered</h3>
                                    <p className="text-emerald-400 font-semibold text-xl">Career Discovery</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Intelligent Features Section */}
            <section className="py-24 relative overflow-hidden">
                {/* Subtle background glows */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-teal-900/20 rounded-full filter blur-3xl" style={{ animation: 'pulse-glow 4s ease-in-out infinite' }}></div>
                <div className="absolute bottom-10 right-10 w-72 h-72 bg-emerald-900/15 rounded-full filter blur-3xl" style={{ animation: 'pulse-glow 5s ease-in-out infinite 1s' }}></div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-1.5 rounded-full border border-emerald-700/40 bg-emerald-950/40 text-sm font-semibold text-emerald-300 mb-5">
                            Why Choose Us
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
                            Intelligent <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 italic">Features</span>
                        </h2>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                            Cutting-edge technology meets career discovery
                        </p>
                    </div>

                    {/* Asymmetric grid: large left card + 2 stacked right cards */}
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                        {/* Large Feature Card: AI-Powered Career Matching */}
                        <div className="md:col-span-3 home-dark-card group">
                            <div className="p-8 sm:p-10">
                                <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center mb-6">
                                    <svg className="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">AI-Powered Career Matching</h3>
                                <p className="text-slate-400 leading-relaxed mb-6">
                                    Advanced machine learning algorithms analyze thousands of data points including your skills,
                                    interests, personality traits, and market trends to find your perfect career match with 95% accuracy.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1.5 text-xs font-medium bg-white/5 border border-white/10 text-slate-300 rounded-full">Machine Learning</span>
                                    <span className="px-3 py-1.5 text-xs font-medium bg-white/5 border border-white/10 text-slate-300 rounded-full">Big Data</span>
                                    <span className="px-3 py-1.5 text-xs font-medium bg-white/5 border border-white/10 text-slate-300 rounded-full">Predictive Analytics</span>
                                </div>
                            </div>
                        </div>

                        {/* Right column: 2 stacked cards */}
                        <div className="md:col-span-2 flex flex-col gap-6">
                            {/* 3D Simulations Card */}
                            <div className="home-dark-card group flex-1">
                                <div className="p-8">
                                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center mb-5">
                                        <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">3D Simulations</h3>
                                    <p className="text-slate-400 leading-relaxed text-sm">
                                        Experience careers through immersive Unity-powered 3D environments.
                                    </p>
                                </div>
                            </div>

                            {/* Real-Time Analytics Card */}
                            <div className="home-dark-card group flex-1">
                                <div className="p-8">
                                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center mb-5">
                                        <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-2">Real-Time Analytics</h3>
                                    <p className="text-slate-400 leading-relaxed text-sm">
                                        Track your progress with detailed insights and personalized recommendations.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Immersive Simulations Section — slightly deeper background for contrast */}
            <section className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(5,15,10,0.5) 30%, rgba(5,15,10,0.5) 70%, transparent 100%)' }}>
                {/* Glows positioned differently from the Features section */}
                <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-emerald-900/15 rounded-full filter blur-3xl" style={{ animation: 'pulse-glow 6s ease-in-out infinite' }}></div>
                <div className="absolute top-10 right-10 w-72 h-72 bg-teal-900/10 rounded-full filter blur-3xl" style={{ animation: 'pulse-glow 5s ease-in-out infinite 2s' }}></div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-1.5 rounded-full border border-emerald-700/40 bg-emerald-950/40 text-sm font-semibold text-emerald-300 mb-5">
                            Experience Careers
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold mb-4 tracking-tight">
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 italic">Immersive</span>
                            <span className="text-white"> Simulations</span>
                        </h2>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                            Try before you commit - experience real career scenarios
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                        {/* The Educator */}
                        <div className="home-dark-card group flex flex-col">
                            <div className="p-7 flex-1 flex flex-col">
                                <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center mb-5">
                                    <svg className="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">The Educator</h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-1">
                                    Step into a virtual classroom. Teach students, manage lessons, and inspire the next generation.
                                </p>
                                <div className="flex flex-wrap gap-2 mb-5">
                                    <span className="px-2.5 py-1 text-xs font-medium bg-white/5 border border-white/10 text-slate-300 rounded-full">Communication</span>
                                    <span className="px-2.5 py-1 text-xs font-medium bg-white/5 border border-white/10 text-slate-300 rounded-full">Empathy</span>
                                    <span className="px-2.5 py-1 text-xs font-medium bg-white/5 border border-white/10 text-slate-300 rounded-full">Leadership</span>
                                </div>
                                <div className="flex items-center justify-between text-xs text-slate-500 mb-5">
                                    <span className="flex items-center gap-1">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        20 min
                                    </span>
                                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 font-semibold">Medium</span>
                                </div>
                                <button onClick={() => { window.scrollTo(0, 0); navigate('/login'); }} className="home-dark-sim-btn">
                                    Try Simulation
                                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </button>
                            </div>
                        </div>

                        {/* The Tech Innovator */}
                        <div className="home-dark-card group flex flex-col">
                            <div className="p-7 flex-1 flex flex-col">
                                <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center mb-5">
                                    <svg className="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">The Tech Innovator</h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-1">
                                    Build the future in a high-tech lab. Code, debug, and create innovative solutions.
                                </p>
                                <div className="flex flex-wrap gap-2 mb-5">
                                    <span className="px-2.5 py-1 text-xs font-medium bg-white/5 border border-white/10 text-slate-300 rounded-full">Problem-Solving</span>
                                    <span className="px-2.5 py-1 text-xs font-medium bg-white/5 border border-white/10 text-slate-300 rounded-full">Creativity</span>
                                    <span className="px-2.5 py-1 text-xs font-medium bg-white/5 border border-white/10 text-slate-300 rounded-full">Logic</span>
                                </div>
                                <div className="flex items-center justify-between text-xs text-slate-500 mb-5">
                                    <span className="flex items-center gap-1">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        25 min
                                    </span>
                                    <span className="px-2 py-0.5 rounded-full bg-yellow-500/15 text-yellow-400 font-semibold">Hard</span>
                                </div>
                                <button onClick={() => { window.scrollTo(0, 0); navigate('/login'); }} className="home-dark-sim-btn">
                                    Try Simulation
                                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </button>
                            </div>
                        </div>

                        {/* The Healthcare Hero */}
                        <div className="home-dark-card group flex flex-col">
                            <div className="p-7 flex-1 flex flex-col">
                                <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center mb-5">
                                    <svg className="w-7 h-7 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">The Healthcare Hero</h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-5 flex-1">
                                    Save lives in a realistic medical environment. Diagnose, treat, and care for patients.
                                </p>
                                <div className="flex flex-wrap gap-2 mb-5">
                                    <span className="px-2.5 py-1 text-xs font-medium bg-white/5 border border-white/10 text-slate-300 rounded-full">Analysis</span>
                                    <span className="px-2.5 py-1 text-xs font-medium bg-white/5 border border-white/10 text-slate-300 rounded-full">Precision</span>
                                    <span className="px-2.5 py-1 text-xs font-medium bg-white/5 border border-white/10 text-slate-300 rounded-full">Compassion</span>
                                </div>
                                <div className="flex items-center justify-between text-xs text-slate-500 mb-5">
                                    <span className="flex items-center gap-1">
                                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                        30 min
                                    </span>
                                    <span className="px-2 py-0.5 rounded-full bg-red-500/15 text-red-400 font-semibold">Expert</span>
                                </div>
                                <button onClick={() => { window.scrollTo(0, 0); navigate('/login'); }} className="home-dark-sim-btn">
                                    Try Simulation
                                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Built for Success — Stats Section */}
            <section className="py-20 relative overflow-hidden">
                <div className="absolute top-0 right-1/4 w-80 h-80 bg-emerald-900/10 rounded-full filter blur-3xl" style={{ animation: 'pulse-glow 5s ease-in-out infinite 1s' }}></div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
                            Built for <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 italic">Success</span>
                        </h2>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                        {/* Stat 1 */}
                        <div className="home-dark-card p-6 text-center sm:text-left">
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center mb-3 mx-auto sm:mx-0">
                                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                </svg>
                            </div>
                            <div className="text-2xl sm:text-3xl font-bold text-emerald-400 mb-1">50K+</div>
                            <div className="text-xs sm:text-sm text-slate-500">Students Guided</div>
                        </div>
                        {/* Stat 2 */}
                        <div className="home-dark-card p-6 text-center sm:text-left">
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center mb-3 mx-auto sm:mx-0">
                                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <div className="text-2xl sm:text-3xl font-bold text-emerald-400 mb-1">200+</div>
                            <div className="text-xs sm:text-sm text-slate-500">Career Paths</div>
                        </div>
                        {/* Stat 3 */}
                        <div className="home-dark-card p-6 text-center sm:text-left">
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center mb-3 mx-auto sm:mx-0">
                                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <div className="text-2xl sm:text-3xl font-bold text-emerald-400 mb-1">95%</div>
                            <div className="text-xs sm:text-sm text-slate-500">Satisfaction</div>
                        </div>
                        {/* Stat 4 */}
                        <div className="home-dark-card p-6 text-center sm:text-left">
                            <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center mb-3 mx-auto sm:mx-0">
                                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                </svg>
                            </div>
                            <div className="text-2xl sm:text-3xl font-bold text-emerald-400 mb-1">4.9/5</div>
                            <div className="text-xs sm:text-sm text-slate-500">Average Rating</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section — Bold teal gradient for visual break */}
            <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #064e3b 0%, #0d9488 50%, #065f46 100%)' }}>
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3 w-96 h-96 bg-white opacity-5 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 transform -translate-x-1/3 translate-y-1/3 w-96 h-96 bg-emerald-900 opacity-20 rounded-full blur-3xl"></div>
                </div>

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl sm:text-5xl font-bold text-white mb-6">
                        Ready to Find <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-teal-100 italic">Your Path?</span>
                    </h2>
                    <p className="text-lg text-emerald-100/70 mb-10 max-w-2xl mx-auto">
                        Join thousands of students discovering their dream careers through immersive experiences
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <button
                            onClick={() => { window.scrollTo(0, 0); navigate('/signup'); }}
                            className="hero-btn-primary"
                            style={{ background: 'linear-gradient(135deg, #00e5a0, #00c98d)', boxShadow: '0 4px 20px rgba(0,229,160,0.3)' }}
                        >
                            Start Your Journey
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
                        <button
                            onClick={() => { window.scrollTo(0, 0); navigate('/about'); }}
                            className="hero-btn-outline"
                            style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', borderColor: 'rgba(255,255,255,0.25)' }}
                        >
                            Meet the Team
                        </button>
                    </div>
                </div>
            </section>

            <BackToTop />
            <Footer />
        </div>
    );
}

export default Home;