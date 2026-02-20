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
            <section className="py-20 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            Why Choose <span className="text-primary-600">CareerVerse</span> ?
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Move beyond traditional career quizzes with AI-powered simulations
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Feature 1: AI-Powered Analysis */}
                        <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-start">
                            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">AI-Powered Analysis</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Advanced AI evaluates your natural skills through realistic simulations.
                            </p>
                        </div>

                        {/* Feature 2: Precise Recommendations */}
                        <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-start">
                            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Precise Recommendations</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Get data-driven career matches based on your actual performance.
                            </p>
                        </div>

                        {/* Feature 3: Track Your Growth */}
                        <div className="p-8 bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col items-start">
                            <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-6">
                                <svg className="w-6 h-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-3">Track Your Growth</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Monitor your skill development across multiple simulation sessions.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Career Paths Section */}
            <section className="py-20 bg-gray-50 relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                            Experience Three <span className="text-primary-600">Career Paths</span>
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Immerse yourself in hyper realistic simulations designed to measure your natural aptitudes
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                        {/* The Educator */}
                        <div className="p-8 bg-blue-50 rounded-2xl border border-blue-100 hover:shadow-lg transition-shadow duration-300">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm">
                                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" />
                                    <path d="M6 12v5c3 3 9 3 12 0v-5" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">The Educator</h3>
                            <p className="text-gray-600">Teach a high school class</p>
                        </div>

                        {/* The Diagnostician */}
                        <div className="p-8 bg-teal-50 rounded-2xl border border-teal-100 hover:shadow-lg transition-shadow duration-300">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm">
                                <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">The Diagnostician</h3>
                            <p className="text-gray-600">Diagnose medical cases</p>
                        </div>

                        {/* The Advocate */}
                        <div className="p-8 bg-orange-50 rounded-2xl border border-orange-100 hover:shadow-lg transition-shadow duration-300">
                            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mb-6 shadow-sm">
                                <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-2">The Advocate</h3>
                            <p className="text-gray-600">Navigate legal negotiations</p>
                        </div>
                    </div>

                    <div className="text-center">
                        <Button
                            variant="primary"
                            size="lg"
                            className="inline-flex items-center gap-2 px-8 py-3 text-base font-semibold shadow-md hover:shadow-lg transition-all duration-300"
                        >
                            Try All Simulations
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Button>
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
