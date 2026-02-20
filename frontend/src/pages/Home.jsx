import Navbar from '../components/Navbar';
import Button from '../components/ui/Button';
import Footer from '../components/Footer';

function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50">
            <Navbar />

            {/* Hero Section */}
            <section className="relative overflow-hidden">
                {/* Background decoration — soft side gradients */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-0 left-0 w-[40%] h-full bg-gradient-to-r from-primary-50/60 to-transparent"></div>
                    <div className="absolute top-0 right-0 w-[40%] h-full bg-gradient-to-l from-primary-50/60 to-transparent"></div>
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                </div>

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 sm:pt-20 sm:pb-28">
                    <div className="text-center">
                        {/* Badge Pill */}
                        <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white border border-primary-200 shadow-sm mb-10">
                            <span className="text-lg">✨</span>
                            <span className="text-sm font-semibold text-primary-700 tracking-wide">Next-Gen Career Intelligence</span>
                        </div>

                        {/* Main Heading — big, bold, with italic accent */}
                        <h1 className="hero-heading mb-6">
                            <span className="block text-gray-900">Discover Your</span>
                            <span className="block hero-heading-accent">True Career Path</span>
                        </h1>

                        {/* Description — clean, centered */}
                        <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-500 mb-12 leading-relaxed">
                            Step into AI-powered career universes. Experience real work, not
                            guesswork. Get precision-matched to your perfect path through
                            machine learning magic.
                        </p>

                        {/* CTA Buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button className="hero-btn-primary">
                                Launch Experience
                                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </button>
                            <button className="hero-btn-outline">
                                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8 5v14l11-7z" />
                                </svg>
                                Watch Demo
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose CareerVerse Section */}
            <section className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f0fdfa 100%)' }}>
                {/* Subtle background decorations */}
                <div className="absolute top-20 left-10 w-64 h-64 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
                <div className="absolute bottom-10 right-10 w-64 h-64 bg-violet-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-sm font-semibold text-teal-700 mb-5">
                            Why CareerVerse?
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
                            A smarter way to <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500">discover careers</span>
                        </h2>
                        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                            Move beyond traditional career quizzes with AI-powered simulations that reveal your true potential.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1: AI-Powered Analysis */}
                        <div className="feature-card group">
                            <div className="feature-card-border" style={{ background: 'linear-gradient(135deg, #0d9488, #14b8a6)' }}></div>
                            <div className="p-8 pt-10">
                                <div className="relative mb-6">
                                    <div className="absolute inset-0 w-16 h-16 bg-teal-100 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-300"></div>
                                    <div className="relative w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-teal-200">
                                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                        </svg>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">AI-Powered Analysis</h3>
                                <p className="text-gray-500 leading-relaxed">
                                    Advanced AI evaluates your natural skills through hyper-realistic career simulations.
                                </p>
                            </div>
                        </div>

                        {/* Feature 2: Precise Recommendations */}
                        <div className="feature-card group">
                            <div className="feature-card-border" style={{ background: 'linear-gradient(135deg, #7c3aed, #a78bfa)' }}></div>
                            <div className="p-8 pt-10">
                                <div className="relative mb-6">
                                    <div className="absolute inset-0 w-16 h-16 bg-violet-100 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-300"></div>
                                    <div className="relative w-14 h-14 bg-gradient-to-br from-violet-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-200">
                                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Precise Recommendations</h3>
                                <p className="text-gray-500 leading-relaxed">
                                    Get data-driven career matches with percentage scores based on your actual performance.
                                </p>
                            </div>
                        </div>

                        {/* Feature 3: Track Your Growth */}
                        <div className="feature-card group">
                            <div className="feature-card-border" style={{ background: 'linear-gradient(135deg, #d97706, #fbbf24)' }}></div>
                            <div className="p-8 pt-10">
                                <div className="relative mb-6">
                                    <div className="absolute inset-0 w-16 h-16 bg-amber-100 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-300"></div>
                                    <div className="relative w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-200">
                                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                        </svg>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Track Your Growth</h3>
                                <p className="text-gray-500 leading-relaxed">
                                    Monitor your skill development with visual charts across multiple simulation sessions.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Career Paths Section */}
            <section className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #f0fdfa 0%, #f8fafc 50%, #ffffff 100%)' }}>
                <div className="absolute top-10 right-20 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-15"></div>
                <div className="absolute bottom-20 left-20 w-72 h-72 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-15"></div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-gray-200 text-sm font-semibold text-gray-600 mb-5 shadow-sm">
                            🎮 Simulations
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
                        <div className="feature-card group">
                            <div className="feature-card-border" style={{ background: 'linear-gradient(135deg, #2563eb, #60a5fa)' }}></div>
                            <div className="p-8 pt-10">
                                <div className="relative mb-6">
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
                                    <span>⏱ 20 min</span>
                                    <span>📊 Medium</span>
                                </div>
                            </div>
                        </div>

                        {/* The Diagnostician */}
                        <div className="feature-card group">
                            <div className="feature-card-border" style={{ background: 'linear-gradient(135deg, #0d9488, #14b8a6)' }}></div>
                            <div className="p-8 pt-10">
                                <div className="relative mb-6">
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
                                    <span>⏱ 20 min</span>
                                    <span>📊 Hard</span>
                                </div>
                            </div>
                        </div>

                        {/* The Advocate */}
                        <div className="feature-card group">
                            <div className="feature-card-border" style={{ background: 'linear-gradient(135deg, #d97706, #fbbf24)' }}></div>
                            <div className="p-8 pt-10">
                                <div className="relative mb-6">
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
                                    <span>⏱ 20 min</span>
                                    <span>📊 Hard</span>
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
                    <Button
                        variant="primary"
                        size="lg"
                        className="bg-white text-primary-700 hover:bg-gray-100 border-transparent shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300 px-8 py-4 text-lg font-bold inline-flex items-center gap-2"
                    >
                        Start Your Journey
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Button>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default Home;
