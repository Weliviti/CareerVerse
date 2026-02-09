import Navbar from '../components/Navbar';
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

            <Footer />
        </div>
    );
}

export default About;
