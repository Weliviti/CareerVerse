import Navbar from '../components/Navbar';
import BackToTop from '../components/ui/BackToTop';
import Footer from '../components/Footer';

function PrivacyPolicy() {
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
                            📄 Legal
                        </span>

                        {/* Main Heading */}
                        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6 leading-[1.1]">
                            Privacy{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500 italic">
                                Policy
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-500 mb-14 leading-relaxed">
                            Your privacy is important to us. This page outlines how we collect, use, and protect your information.
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
                            {/* Section 1: Introduction */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-teal-50 rounded-lg flex items-center justify-center text-teal-600 text-sm">1</span>
                                    Introduction
                                </h2>
                                <p>
                                    Welcome to CareerVerse. We are committed to protecting your personal information and your right to privacy.
                                    If you have any questions or concerns about our policy, or our practices with regards to your personal
                                    information, please contact us at privacy@careerverse.com.
                                </p>
                            </div>

                            {/* Section 2: Information We Collect */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 text-sm">2</span>
                                    Information We Collect
                                </h2>
                                <p>We collect personal information that you provide to us when you register on our platform:</p>
                                <ul className="list-disc pl-6 mt-4 space-y-2">
                                    <li><strong>Personal Details:</strong> Name, email address, and profile picture.</li>
                                    <li><strong>Simulation Data:</strong> Records of your interactions within the 3D simulations, including transcripts and choices made.</li>
                                    <li><strong>Performance Metrics:</strong> Skill scores, performance evaluations, and career matching data generated by our AI.</li>
                                    <li><strong>Log Data:</strong> IP addresses, browser types, and usage statistics.</li>
                                </ul>
                            </div>

                            {/* Section 3: How We Use Your Information */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-violet-50 rounded-lg flex items-center justify-center text-violet-600 text-sm">3</span>
                                    How We Use Your Information
                                </h2>
                                <p>We use the information we collect for various purposes, including:</p>
                                <ul className="list-disc pl-6 mt-4 space-y-2">
                                    <li>To provide and manage your account and access to simulations.</li>
                                    <li>To power our AI Recommendation Engine for personalized career discovery.</li>
                                    <li>To generate detailed performance reports and skill analytics.</li>
                                    <li>To improve our platform, simulations, and user experience.</li>
                                    <li>To communicate with you regarding updates or support.</li>
                                </ul>
                            </div>

                            {/* Section 4: Data Protection & Security */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-600 text-sm">4</span>
                                    Data Protection & Security
                                </h2>
                                <p>
                                    We use Firebase Authentication and Firestore to ensure your data is stored securely.
                                    While we strive to use commercially acceptable means to protect your personal information,
                                    we cannot guarantee its absolute security.
                                </p>
                            </div>

                            {/* Section 5: AI & Privacy */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-amber-50 rounded-lg flex items-center justify-center text-amber-600 text-sm">5</span>
                                    AI & Privacy
                                </h2>
                                <p>
                                    Our platform uses Google Gemini AI to analyze simulation transcripts. This analysis
                                    is performed to provide you with feedback and recommendations. We do not use your personal
                                    data to train third-party AI models.
                                </p>
                            </div>

                            {/* Section 6: Changes to This Policy */}
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center gap-3">
                                    <span className="w-8 h-8 bg-rose-50 rounded-lg flex items-center justify-center text-rose-600 text-sm">6</span>
                                    Changes to This Policy
                                </h2>
                                <p>
                                    We may update our Privacy Policy from time to time. We will notify you of any changes by
                                    posting the new Privacy Policy on this page and updating the "Last Updated" date.
                                </p>
                                <p className="mt-8 text-sm text-gray-400">
                                    Last Updated: February 20, 2026
                                </p>
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

export default PrivacyPolicy;
