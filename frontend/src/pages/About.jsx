import Navbar from '../components/Navbar';
import BackToTop from '../components/ui/BackToTop';
import Footer from '../components/Footer';

function About() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50">
            <Navbar />

            {/* Hero Section */}
            <section className="relative overflow-hidden">
                {/* Background decoration */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
                </div>

                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-24 sm:pb-32">
                    <div className="text-center">
                        {/* Main Heading */}
                        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold text-gray-900 tracking-tight mb-6">
                            About{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-teal-500">
                                CareerVerse
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="max-w-3xl mx-auto text-lg sm:text-xl text-gray-600 mb-10 leading-relaxed">
                            We're revolutionizing career discovery through AI-powered simulations that feel
                            like real career experiences. Get personalized recommendations based on your actual
                            performance, not just quiz answers.
                        </p>
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
            <section className="py-20 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        How It <span className="text-teal-600">Works</span>
                    </h2>
                    <p className="text-gray-600 mb-16 max-w-2xl mx-auto">
                        From simulation to recommendation in four simple steps
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Step 1 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow relative overflow-hidden group">
                            <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center text-white mb-6 mx-auto group-hover:scale-110 transition-transform">
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                                    />
                                </svg>
                            </div>
                            <span className="text-teal-600 font-bold text-xl block mb-2">01</span>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Choose Your Simulation</h3>
                            <p className="text-sm text-gray-600 lg:px-2">
                                Select from three career paths: Teacher, Doctor, or Lawyer
                            </p>
                        </div>

                        {/* Step 2 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                            <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center text-white mb-6 mx-auto group-hover:scale-110 transition-transform">
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                    />
                                </svg>
                            </div>
                            <span className="text-teal-600 font-bold text-xl block mb-2">02</span>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Immerse in Realistic Scenarios</h3>
                            <p className="text-sm text-gray-600 lg:px-2">
                                Interact with AI-powered agents in hyper-realistic 3D environments
                            </p>
                        </div>

                        {/* Step 3 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                            <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center text-white mb-6 mx-auto group-hover:scale-110 transition-transform">
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 10V3L4 14h7v7l9-11h-7z"
                                    />
                                </svg>
                            </div>
                            <span className="text-teal-600 font-bold text-xl block mb-2">03</span>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">AI Analyzes Your Performance</h3>
                            <p className="text-sm text-gray-600 lg:px-2">
                                Advanced AI evaluates your skill across multiple dimensions
                            </p>
                        </div>

                        {/* Step 4 */}
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow group">
                            <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center text-white mb-6 mx-auto group-hover:scale-110 transition-transform">
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                            </div>
                            <span className="text-teal-600 font-bold text-xl block mb-2">04</span>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Get Career Recommendations</h3>
                            <p className="text-sm text-gray-600 lg:px-2">
                                Receive data-driven insights about your ideal career path
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* What Makes Us Different Section */}
            <section className="py-20 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                        What Makes Us <span className="text-teal-600">Different</span>
                    </h2>
                    <p className="text-gray-600 mb-16 max-w-2xl mx-auto">
                        We combine cutting-edge technology with human-centric design
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-left">
                            <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600 mb-6 border border-teal-100">
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Hands-On Technology</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Powered by advanced language models, our AI agents respond authentically
                                in character, creating truly immersive experiences.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-left">
                            <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600 mb-6 border border-teal-100">
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M13 10V3L4 14h7v7l9-11h-7z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Adaptive Engine</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Every decision is analyzed. Get precise skill scores and career matches based
                                on actual performance, not just answers to questions.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-left">
                            <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center text-teal-600 mb-6 border border-teal-100">
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Instant Feedback</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Experience what it really feels like in different careers through interactive
                                scenario-based challenges that mirror real professional situations.
                            </p>
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

            <BackToTop />
            <Footer />
        </div>
    );
}

export default About;
