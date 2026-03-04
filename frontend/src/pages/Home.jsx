import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BackToTop from '../components/ui/BackToTop';
import Button from '../components/ui/Button';
import Footer from '../components/Footer';

function Home() {
    const navigate = useNavigate();

    return (
        <div className="home-dark min-h-screen">
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

            {/* Career Paths Section */}
            <section className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #f5f3ff 0%, #f0fdfa 50%, #ffffff 100%)' }}>
                <div className="absolute top-10 right-20 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl" style={{ animation: 'pulse-glow 5s ease-in-out infinite' }}></div>
                <div className="absolute bottom-20 left-20 w-72 h-72 bg-amber-200 rounded-full mix-blend-multiply filter blur-3xl" style={{ animation: 'pulse-glow 4s ease-in-out infinite 1.5s' }}></div>
                <div className="absolute top-1/3 right-1/3 w-64 h-64 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl" style={{ animation: 'pulse-glow 6s ease-in-out infinite 0.5s' }}></div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-gray-200 text-sm font-semibold text-gray-600 mb-5 shadow-sm">
                            Simulations
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
                            Experience three <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500 italic">Career Paths</span>
                        </h2>
                        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                            Immerse yourself in hyper-realistic simulations designed to measure your natural aptitudes.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-14">
                        {/* The Educator */}
                        <div className="feature-card group" style={{ '--card-glow': 'rgba(37,99,235,0.08)' }}>
                            <div className="feature-card-border" style={{ background: 'linear-gradient(135deg, #2563eb, #93c5fd, #2563eb)' }}></div>
                            <div className="p-8 pt-10">
                                <div className="relative mb-6 feature-icon-float">
                                    <div className="absolute inset-0 w-16 h-16 bg-blue-100 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-300"></div>
                                    <div className="relative w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12v5c3 3 9 3 12 0v-5" />
                                        </svg>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">The Educator</h3>
                                <p className="text-gray-500 mb-4">Teach a 10th-grade English class and manage diverse student personalities.</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="px-2.5 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full">Empathy</span>
                                    <span className="px-2.5 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full">Clarity</span>
                                    <span className="px-2.5 py-1 text-xs font-medium bg-blue-50 text-blue-700 rounded-full">Control</span>
                                </div>
                                <div className="flex items-center gap-4 text-xs text-gray-400">
                                    <span>20 min</span>
                                    <span>Medium</span>
                                </div>
                            </div>
                        </div>

                        {/* The Diagnostician */}
                        <div className="feature-card group" style={{ '--card-glow': 'rgba(13,148,136,0.08)' }}>
                            <div className="feature-card-border" style={{ background: 'linear-gradient(135deg, #0d9488, #5eead4, #0d9488)' }}></div>
                            <div className="p-8 pt-10">
                                <div className="relative mb-6 feature-icon-float">
                                    <div className="absolute inset-0 w-16 h-16 bg-teal-100 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-300"></div>
                                    <div className="relative w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-teal-200">
                                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">The Diagnostician</h3>
                                <p className="text-gray-500 mb-4">Diagnose a complex medical case and communicate with anxious patients.</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="px-2.5 py-1 text-xs font-medium bg-teal-50 text-teal-700 rounded-full">Logic</span>
                                    <span className="px-2.5 py-1 text-xs font-medium bg-teal-50 text-teal-700 rounded-full">Empathy</span>
                                    <span className="px-2.5 py-1 text-xs font-medium bg-teal-50 text-teal-700 rounded-full">Stress</span>
                                </div>
                                <div className="flex items-center gap-4 text-xs text-gray-400">
                                    <span>20 min</span>
                                    <span>Hard</span>
                                </div>
                            </div>
                        </div>

                        {/* The Advocate */}
                        <div className="feature-card group" style={{ '--card-glow': 'rgba(217,119,6,0.08)' }}>
                            <div className="feature-card-border" style={{ background: 'linear-gradient(135deg, #d97706, #fde68a, #d97706)' }}></div>
                            <div className="p-8 pt-10">
                                <div className="relative mb-6 feature-icon-float">
                                    <div className="absolute inset-0 w-16 h-16 bg-amber-100 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-300"></div>
                                    <div className="relative w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-200">
                                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                                        </svg>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">The Advocate</h3>
                                <p className="text-gray-500 mb-4">Defend a client in court and navigate high-stakes legal negotiations.</p>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="px-2.5 py-1 text-xs font-medium bg-amber-50 text-amber-700 rounded-full">Persuasion</span>
                                    <span className="px-2.5 py-1 text-xs font-medium bg-amber-50 text-amber-700 rounded-full">Logic</span>
                                    <span className="px-2.5 py-1 text-xs font-medium bg-amber-50 text-amber-700 rounded-full">Ethics</span>
                                </div>
                                <div className="flex items-center gap-4 text-xs text-gray-400">
                                    <span>20 min</span>
                                    <span>Hard</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="text-center">
                        <button className="hero-btn-primary">
                            Try All Simulations
                            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-primary-600 to-teal-500 relative overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 transform -translate-x-1/3 translate-y-1/3 w-96 h-96 bg-teal-900 opacity-10 rounded-full blur-3xl"></div>
                </div>

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                        Ready to Find Your Perfect Career?
                    </h2>
                    <p className="text-xl text-primary-50 mb-10 max-w-2xl mx-auto">
                        Join thousands discovering their true potential through AI powered career simulations
                    </p>
                    <button
                        onClick={() => { window.scrollTo(0, 0); navigate('/signup'); }}
                        className="bg-white text-primary-700 hover:bg-gray-100 border-transparent shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 px-8 py-4 text-lg font-bold inline-flex items-center gap-2 rounded-lg"
                    >
                        Start Your Journey
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </button>

                </div>
            </section>

            <BackToTop />
            <Footer />
        </div>
    );
}

export default Home;