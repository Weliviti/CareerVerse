import Navbar from '../components/Navbar';
import BackToTop from '../components/ui/BackToTop';
import Footer from '../components/Footer';

function Community() {
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
                            <span className="text-sm font-semibold text-emerald-300 tracking-wide">Meet the CareerVerse Team</span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="hero-heading mb-6">
                            <span className="block text-white">Our</span>
                            <span className="block hero-heading-accent">Community</span>
                        </h1>

                        {/* Description */}
                        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-400 mb-12 leading-relaxed">
                            Meet the passionate team of innovators behind CareerVerse, dedicated to
                            revolutionizing career discovery through cutting-edge AI and immersive technology.
                        </p>

                        {/* Stats/Quick Info */}
                        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                    </svg>
                                </div>
                                <div className="text-left">
                                    <div className="text-xl font-bold text-white">6</div>
                                    <div className="text-xs text-slate-500">Developers</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <div className="text-left">
                                    <div className="text-xl font-bold text-white">AI-Powered</div>
                                    <div className="text-xs text-slate-500">Simulations</div>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/20 flex items-center justify-center">
                                    <svg className="w-5 h-5 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                    </svg>
                                </div>
                                <div className="text-left">
                                    <div className="text-xl font-bold text-white">Award</div>
                                    <div className="text-xs text-slate-500">Winning Team</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Team Members Section */}
            <section className="py-20 sm:py-24 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(5,15,10,0.4) 30%, rgba(5,15,10,0.4) 70%, transparent 100%)' }}>
                <div className="absolute top-10 right-20 w-96 h-96 bg-emerald-900/15 rounded-full filter blur-3xl pointer-events-none" style={{ animation: 'pulse-glow 6s ease-in-out infinite' }}></div>
                <div className="absolute bottom-20 left-20 w-96 h-96 bg-teal-900/15 rounded-full filter blur-3xl pointer-events-none" style={{ animation: 'pulse-glow 5s ease-in-out infinite 1s' }}></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-1.5 rounded-full border border-emerald-700/40 bg-emerald-950/40 text-sm font-semibold text-emerald-300 mb-5">
                            The Innovators
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
                            Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 italic">Minds</span> Behind CareerVerse
                        </h2>
                        <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto">
                            A talented team of six developers pushing the boundaries of career exploration.
                        </p>
                    </div>

                    {/* Team Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Team Member 1 - Sandesh */}
                        <div className="group relative overflow-hidden rounded-3xl">
                            {/* Card Background with Glassmorphism */}
                            <div className="relative bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20">

                                {/* Role Badge - Top Left */}
                                <div className="absolute top-6 left-6 z-20">
                                    <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg">
                                        TEAM LEAD
                                    </span>
                                </div>

                                {/* Large Profile Photo Area */}
                                <div className="relative h-80 overflow-hidden">
                                    {/* Replace src with your actual photo path */}
                                    <img
                                        src="/team/sandesh.jpg"
                                        alt="Sandesh"
                                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'flex';
                                        }}
                                    />
                                    {/* Fallback gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 to-pink-600/30 flex items-center justify-center" style={{ display: 'none' }}>
                                        <svg className="w-32 h-32 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
                                </div>

                                {/* Content Section */}
                                <div className="relative p-8 pt-6">
                                    {/* Small Avatar Circle */}
                                    <div className="absolute -top-10 left-8">
                                        <div className="w-20 h-20 rounded-full border-4 border-slate-900 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-xl">
                                            <span className="text-white text-2xl font-bold">S</span>
                                        </div>
                                    </div>

                                    <div className="mt-12">
                                        {/* Name */}
                                        <h3 className="text-2xl font-bold mb-1">
                                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-300">Sandesh</span>
                                        </h3>

                                        {/* Job Title */}
                                        <p className="text-slate-400 text-sm mb-4">— Backend Developer</p>

                                        {/* Description */}
                                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                            Leads NextAttend's direction and develops real-time face recognition using DeepFace and MTCNN.
                                        </p>

                                        {/* Social Links */}
                                        <div className="flex items-center gap-3">
                                            <a href="#" className="w-10 h-10 rounded-lg bg-white/5 hover:bg-purple-500/20 border border-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 group/link">
                                                <svg className="w-5 h-5 text-slate-400 group-hover/link:text-purple-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                                </svg>
                                            </a>
                                            <a href="#" className="w-10 h-10 rounded-lg bg-white/5 hover:bg-purple-500/20 border border-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 group/link">
                                                <svg className="w-5 h-5 text-slate-400 group-hover/link:text-purple-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Team Member 2 - Nishantha */}
                        <div className="group relative overflow-hidden rounded-3xl">
                            {/* Card Background with Glassmorphism */}
                            <div className="relative bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-orange-500/20">

                                {/* Role Badge - Top Left */}
                                <div className="absolute top-6 left-6 z-20">
                                    <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg">
                                        BACKEND LEAD
                                    </span>
                                </div>

                                {/* Large Profile Photo Area */}
                                <div className="relative h-80 overflow-hidden">
                                    <img
                                        src="/team/nishantha.jpg"
                                        alt="Nishantha"
                                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'flex';
                                        }}
                                    />
                                    {/* Fallback gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-orange-600/30 to-red-600/30 flex items-center justify-center" style={{ display: 'none' }}>
                                        <svg className="w-32 h-32 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
                                </div>

                                {/* Content Section */}
                                <div className="relative p-8 pt-6">
                                    {/* Small Avatar Circle */}
                                    <div className="absolute -top-10 left-8">
                                        <div className="w-20 h-20 rounded-full border-4 border-slate-900 bg-gradient-to-br from-orange-500 to-red-500 flex items-center justify-center shadow-xl">
                                            <span className="text-white text-2xl font-bold">N</span>
                                        </div>
                                    </div>

                                    <div className="mt-12">
                                        {/* Name */}
                                        <h3 className="text-2xl font-bold mb-1">
                                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-300">Nishantha</span>
                                        </h3>

                                        {/* Job Title */}
                                        <p className="text-slate-400 text-sm mb-4">— AI Integration and Backend Developer</p>

                                        {/* Description */}
                                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                            Integrates advanced AI models and builds scalable backend architecture for CareerVerse simulations.
                                        </p>

                                        {/* Social Links */}
                                        <div className="flex items-center gap-3">
                                            <a href="#" className="w-10 h-10 rounded-lg bg-white/5 hover:bg-orange-500/20 border border-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 group/link">
                                                <svg className="w-5 h-5 text-slate-400 group-hover/link:text-orange-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                                </svg>
                                            </a>
                                            <a href="#" className="w-10 h-10 rounded-lg bg-white/5 hover:bg-orange-500/20 border border-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 group/link">
                                                <svg className="w-5 h-5 text-slate-400 group-hover/link:text-orange-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Team Member 3 - Crishal */}
                        <div className="group relative overflow-hidden rounded-3xl">
                            {/* Card Background with Glassmorphism */}
                            <div className="relative bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/20">

                                {/* Role Badge - Top Left */}
                                <div className="absolute top-6 left-6 z-20">
                                    <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg">
                                        FRONTEND LEAD
                                    </span>
                                </div>

                                {/* Large Profile Photo Area */}
                                <div className="relative h-80 overflow-hidden">
                                    <img
                                        src="/team/crishal.jpg"
                                        alt="Crishal"
                                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'flex';
                                        }}
                                    />
                                    {/* Fallback gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/30 to-blue-600/30 flex items-center justify-center" style={{ display: 'none' }}>
                                        <svg className="w-32 h-32 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
                                </div>

                                {/* Content Section */}
                                <div className="relative p-8 pt-6">
                                    {/* Small Avatar Circle */}
                                    <div className="absolute -top-10 left-8">
                                        <div className="w-20 h-20 rounded-full border-4 border-slate-900 bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center shadow-xl">
                                            <span className="text-white text-2xl font-bold">C</span>
                                        </div>
                                    </div>

                                    <div className="mt-12">
                                        {/* Name */}
                                        <h3 className="text-2xl font-bold mb-1">
                                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-300">Crishal</span>
                                        </h3>

                                        {/* Job Title */}
                                        <p className="text-slate-400 text-sm mb-4">— Frontend Developer</p>

                                        {/* Description */}
                                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                            Crafts beautiful user interfaces with React and ensures seamless user experiences across all devices.
                                        </p>

                                        {/* Social Links */}
                                        <div className="flex items-center gap-3">
                                            <a href="#" className="w-10 h-10 rounded-lg bg-white/5 hover:bg-cyan-500/20 border border-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 group/link">
                                                <svg className="w-5 h-5 text-slate-400 group-hover/link:text-cyan-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                                </svg>
                                            </a>
                                            <a href="#" className="w-10 h-10 rounded-lg bg-white/5 hover:bg-cyan-500/20 border border-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 group/link">
                                                <svg className="w-5 h-5 text-slate-400 group-hover/link:text-cyan-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Team Member 4 - Kavindu */}
                        <div className="group relative overflow-hidden rounded-3xl">
                            {/* Card Background with Glassmorphism */}
                            <div className="relative bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-amber-500/20">

                                {/* Role Badge - Top Left */}
                                <div className="absolute top-6 left-6 z-20">
                                    <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg">
                                        GAMING LEAD
                                    </span>
                                </div>

                                {/* Large Profile Photo Area */}
                                <div className="relative h-80 overflow-hidden">
                                    <img
                                        src="/team/kavindu.jpg"
                                        alt="Kavindu"
                                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'flex';
                                        }}
                                    />
                                    {/* Fallback gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-amber-600/30 to-orange-600/30 flex items-center justify-center" style={{ display: 'none' }}>
                                        <svg className="w-32 h-32 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
                                </div>

                                {/* Content Section */}
                                <div className="relative p-8 pt-6">
                                    {/* Small Avatar Circle */}
                                    <div className="absolute -top-10 left-8">
                                        <div className="w-20 h-20 rounded-full border-4 border-slate-900 bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-xl">
                                            <span className="text-white text-2xl font-bold">K</span>
                                        </div>
                                    </div>

                                    <div className="mt-12">
                                        {/* Name */}
                                        <h3 className="text-2xl font-bold mb-1">
                                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-300">Kavindu</span>
                                        </h3>

                                        {/* Job Title */}
                                        <p className="text-slate-400 text-sm mb-4">— Game Developer</p>

                                        {/* Description */}
                                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                            Designs immersive Unity 3D experiences that bring career scenarios to life with stunning visuals.
                                        </p>

                                        {/* Social Links */}
                                        <div className="flex items-center gap-3">
                                            <a href="#" className="w-10 h-10 rounded-lg bg-white/5 hover:bg-amber-500/20 border border-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 group/link">
                                                <svg className="w-5 h-5 text-slate-400 group-hover/link:text-amber-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                                </svg>
                                            </a>
                                            <a href="#" className="w-10 h-10 rounded-lg bg-white/5 hover:bg-amber-500/20 border border-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 group/link">
                                                <svg className="w-5 h-5 text-slate-400 group-hover/link:text-amber-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Team Member 5 - Pramudi */}
                        <div className="group relative overflow-hidden rounded-3xl">
                            {/* Card Background with Glassmorphism */}
                            <div className="relative bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-pink-500/20">

                                {/* Role Badge - Top Left */}
                                <div className="absolute top-6 left-6 z-20">
                                    <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg">
                                        GAMING
                                    </span>
                                </div>

                                {/* Large Profile Photo Area */}
                                <div className="relative h-80 overflow-hidden">
                                    <img
                                        src="/team/pramudi.jpg"
                                        alt="Pramudi"
                                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'flex';
                                        }}
                                    />
                                    {/* Fallback gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-pink-600/30 to-rose-600/30 flex items-center justify-center" style={{ display: 'none' }}>
                                        <svg className="w-32 h-32 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
                                </div>

                                {/* Content Section */}
                                <div className="relative p-8 pt-6">
                                    {/* Small Avatar Circle */}
                                    <div className="absolute -top-10 left-8">
                                        <div className="w-20 h-20 rounded-full border-4 border-slate-900 bg-gradient-to-br from-pink-500 to-rose-500 flex items-center justify-center shadow-xl">
                                            <span className="text-white text-2xl font-bold">P</span>
                                        </div>
                                    </div>

                                    <div className="mt-12">
                                        {/* Name */}
                                        <h3 className="text-2xl font-bold mb-1">
                                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-300">Pramudi</span>
                                        </h3>

                                        {/* Job Title */}
                                        <p className="text-slate-400 text-sm mb-4">— Game Developer</p>

                                        {/* Description */}
                                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                            Creates interactive gameplay mechanics and polishes game elements for optimal user engagement.
                                        </p>

                                        {/* Social Links */}
                                        <div className="flex items-center gap-3">
                                            <a href="#" className="w-10 h-10 rounded-lg bg-white/5 hover:bg-pink-500/20 border border-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 group/link">
                                                <svg className="w-5 h-5 text-slate-400 group-hover/link:text-pink-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                                </svg>
                                            </a>
                                            <a href="#" className="w-10 h-10 rounded-lg bg-white/5 hover:bg-pink-500/20 border border-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 group/link">
                                                <svg className="w-5 h-5 text-slate-400 group-hover/link:text-pink-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Team Member 6 - Chamindu */}
                        <div className="group relative overflow-hidden rounded-3xl">
                            {/* Card Background with Glassmorphism */}
                            <div className="relative bg-gradient-to-br from-slate-800/90 via-slate-900/90 to-slate-800/90 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-indigo-500/20">

                                {/* Role Badge - Top Left */}
                                <div className="absolute top-6 left-6 z-20">
                                    <span className="px-4 py-1.5 rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-xs font-bold uppercase tracking-wider shadow-lg">
                                        UI/UX & DEVOPS
                                    </span>
                                </div>

                                {/* Large Profile Photo Area */}
                                <div className="relative h-80 overflow-hidden">
                                    <img
                                        src="/team/chamindu.jpg"
                                        alt="Chamindu"
                                        className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-110"
                                        onError={(e) => {
                                            e.target.style.display = 'none';
                                            e.target.nextSibling.style.display = 'flex';
                                        }}
                                    />
                                    {/* Fallback gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/30 to-violet-600/30 flex items-center justify-center" style={{ display: 'none' }}>
                                        <svg className="w-32 h-32 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </div>
                                    {/* Gradient Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
                                </div>

                                {/* Content Section */}
                                <div className="relative p-8 pt-6">
                                    {/* Small Avatar Circle */}
                                    <div className="absolute -top-10 left-8">
                                        <div className="w-20 h-20 rounded-full border-4 border-slate-900 bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center shadow-xl">
                                            <span className="text-white text-2xl font-bold">C</span>
                                        </div>
                                    </div>

                                    <div className="mt-12">
                                        {/* Name */}
                                        <h3 className="text-2xl font-bold mb-1">
                                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-300">Chamindu</span>
                                        </h3>

                                        {/* Job Title */}
                                        <p className="text-slate-400 text-sm mb-4">— UI/UX Designer and DevOps</p>

                                        {/* Description */}
                                        <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                            Designs intuitive interfaces and maintains reliable deployment pipelines for seamless operations.
                                        </p>

                                        {/* Social Links */}
                                        <div className="flex items-center gap-3">
                                            <a href="#" className="w-10 h-10 rounded-lg bg-white/5 hover:bg-indigo-500/20 border border-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 group/link">
                                                <svg className="w-5 h-5 text-slate-400 group-hover/link:text-indigo-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                                </svg>
                                            </a>
                                            <a href="#" className="w-10 h-10 rounded-lg bg-white/5 hover:bg-indigo-500/20 border border-white/10 flex items-center justify-center transition-all duration-300 hover:scale-110 group/link">
                                                <svg className="w-5 h-5 text-slate-400 group-hover/link:text-indigo-400 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                                </svg>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Project Updates Section */}
            <section className="py-20 sm:py-24 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(5,15,10,0.3) 50%, transparent 100%)' }}>
                <div className="absolute top-20 left-10 w-64 h-64 bg-teal-900/15 rounded-full filter blur-3xl pointer-events-none" style={{ animation: 'pulse-glow 5s ease-in-out infinite' }}></div>
                <div className="absolute bottom-10 right-10 w-64 h-64 bg-emerald-900/15 rounded-full filter blur-3xl pointer-events-none" style={{ animation: 'pulse-glow 6s ease-in-out infinite 1s' }}></div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12 sm:mb-16">
                        <span className="inline-block px-4 py-1.5 rounded-full border border-emerald-700/40 bg-emerald-950/40 text-sm font-semibold text-emerald-300 mb-5">
                            Latest Updates
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
                            Project <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 italic">Journey</span>
                        </h2>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                            Track our progress as we build the future of career discovery.
                        </p>
                    </div>

                    {/* Timeline */}
                    <div className="space-y-8 relative">
                        {/* Vertical line */}
                        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-emerald-700/40 via-teal-600/40 to-emerald-700/40 transform md:-translate-x-1/2 hidden sm:block"></div>

                        {/* Update 1 */}
                        <div className="relative flex flex-col md:flex-row gap-8 items-center">
                            <div className="md:w-1/2 md:text-right md:pr-12">
                                <div className="home-dark-card group inline-block p-6 text-left">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-500 flex items-center justify-center shadow-lg shadow-teal-900/50">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-white">Project Launch</h3>
                                            <p className="text-sm text-emerald-400/80">February 2026</p>
                                        </div>
                                    </div>
                                    <p className="text-slate-400 leading-relaxed">
                                        CareerVerse officially launched with AI-powered simulations for teaching and medical careers. The platform uses Google's Gemini AI for realistic persona interactions.
                                    </p>
                                </div>
                            </div>
                            <div className="hidden md:flex w-16 h-16 rounded-full bg-gradient-to-br from-teal-500 to-emerald-500 items-center justify-center shadow-xl shadow-teal-900/50 relative z-10">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                            </div>
                            <div className="md:w-1/2"></div>
                        </div>

                        {/* Update 2 */}
                        <div className="relative flex flex-col md:flex-row-reverse gap-8 items-center">
                            <div className="md:w-1/2"></div>
                            <div className="hidden md:flex w-16 h-16 rounded-full bg-gradient-to-br from-violet-500 to-purple-500 items-center justify-center shadow-xl shadow-violet-900/50 relative z-10">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            <div className="md:w-1/2 md:pl-12">
                                <div className="home-dark-card group inline-block p-6">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-lg shadow-violet-900/50">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-white">Unity 3D Integration</h3>
                                            <p className="text-sm text-violet-400/80">January 2026</p>
                                        </div>
                                    </div>
                                    <p className="text-slate-400 leading-relaxed">
                                        Successfully integrated Unity WebGL for immersive 3D career environments. Users can now experience realistic classroom and hospital scenarios.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Update 3 */}
                        <div className="relative flex flex-col md:flex-row gap-8 items-center">
                            <div className="md:w-1/2 md:text-right md:pr-12">
                                <div className="home-dark-card group inline-block p-6 text-left">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-900/50">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-white">AI Evaluation System</h3>
                                            <p className="text-sm text-amber-400/80">December 2025</p>
                                        </div>
                                    </div>
                                    <p className="text-slate-400 leading-relaxed">
                                        Deployed advanced AI evaluation system that analyzes communication skills, problem-solving abilities, and emotional intelligence in real-time.
                                    </p>
                                </div>
                            </div>
                            <div className="hidden md:flex w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 items-center justify-center shadow-xl shadow-amber-900/50 relative z-10">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                            </div>
                            <div className="md:w-1/2"></div>
                        </div>

                        {/* Update 4 */}
                        <div className="relative flex flex-col md:flex-row-reverse gap-8 items-center">
                            <div className="md:w-1/2"></div>
                            <div className="hidden md:flex w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 items-center justify-center shadow-xl shadow-blue-900/50 relative z-10">
                                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                            </div>
                            <div className="md:w-1/2 md:pl-12">
                                <div className="home-dark-card group inline-block p-6">
                                    <div className="flex items-center gap-3 mb-3">
                                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-blue-900/50">
                                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-white">Beta Testing Phase</h3>
                                            <p className="text-sm text-blue-400/80">November 2025</p>
                                        </div>
                                    </div>
                                    <p className="text-slate-400 leading-relaxed">
                                        Conducted extensive beta testing with 100+ students, gathering valuable feedback to refine the simulation experience and AI accuracy.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Achievements & Competitions Section */}
            <section className="py-20 sm:py-24 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(5,15,10,0.3) 50%, transparent 100%)' }}>
                <div className="absolute top-20 right-10 w-80 h-80 bg-amber-900/10 rounded-full filter blur-3xl pointer-events-none" style={{ animation: 'pulse-glow 5s ease-in-out infinite' }}></div>
                <div className="absolute bottom-10 left-10 w-80 h-80 bg-teal-900/15 rounded-full filter blur-3xl pointer-events-none" style={{ animation: 'pulse-glow 6s ease-in-out infinite 1s' }}></div>

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-1.5 rounded-full border border-amber-700/40 bg-amber-950/40 text-sm font-semibold text-amber-300 mb-5">
                            Achievements
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-4 tracking-tight">
                            Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-300 italic">Victories</span>
                        </h2>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                            Recognition and achievements from competitions and showcases.
                        </p>
                    </div>

                    {/* Achievement Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

                        {/* Achievement 1 */}
                        <div className="home-dark-card group">
                            <div className="p-8">
                                <div className="relative mb-6">
                                    <div className="absolute inset-0 w-16 h-16 bg-amber-900/30 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-300"></div>
                                    <div className="relative w-14 h-14 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center shadow-lg shadow-amber-900/50">
                                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="px-2.5 py-1 text-xs font-bold bg-amber-500/15 border border-amber-500/20 text-amber-300 rounded-full uppercase tracking-wider">
                                        1st Place
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">SLIIT SDGP Competition</h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                                    Awarded 1st place at SLIIT's Software Development Group Project competition for innovative use of AI in career exploration.
                                </p>
                                <p className="text-xs text-amber-400/70 font-semibold">February 2026</p>
                            </div>
                        </div>

                        {/* Achievement 2 */}
                        <div className="home-dark-card group">
                            <div className="p-8">
                                <div className="relative mb-6">
                                    <div className="absolute inset-0 w-16 h-16 bg-emerald-900/30 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-300"></div>
                                    <div className="relative w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-900/50">
                                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="px-2.5 py-1 text-xs font-bold bg-emerald-500/15 border border-emerald-500/20 text-emerald-300 rounded-full uppercase tracking-wider">
                                        Best Innovation
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">AI Innovation Award</h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                                    Recognized for breakthrough AI integration combining Gemini LLM with Unity 3D WebGL to create an unprecedented career simulation experience.
                                </p>
                                <p className="text-xs text-emerald-400/70 font-semibold">January 2026</p>
                            </div>
                        </div>

                        {/* Achievement 3 */}
                        <div className="home-dark-card group">
                            <div className="p-8">
                                <div className="relative mb-6">
                                    <div className="absolute inset-0 w-16 h-16 bg-violet-900/30 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-300"></div>
                                    <div className="relative w-14 h-14 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-violet-900/50">
                                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                                        </svg>
                                    </div>
                                </div>
                                <div className="flex flex-wrap gap-2 mb-4">
                                    <span className="px-2.5 py-1 text-xs font-bold bg-violet-500/15 border border-violet-500/20 text-violet-300 rounded-full uppercase tracking-wider">
                                        Top Rated
                                    </span>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-2">Best User Experience</h3>
                                <p className="text-slate-400 text-sm leading-relaxed mb-4">
                                    Received top ratings for user experience design, with beta testers praising the seamless blend of immersive 3D environments and intelligent AI interactions.
                                </p>
                                <p className="text-xs text-violet-400/70 font-semibold">December 2025</p>
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

export default Community;
