import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function About() {
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
                            ✨ Our Story
                        </span>

                        {/* Main Heading */}
                        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6 leading-[1.1]">
                            About{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500 italic">
                                CareerVerse
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-500 mb-14 leading-relaxed">
                            We're revolutionizing career discovery through AI-powered simulations that feel
                            like real career experiences. Discover your strengths through action, not answers.
                        </p>

                        {/* Stats ribbon */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
                            <div className="flex items-center gap-3 px-6 py-3 bg-white/70 backdrop-blur rounded-2xl border border-gray-100 shadow-sm">
                                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-teal-200">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <div className="text-left">
                                    <div className="text-lg font-bold text-gray-900">3-Layer AI</div>
                                    <div className="text-xs text-gray-400">Persona · Evaluator · Recommender</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 px-6 py-3 bg-white/70 backdrop-blur rounded-2xl border border-gray-100 shadow-sm">
                                <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-200">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                    </svg>
                                </div>
                                <div className="text-left">
                                    <div className="text-lg font-bold text-gray-900">Gemini Powered</div>
                                    <div className="text-xs text-gray-400">Google's advanced LLM</div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3 px-6 py-3 bg-white/70 backdrop-blur rounded-2xl border border-gray-100 shadow-sm">
                                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-200">
                                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1M4 7l2-1M4 7l2 1M4 7v2.5M12 21l-2-1m2 1l2-1m-2 1v-2.5M6 18l-2-1v-2.5M18 18l2-1v-2.5" />
                                    </svg>
                                </div>
                                <div className="text-left">
                                    <div className="text-lg font-bold text-gray-900">WebGL 3D</div>
                                    <div className="text-xs text-gray-400">Unity-powered simulations</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Mission Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col lg:flex-row items-center gap-16">
                        <div className="flex-1">
                            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
                                Our <span className="text-teal-600">Mission</span>
                            </h2>
                            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
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
                                <p>
                                    The result? Career recommendations based on demonstrated aptitude, not just
                                    preferences.
                                </p>
                            </div>
                        </div>

                        <div className="flex-1 w-full max-w-lg">
                            <div className="aspect-square bg-teal-50 rounded-3xl p-12 flex flex-col items-center justify-center text-center shadow-sm border border-teal-100/50">
                                <div className="w-48 h-48 mb-8 text-teal-600">
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
                                <h3 className="text-2xl font-bold text-gray-900 mb-2">AI Powered</h3>
                                <p className="text-teal-600 font-semibold text-xl">Career Discovery</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #ffffff 0%, #f0fdfa 100%)' }}>
                <div className="absolute top-20 right-10 w-64 h-64 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-15 pointer-events-none"></div>
                <div className="absolute bottom-10 left-10 w-64 h-64 bg-violet-100 rounded-full mix-blend-multiply filter blur-3xl opacity-15 pointer-events-none"></div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-gray-200 text-sm font-semibold text-gray-600 mb-5 shadow-sm">
                        🛤️ The Process
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
                        How it <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500 italic">works</span>
                    </h2>
                    <p className="text-lg text-gray-500 mb-16 max-w-2xl mx-auto">
                        From simulation to career recommendation in four simple steps.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Step 1 */}
                        <div className="feature-card group relative">
                            <div className="feature-card-border" style={{ background: 'linear-gradient(135deg, #0d9488, #14b8a6)' }}></div>
                            <div className="absolute top-4 right-4 text-6xl font-black text-teal-50 select-none pointer-events-none">01</div>
                            <div className="p-8 pt-10 text-center relative">
                                <div className="relative mb-5 mx-auto w-fit">
                                    <div className="absolute inset-0 w-16 h-16 bg-teal-100 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-300 mx-auto"></div>
                                    <div className="relative w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-teal-200 mx-auto">
                                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                                        </svg>
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Choose Your Simulation</h3>
                                <p className="text-sm text-gray-500">
                                    Select from career paths like Teacher or Doctor
                                </p>
                            </div>
                        </div>

                        {/* Step 2 */}
                        <div className="feature-card group relative">
                            <div className="feature-card-border" style={{ background: 'linear-gradient(135deg, #2563eb, #60a5fa)' }}></div>
                            <div className="absolute top-4 right-4 text-6xl font-black text-blue-50 select-none pointer-events-none">02</div>
                            <div className="p-8 pt-10 text-center relative">
                                <div className="relative mb-5 mx-auto w-fit">
                                    <div className="absolute inset-0 w-16 h-16 bg-blue-100 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-300 mx-auto"></div>
                                    <div className="relative w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200 mx-auto">
                                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                        </svg>
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Immerse in Scenarios</h3>
                                <p className="text-sm text-gray-500">
                                    Interact with AI agents in realistic 3D environments
                                </p>
                            </div>
                        </div>

                        {/* Step 3 */}
                        <div className="feature-card group relative">
                            <div className="feature-card-border" style={{ background: 'linear-gradient(135deg, #7c3aed, #a78bfa)' }}></div>
                            <div className="absolute top-4 right-4 text-6xl font-black text-violet-50 select-none pointer-events-none">03</div>
                            <div className="p-8 pt-10 text-center relative">
                                <div className="relative mb-5 mx-auto w-fit">
                                    <div className="absolute inset-0 w-16 h-16 bg-violet-100 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-300 mx-auto"></div>
                                    <div className="relative w-14 h-14 bg-gradient-to-br from-violet-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-200 mx-auto">
                                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">AI Analyzes Performance</h3>
                                <p className="text-sm text-gray-500">
                                    Your skills are evaluated across multiple dimensions
                                </p>
                            </div>
                        </div>

                        {/* Step 4 */}
                        <div className="feature-card group relative">
                            <div className="feature-card-border" style={{ background: 'linear-gradient(135deg, #d97706, #fbbf24)' }}></div>
                            <div className="absolute top-4 right-4 text-6xl font-black text-amber-50 select-none pointer-events-none">04</div>
                            <div className="p-8 pt-10 text-center relative">
                                <div className="relative mb-5 mx-auto w-fit">
                                    <div className="absolute inset-0 w-16 h-16 bg-amber-100 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-300 mx-auto"></div>
                                    <div className="relative w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-200 mx-auto">
                                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <h3 className="text-lg font-bold text-gray-900 mb-2">Get Recommendations</h3>
                                <p className="text-sm text-gray-500">
                                    Receive data-driven insights about your ideal career
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* What Makes Us Different Section */}
            <section className="py-24 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #f0fdfa 0%, #f8fafc 50%, #ffffff 100%)' }}>
                <div className="absolute top-10 left-20 w-64 h-64 bg-violet-100 rounded-full mix-blend-multiply filter blur-3xl opacity-15 pointer-events-none"></div>
                <div className="absolute bottom-10 right-20 w-64 h-64 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-15 pointer-events-none"></div>

                <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-gray-200 text-sm font-semibold text-gray-600 mb-5 shadow-sm">
                        🚀 Our Edge
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
                        What makes us <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500 italic">different</span>
                    </h2>
                    <p className="text-lg text-gray-500 mb-16 max-w-2xl mx-auto">
                        We combine cutting-edge technology with human-centric design.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="feature-card group text-left">
                            <div className="feature-card-border" style={{ background: 'linear-gradient(135deg, #0d9488, #14b8a6)' }}></div>
                            <div className="p-8 pt-10">
                                <div className="relative mb-6">
                                    <div className="absolute inset-0 w-16 h-16 bg-teal-100 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-300"></div>
                                    <div className="relative w-14 h-14 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center shadow-lg shadow-teal-200">
                                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                        </svg>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Hands-On Technology</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    Powered by advanced language models, our AI agents respond authentically
                                    in character, creating truly immersive experiences.
                                </p>
                            </div>
                        </div>

                        {/* Feature 2 */}
                        <div className="feature-card group text-left">
                            <div className="feature-card-border" style={{ background: 'linear-gradient(135deg, #7c3aed, #a78bfa)' }}></div>
                            <div className="p-8 pt-10">
                                <div className="relative mb-6">
                                    <div className="absolute inset-0 w-16 h-16 bg-violet-100 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-300"></div>
                                    <div className="relative w-14 h-14 bg-gradient-to-br from-violet-500 to-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-200">
                                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Adaptive Engine</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    Every decision is analyzed. Get precise skill scores and career matches based
                                    on actual performance, not just answers to questions.
                                </p>
                            </div>
                        </div>

                        {/* Feature 3 */}
                        <div className="feature-card group text-left">
                            <div className="feature-card-border" style={{ background: 'linear-gradient(135deg, #d97706, #fbbf24)' }}></div>
                            <div className="p-8 pt-10">
                                <div className="relative mb-6">
                                    <div className="absolute inset-0 w-16 h-16 bg-amber-100 rounded-2xl rotate-6 group-hover:rotate-12 transition-transform duration-300"></div>
                                    <div className="relative w-14 h-14 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center shadow-lg shadow-amber-200">
                                        <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                        </svg>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-3">Instant Feedback</h3>
                                <p className="text-gray-500 text-sm leading-relaxed">
                                    Experience what it really feels like in different careers through interactive
                                    scenario-based challenges that mirror real professional situations.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Our Simulations Section */}
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            Our <span className="text-teal-600">Simulations</span>
                        </h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Experience three distinct career paths, each designed to evaluate specific skill sets
                            through realistic, AI-powered scenarios.
                        </p>
                    </div>

                    <div className="space-y-6">
                        {/* Simulation 1: The Educator */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center gap-8">
                            <div className="w-14 h-14 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600 border border-teal-100 shrink-0">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" />
                                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">The Educator</h3>
                                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                                    Step into a classroom and manage them AI powered students. Handle disruptions, inspire learning, and
                                    demonstrate your coaching abilities.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full border border-blue-100">Empathy</span>
                                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full border border-blue-100">Clarity</span>
                                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full border border-blue-100">Classroom Control</span>
                                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-xs font-semibold rounded-full border border-blue-100">Stress Handling</span>
                                </div>
                            </div>
                        </div>

                        {/* Simulation 2: The Diagnostician */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center gap-8">
                            <div className="w-14 h-14 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600 border border-teal-100 shrink-0">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">The Diagnostician</h3>
                                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                                    Interview AI patients, identify symptoms, and provide accurate diagnoses. Combine medical logic with
                                    compassionate care.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1 bg-teal-50 text-teal-600 text-xs font-semibold rounded-full border border-teal-100">Diagnostic Logic</span>
                                    <span className="px-3 py-1 bg-teal-50 text-teal-600 text-xs font-semibold rounded-full border border-teal-100">Empathy</span>
                                    <span className="px-3 py-1 bg-teal-50 text-teal-600 text-xs font-semibold rounded-full border border-teal-100">Communication</span>
                                    <span className="px-3 py-1 bg-teal-50 text-teal-600 text-xs font-semibold rounded-full border border-teal-100">Problem Solving</span>
                                </div>
                            </div>
                        </div>

                        {/* Simulation 3: The Advocate */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center gap-8">
                            <div className="w-14 h-14 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600 border border-teal-100 shrink-0">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                                </svg>
                            </div>
                            <div className="flex-1">
                                <h3 className="text-xl font-bold text-gray-900 mb-2">The Advocate</h3>
                                <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                                    Navigate complex legal negotiations with an AI opposing counsel. Use persuasion and logic to achieve
                                    favorable outcomes.
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1 bg-orange-50 text-orange-600 text-xs font-semibold rounded-full border border-orange-100">Persuasion</span>
                                    <span className="px-3 py-1 bg-orange-50 text-orange-600 text-xs font-semibold rounded-full border border-orange-100">Logical Acumen</span>
                                    <span className="px-3 py-1 bg-orange-50 text-orange-600 text-xs font-semibold rounded-full border border-orange-100">Negotiation</span>
                                    <span className="px-3 py-1 bg-orange-50 text-orange-600 text-xs font-semibold rounded-full border border-orange-100">Reading People</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* AI Stats Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8">
                        Powered by <span className="text-teal-600">Advanced AI</span>
                    </h2>
                    <p className="text-gray-600 max-w-3xl mx-auto mb-16 leading-relaxed">
                        Our platform leverages cutting-edge Large Language Models to create AI agents that
                        respond naturally and evaluate your performance with precision. Each interaction is analyzed
                        to build a comprehensive picture of your skills and aptitudes.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="p-10 bg-teal-50 rounded-2xl border border-teal-100/50">
                            <div className="text-5xl font-bold text-teal-600 mb-2">100%</div>
                            <div className="text-gray-600 font-medium italic">AI-Powered Analysis</div>
                        </div>
                        <div className="p-10 bg-blue-50 rounded-2xl border border-blue-100/50">
                            <div className="text-5xl font-bold text-blue-600 mb-2">20+</div>
                            <div className="text-gray-600 font-medium italic">Skill Dimensions</div>
                        </div>
                        <div className="p-10 bg-purple-50 rounded-2xl border border-purple-100/50">
                            <div className="text-5xl font-bold text-purple-600 mb-2">3</div>
                            <div className="text-gray-600 font-medium italic">Career Paths</div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default About;
