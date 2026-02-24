import Navbar from '../components/Navbar';
import BackToTop from '../components/ui/BackToTop';
import Footer from '../components/Footer';

function OurTeam() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50">
            <Navbar />

            {/* Hero Section */}
            <section className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #f0fdfa 0%, #ffffff 60%, #f8fafc 100%)' }}>
                {/* Background decorations */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob"></div>
                    <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-violet-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-50 rounded-full mix-blend-multiply filter blur-3xl opacity-15"></div>
                </div>

                {/* Soft side gradients */}
                <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-teal-50/40 to-transparent pointer-events-none"></div>
                <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-violet-50/30 to-transparent pointer-events-none"></div>

                <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 sm:pt-36 sm:pb-28">
                    <div className="text-center">
                        {/* Pill badge */}
                        <span className="inline-block px-4 py-1.5 rounded-full bg-white/80 backdrop-blur border border-teal-200 text-sm font-semibold text-teal-700 mb-6 shadow-sm">
                            👥 Meet the Creators
                        </span>

                        {/* Main Heading */}
                        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6 leading-[1.1]">
                            Our{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500 italic">
                                Team
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-500 mb-14 leading-relaxed">
                            Meet the passionate team of innovators behind CareerVerse, dedicated to
                            revolutionizing career discovery through cutting-edge AI and immersive technology.
                        </p>
                    </div>
                </div>
            </section>

            {/* Team Members Section */}
            <section className="py-24 relative overflow-hidden bg-white">
                <div className="absolute top-10 right-20 w-72 h-72 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10 pointer-events-none"></div>
                <div className="absolute bottom-20 left-20 w-72 h-72 bg-violet-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10 pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-teal-50 border border-teal-200 text-sm font-semibold text-teal-700 mb-5">
                            🌟 The Innovators
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
                            Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500">Minds</span> Behind CareerVerse
                        </h2>
                        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                            A talented team of six developers pushing the boundaries of career exploration.
                        </p>
                    </div>

                    {/* Team Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Team Member 1 - Sandeesh */}
                        <div className="group relative">
                            <div className="relative bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                                {/* Gradient Border on Hover */}
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                    <div className="absolute inset-0 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-2xl"></div>
                                    <div className="absolute inset-[2px] bg-white rounded-2xl"></div>
                                </div>

                                <div className="relative p-8">
                                    {/* Image Placeholder */}
                                    <div className="relative mb-6">
                                        <div className="w-32 h-32 mx-auto rounded-2xl bg-gradient-to-br from-teal-100 to-emerald-100 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
                                            <svg className="w-16 h-16 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                        {/* Leader Badge */}
                                        <div className="absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-500 rounded-full flex items-center justify-center shadow-lg shadow-amber-200">
                                            <span className="text-white text-lg">👑</span>
                                        </div>
                                    </div>

                                    {/* Name */}
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Sandeesh</h3>
                                    
                                    {/* Role Badge */}
                                    <div className="inline-flex items-center justify-center w-full mb-4">
                                        <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-sm font-semibold shadow-sm">
                                            Team Leader
                                        </span>
                                    </div>

                                    {/* Social Links */}
                                    <div className="flex items-center justify-center gap-3">
                                        <a href="#" className="w-10 h-10 rounded-lg bg-gray-50 hover:bg-teal-50 flex items-center justify-center transition-all duration-300 hover:scale-110 group">
                                            <svg className="w-5 h-5 text-gray-600 group-hover:text-teal-600 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                            </svg>
                                        </a>
                                        <a href="#" className="w-10 h-10 rounded-lg bg-gray-50 hover:bg-teal-50 flex items-center justify-center transition-all duration-300 hover:scale-110 group">
                                            <svg className="w-5 h-5 text-gray-600 group-hover:text-teal-600 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Team Member 2 - Nishantha */}
                        <div className="group relative">
                            <div className="relative bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-purple-500 rounded-2xl"></div>
                                    <div className="absolute inset-[2px] bg-white rounded-2xl"></div>
                                </div>

                                <div className="relative p-8">
                                    <div className="relative mb-6">
                                        <div className="w-32 h-32 mx-auto rounded-2xl bg-gradient-to-br from-violet-100 to-purple-100 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
                                            <svg className="w-16 h-16 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Nishantha</h3>
                                    <div className="inline-flex items-center justify-center w-full mb-4">
                                        <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 text-white text-sm font-semibold shadow-sm">
                                            Backend & AI/ML
                                        </span>
                                    </div>

                                    {/* Social Links */}
                                    <div className="flex items-center justify-center gap-3">
                                        <a href="#" className="w-10 h-10 rounded-lg bg-gray-50 hover:bg-violet-50 flex items-center justify-center transition-all duration-300 hover:scale-110 group">
                                            <svg className="w-5 h-5 text-gray-600 group-hover:text-violet-600 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                            </svg>
                                        </a>
                                        <a href="#" className="w-10 h-10 rounded-lg bg-gray-50 hover:bg-violet-50 flex items-center justify-center transition-all duration-300 hover:scale-110 group">
                                            <svg className="w-5 h-5 text-gray-600 group-hover:text-violet-600 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Team Member 3 - Crishal */}
                        <div className="group relative">
                            <div className="relative bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl"></div>
                                    <div className="absolute inset-[2px] bg-white rounded-2xl"></div>
                                </div>

                                <div className="relative p-8">
                                    <div className="relative mb-6">
                                        <div className="w-32 h-32 mx-auto rounded-2xl bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
                                            <svg className="w-16 h-16 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Crishal</h3>
                                    <div className="inline-flex items-center justify-center w-full mb-4">
                                        <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-semibold shadow-sm">
                                            Frontend Developer
                                        </span>
                                    </div>

                                    {/* Social Links */}
                                    <div className="flex items-center justify-center gap-3">
                                        <a href="#" className="w-10 h-10 rounded-lg bg-gray-50 hover:bg-blue-50 flex items-center justify-center transition-all duration-300 hover:scale-110 group">
                                            <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                            </svg>
                                        </a>
                                        <a href="#" className="w-10 h-10 rounded-lg bg-gray-50 hover:bg-blue-50 flex items-center justify-center transition-all duration-300 hover:scale-110 group">
                                            <svg className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Team Member 4 - Kavindu */}
                        <div className="group relative">
                            <div className="relative bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl"></div>
                                    <div className="absolute inset-[2px] bg-white rounded-2xl"></div>
                                </div>

                                <div className="relative p-8">
                                    <div className="relative mb-6">
                                        <div className="w-32 h-32 mx-auto rounded-2xl bg-gradient-to-br from-amber-100 to-orange-100 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
                                            <svg className="w-16 h-16 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Kavindu</h3>
                                    <div className="inline-flex items-center justify-center w-full mb-4">
                                        <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-semibold shadow-sm">
                                            Game Developer
                                        </span>
                                    </div>

                                    {/* Social Links */}
                                    <div className="flex items-center justify-center gap-3">
                                        <a href="#" className="w-10 h-10 rounded-lg bg-gray-50 hover:bg-amber-50 flex items-center justify-center transition-all duration-300 hover:scale-110 group">
                                            <svg className="w-5 h-5 text-gray-600 group-hover:text-amber-600 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                            </svg>
                                        </a>
                                        <a href="#" className="w-10 h-10 rounded-lg bg-gray-50 hover:bg-amber-50 flex items-center justify-center transition-all duration-300 hover:scale-110 group">
                                            <svg className="w-5 h-5 text-gray-600 group-hover:text-amber-600 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Team Member 5 - Pramudi */}
                        <div className="group relative">
                            <div className="relative bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl"></div>
                                    <div className="absolute inset-[2px] bg-white rounded-2xl"></div>
                                </div>

                                <div className="relative p-8">
                                    <div className="relative mb-6">
                                        <div className="w-32 h-32 mx-auto rounded-2xl bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
                                            <svg className="w-16 h-16 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Pramudi</h3>
                                    <div className="inline-flex items-center justify-center w-full mb-4">
                                        <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm font-semibold shadow-sm">
                                            Game Developer
                                        </span>
                                    </div>

                                    {/* Social Links */}
                                    <div className="flex items-center justify-center gap-3">
                                        <a href="#" className="w-10 h-10 rounded-lg bg-gray-50 hover:bg-pink-50 flex items-center justify-center transition-all duration-300 hover:scale-110 group">
                                            <svg className="w-5 h-5 text-gray-600 group-hover:text-pink-600 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                            </svg>
                                        </a>
                                        <a href="#" className="w-10 h-10 rounded-lg bg-gray-50 hover:bg-pink-50 flex items-center justify-center transition-all duration-300 hover:scale-110 group">
                                            <svg className="w-5 h-5 text-gray-600 group-hover:text-pink-600 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Team Member 6 - Chamindu */}
                        <div className="group relative">
                            <div className="relative bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 to-blue-500 rounded-2xl"></div>
                                    <div className="absolute inset-[2px] bg-white rounded-2xl"></div>
                                </div>

                                <div className="relative p-8">
                                    <div className="relative mb-6">
                                        <div className="w-32 h-32 mx-auto rounded-2xl bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
                                            <svg className="w-16 h-16 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Chamindu</h3>
                                    <div className="inline-flex items-center justify-center w-full mb-4">
                                        <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-sm font-semibold shadow-sm">
                                            DevOps & Frontend
                                        </span>
                                    </div>

                                    {/* Social Links */}
                                    <div className="flex items-center justify-center gap-3">
                                        <a href="#" className="w-10 h-10 rounded-lg bg-gray-50 hover:bg-indigo-50 flex items-center justify-center transition-all duration-300 hover:scale-110 group">
                                            <svg className="w-5 h-5 text-gray-600 group-hover:text-indigo-600 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                                            </svg>
                                        </a>
                                        <a href="#" className="w-10 h-10 rounded-lg bg-gray-50 hover:bg-indigo-50 flex items-center justify-center transition-all duration-300 hover:scale-110 group">
                                            <svg className="w-5 h-5 text-gray-600 group-hover:text-indigo-600 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Project Updates Section */}
            <section className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f0fdfa 100%)' }}>
                <div className="absolute top-20 left-10 w-64 h-64 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-15 pointer-events-none"></div>
                <div className="absolute bottom-10 right-10 w-64 h-64 bg-emerald-100 rounded-full mix-blend-multiply filter blur-3xl opacity-15 pointer-events-none"></div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-gray-200 text-sm font-semibold text-gray-600 mb-5 shadow-sm">
                            📢 Latest Updates
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
                            Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500">Journey</span>
                        </h2>
                        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                            Track our progress as we build the future of career discovery.
                        </p>
                    </div>

                    {/* Timeline */}
                    <div className="space-y-8 relative">
                        {/* Vertical line */}
                        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-200 via-emerald-200 to-teal-200 transform md:-translate-x-1/2 hidden sm:block"></div>

                        {/* Update 1 */}
                        <div className="relative flex flex-col md:flex-row gap-8 items-center">
                            <div className="md:w-1/2 md:text-right md:pr-12">
                                <div className="inline-block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 p-6 text-left">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-teal-200">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">Project Launch</h3>
                                            <p className="text-sm text-gray-400">February 2026</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 leading-relaxed">
                                        CareerVerse officially launched with AI-powered simulations for teaching and medical careers. The platform uses Google's Gemini AI for realistic persona interactions.
                                    </p>
                                </div>
                            </div>
                            <div className="hidden md:flex w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 items-center justify-center shadow-xl shadow-teal-200 relative z-10">
                                <span className="text-2xl">🚀</span>
                            </div>
                            <div className="md:w-1/2"></div>
                        </div>

                        {/* Update 2 */}
                        <div className="relative flex flex-col md:flex-row gap-8 items-center">
                            <div className="md:w-1/2"></div>
                            <div className="hidden md:flex w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 items-center justify-center shadow-xl shadow-violet-200 relative z-10">
                                <span className="text-2xl">🎮</span>
                            </div>
                            <div className="md:w-1/2 md:pl-12">
                                <div className="inline-block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 p-6">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-lg shadow-violet-200">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">Unity 3D Integration</h3>
                                            <p className="text-sm text-gray-400">January 2026</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 leading-relaxed">
                                        Successfully integrated Unity WebGL for immersive 3D career environments. Users can now experience realistic classroom and hospital scenarios.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Update 3 */}
                        <div className="relative flex flex-col md:flex-row gap-8 items-center">
                            <div className="md:w-1/2 md:text-right md:pr-12">
                                <div className="inline-block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 p-6 text-left">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-200">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">AI Evaluation System</h3>
                                            <p className="text-sm text-gray-400">December 2025</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 leading-relaxed">
                                        Deployed advanced AI evaluation system that analyzes communication skills, problem-solving abilities, and emotional intelligence in real-time.
                                    </p>
                                </div>
                            </div>
                            <div className="hidden md:flex w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 items-center justify-center shadow-xl shadow-amber-200 relative z-10">
                                <span className="text-2xl">🤖</span>
                            </div>
                            <div className="md:w-1/2"></div>
                        </div>

                        {/* Update 4 */}
                        <div className="relative flex flex-col md:flex-row gap-8 items-center">
                            <div className="md:w-1/2"></div>
                            <div className="hidden md:flex w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 items-center justify-center shadow-xl shadow-blue-200 relative z-10">
                                <span className="text-2xl">🏆</span>
                            </div>
                            <div className="md:w-1/2 md:pl-12">
                                <div className="inline-block bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 p-6">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-200">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">Beta Testing Phase</h3>
                                            <p className="text-sm text-gray-400">November 2025</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 leading-relaxed">
                                        Conducted extensive beta testing with 100+ students, gathering valuable feedback to refine the simulation experience and AI accuracy.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Achievements & Competitions Section */}
            <section className="py-24 relative overflow-hidden bg-white">
                <div className="absolute top-20 right-10 w-80 h-80 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10 pointer-events-none"></div>
                <div className="absolute bottom-10 left-10 w-80 h-80 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10 pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-sm font-semibold text-amber-700 mb-5">
                            🏆 Achievements
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
                            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-500">Victories</span>
                        </h2>
                        <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                            Recognition and achievements from competitions and showcases.
                        </p>
                    </div>

                    {/* Achievement Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Achievement 1 */}
                        <div className="group relative">
                            <div className="relative bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl border border-amber-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                                {/* Decorative corner accent */}
                                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-amber-400 to-orange-500 opacity-10 rounded-bl-full"></div>
                                
                                <div className="relative p-8">
                                    {/* Trophy Icon */}
                                    <div className="mb-6 flex justify-center">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
                                            <div className="relative w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Achievement Details */}
                                    <div className="text-center mb-4">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                            Innovation Hackathon 2026
                                        </h3>
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-semibold shadow-sm">
                                            <span>🥇</span>
                                            <span>1st Place Winner</span>
                                        </div>
                                    </div>

                                    <p className="text-gray-600 text-center leading-relaxed mb-4">
                                        Won first place for innovative AI-powered career discovery platform among 50+ competing teams.
                                    </p>

                                    <div className="flex items-center justify-center text-sm text-gray-400">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        February 2026
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Achievement 2 */}
                        <div className="group relative">
                            <div className="relative bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl border border-blue-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-500 opacity-10 rounded-bl-full"></div>
                                
                                <div className="relative p-8">
                                    <div className="mb-6 flex justify-center">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
                                            <div className="relative w-20 h-20 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-center mb-4">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                            EdTech Excellence Awards
                                        </h3>
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white text-sm font-semibold shadow-sm">
                                            <span>🎖️</span>
                                            <span>Best Innovation</span>
                                        </div>
                                    </div>

                                    <p className="text-gray-600 text-center leading-relaxed mb-4">
                                        Recognized as the most innovative educational technology solution for career guidance.
                                    </p>

                                    <div className="flex items-center justify-center text-sm text-gray-400">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        January 2026
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Achievement 3 */}
                        <div className="group relative">
                            <div className="relative bg-gradient-to-br from-violet-50 to-purple-50 rounded-2xl border border-violet-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-violet-400 to-purple-500 opacity-10 rounded-bl-full"></div>
                                
                                <div className="relative p-8">
                                    <div className="mb-6 flex justify-center">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-gradient-to-br from-violet-400 to-purple-500 rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
                                            <div className="relative w-20 h-20 bg-gradient-to-br from-violet-400 to-purple-500 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-center mb-4">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                            AI Showcase 2025
                                        </h3>
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-violet-500 to-purple-500 text-white text-sm font-semibold shadow-sm">
                                            <span>🌟</span>
                                            <span>Featured Project</span>
                                        </div>
                                    </div>

                                    <p className="text-gray-600 text-center leading-relaxed mb-4">
                                        Selected as a featured project at the national AI and ML innovation showcase.
                                    </p>

                                    <div className="flex items-center justify-center text-sm text-gray-400">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        December 2025
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Achievement 4 */}
                        <div className="group relative">
                            <div className="relative bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl border border-emerald-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-400 to-teal-500 opacity-10 rounded-bl-full"></div>
                                
                                <div className="relative p-8">
                                    <div className="mb-6 flex justify-center">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
                                            <div className="relative w-20 h-20 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-center mb-4">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                            University Tech Fest
                                        </h3>
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-sm font-semibold shadow-sm">
                                            <span>🥈</span>
                                            <span>2nd Place Winner</span>
                                        </div>
                                    </div>

                                    <p className="text-gray-600 text-center leading-relaxed mb-4">
                                        Secured second place in the university-wide technology innovation competition.
                                    </p>

                                    <div className="flex items-center justify-center text-sm text-gray-400">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        November 2025
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Achievement 5 */}
                        <div className="group relative">
                            <div className="relative bg-gradient-to-br from-pink-50 to-rose-50 rounded-2xl border border-pink-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-pink-400 to-rose-500 opacity-10 rounded-bl-full"></div>
                                
                                <div className="relative p-8">
                                    <div className="mb-6 flex justify-center">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
                                            <div className="relative w-20 h-20 bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-center mb-4">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                            Startup Pitch Competition
                                        </h3>
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white text-sm font-semibold shadow-sm">
                                            <span>💼</span>
                                            <span>Top 10 Finalist</span>
                                        </div>
                                    </div>

                                    <p className="text-gray-600 text-center leading-relaxed mb-4">
                                        Selected as one of the top 10 finalists in national startup pitch competition.
                                    </p>

                                    <div className="flex items-center justify-center text-sm text-gray-400">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        October 2025
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Achievement 6 */}
                        <div className="group relative">
                            <div className="relative bg-gradient-to-br from-indigo-50 to-blue-50 rounded-2xl border border-indigo-100 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-400 to-blue-500 opacity-10 rounded-bl-full"></div>
                                
                                <div className="relative p-8">
                                    <div className="mb-6 flex justify-center">
                                        <div className="relative">
                                            <div className="absolute inset-0 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-2xl blur-xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
                                            <div className="relative w-20 h-20 bg-gradient-to-br from-indigo-400 to-blue-500 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg">
                                                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="text-center mb-4">
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                                            Research Paper Published
                                        </h3>
                                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-indigo-500 to-blue-500 text-white text-sm font-semibold shadow-sm">
                                            <span>📄</span>
                                            <span>Publication</span>
                                        </div>
                                    </div>

                                    <p className="text-gray-600 text-center leading-relaxed mb-4">
                                        Published research paper on AI-driven career assessment at international conference.
                                    </p>

                                    <div className="flex items-center justify-center text-sm text-gray-400">
                                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        September 2025
                                    </div>
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
}

export default OurTeam;
