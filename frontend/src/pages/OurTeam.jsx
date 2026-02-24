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

            <BackToTop />
            <Footer />
        </div>
    );
}

export default OurTeam;
