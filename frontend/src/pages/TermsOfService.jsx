import Navbar from '../components/Navbar';
import BackToTop from '../components/ui/BackToTop';
import Footer from '../components/Footer';

function TermsOfService() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50">
            <Navbar />

            {/* Hero Section */}
            <section className="relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #f0fdfa 0%, #ffffff 60%, #f8fafc 100%)' }}>
                {/* Background decorations */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-blob"></div>
                    <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-violet-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
                </div>

                <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 sm:pt-36 sm:pb-28">
                    <div className="text-center">
                        {/* Pill badge */}
                        <span className="inline-block px-4 py-1.5 rounded-full bg-white/80 backdrop-blur border border-teal-200 text-sm font-semibold text-teal-700 mb-6 shadow-sm">
                            📜 Legal
                        </span>

                        {/* Main Heading */}
                        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6 leading-[1.1]">
                            Terms of{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500 italic">
                                Service
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-500 mb-14 leading-relaxed">
                            Welcome to CareerVerse! These Terms of Service govern your use of our platform and simulations.
                        </p>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20 bg-white relative overflow-hidden">
                {/* Decorative background orbs */}
                <div className="absolute top-40 left-10 w-72 h-72 bg-teal-50 rounded-full mix-blend-multiply filter blur-3xl opacity-40 pointer-events-none"></div>
                <div className="absolute bottom-40 right-10 w-72 h-72 bg-violet-50 rounded-full mix-blend-multiply filter blur-3xl opacity-40 pointer-events-none"></div>

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="prose prose-teal max-w-none text-gray-600 text-lg leading-relaxed">
                        <div className="space-y-12">
                            {/* Section 1: Acceptance of Terms */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center text-teal-600 text-sm">1</span>
                                    Acceptance of Terms
                                </h2>
                                <p>
                                    By accessing or using CareerVerse, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                                </p>
                            </div>

                            {/* Section 2: Eligibility */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 text-sm">2</span>
                                    Eligibility
                                </h2>
                                <p>
                                    You must be at least 13 years of age to use the Service. By agreeing to these Terms, you represent and warrant to us that: (a) you are at least 13 years old; (b) you have not previously been suspended or removed from the Service; and (c) your registration and your use of the Service is in compliance with all applicable laws and regulations.
                                </p>
                            </div>

                            {/* Section 3: User Accounts & Security */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-violet-50 rounded-lg flex items-center justify-center text-violet-600 text-sm">3</span>
                                    User Accounts & Security
                                </h2>
                                <p>
                                    When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account. You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.
                                </p>
                            </div>

                            {/* Section 4: AI-Powered Simulations */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 text-sm">4</span>
                                    AI-Powered Simulations & Data
                                </h2>
                                <p>
                                    CareerVerse uses advanced Google Gemini AI to power its career simulations and evaluation engine. By using these simulations, you understand and agree that:
                                </p>
                                <ul className="list-disc pl-6 mt-4 space-y-2">
                                    <li><strong>Transcripts:</strong> Your interactions within the 3D simulations are recorded as text transcripts for AI analysis.</li>
                                    <li><strong>Evaluation:</strong> AI models generate performance scores and career recommendations based on these transcripts.</li>
                                    <li><strong>Data Use:</strong> We use this data to provide you with insights into your natural aptitudes and career matches as described in our Privacy Policy.</li>
                                </ul>
                            </div>

                            {/* Section 5: Intellectual Property */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600 text-sm">5</span>
                                    Intellectual Property
                                </h2>
                                <p>
                                    The Service and its original content (excluding User Content), features, and functionality are and will remain the exclusive property of CareerVerse and its licensors. The Service is protected by copyright, trademark, and other laws. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of CareerVerse.
                                </p>
                            </div>

                            {/* Section 6: User Conduct */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-rose-50 rounded-lg flex items-center justify-center text-rose-600 text-sm">6</span>
                                    User Conduct
                                </h2>
                                <p>
                                    You agree not to use the Service:
                                </p>
                                <ul className="list-disc pl-6 mt-4 space-y-2">
                                    <li>In any way that violates any applicable local, state, national, or international law or regulation.</li>
                                    <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way by exposing them to inappropriate content or otherwise.</li>
                                    <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail", "chain letter", "spam", or any other similar solicitation.</li>
                                    <li>To impersonate or attempt to impersonate the Company, a Company employee, another user, or any other person or entity.</li>
                                </ul>
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

export default TermsOfService;
