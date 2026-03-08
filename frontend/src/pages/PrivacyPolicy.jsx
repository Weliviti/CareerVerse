import Navbar from '../components/Navbar';
import BackToTop from '../components/ui/BackToTop';
import Footer from '../components/Footer';

function PrivacyPolicy() {
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
                            <span className="text-sm font-semibold text-emerald-300 tracking-wide">📄 Legal Documentation</span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="hero-heading mb-6">
                            <span className="block text-white">Privacy</span>
                            <span className="block hero-heading-accent">Policy</span>
                        </h1>

                        {/* Description */}
                        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-400 mb-12 leading-relaxed">
                            Your privacy is important to us. This page outlines how we collect, use, and protect your information.
                        </p>
                    </div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-20 sm:py-24 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, transparent 0%, rgba(5,15,10,0.4) 30%, rgba(5,15,10,0.4) 70%, transparent 100%)' }}>
                {/* Background glows */}
                <div className="absolute top-10 left-20 w-80 h-80 bg-teal-900/15 rounded-full filter blur-3xl pointer-events-none" style={{ animation: 'pulse-glow 5s ease-in-out infinite' }}></div>
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-emerald-900/10 rounded-full filter blur-3xl pointer-events-none" style={{ animation: 'pulse-glow 6s ease-in-out infinite 2s' }}></div>

                <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="space-y-8">
                        {/* Section 1: Introduction */}
                        <div className="home-dark-card p-8">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 bg-emerald-500/15 border border-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 text-sm">1</span>
                                Introduction
                            </h2>
                            <p className="text-slate-400 leading-relaxed">
                                Welcome to CareerVerse. We are committed to protecting your personal information and your right to privacy.
                                If you have any questions or concerns about our policy, or our practices with regards to your personal
                                information, please contact us at privacy@careerverse.com.
                            </p>
                        </div>

                        {/* Section 2: Information We Collect */}
                        <div className="home-dark-card p-8">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 bg-emerald-500/15 border border-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 text-sm">2</span>
                                Information We Collect
                            </h2>
                            <p className="text-slate-400 leading-relaxed mb-4">We collect personal information that you provide to us when you register on our platform:</p>
                            <ul className="list-disc pl-6 space-y-2 text-slate-400">
                                <li><strong className="text-emerald-300">Personal Details:</strong> Name, email address, and profile picture.</li>
                                <li><strong className="text-emerald-300">Simulation Data:</strong> Records of your interactions within the 3D simulations, including transcripts and choices made.</li>
                                <li><strong className="text-emerald-300">Performance Metrics:</strong> Skill scores, performance evaluations, and career matching data generated by our AI.</li>
                                <li><strong className="text-emerald-300">Log Data:</strong> IP addresses, browser types, and usage statistics.</li>
                            </ul>
                        </div>

                        {/* Section 3: How We Use Your Information */}
                        <div className="home-dark-card p-8">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 bg-emerald-500/15 border border-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 text-sm">3</span>
                                How We Use Your Information
                            </h2>
                            <p className="text-slate-400 leading-relaxed mb-4">We use the information we collect for various purposes, including:</p>
                            <ul className="list-disc pl-6 space-y-2 text-slate-400">
                                <li>To provide and manage your account and access to simulations.</li>
                                <li>To power our AI Recommendation Engine for personalized career discovery.</li>
                                <li>To generate detailed performance reports and skill analytics.</li>
                                <li>To improve our platform, simulations, and user experience.</li>
                                <li>To communicate with you regarding updates or support.</li>
                            </ul>
                        </div>

                        {/* Section 4: Data Protection & Security */}
                        <div className="home-dark-card p-8">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 bg-emerald-500/15 border border-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 text-sm">4</span>
                                Data Protection & Security
                            </h2>
                            <p className="text-slate-400 leading-relaxed">
                                We use Firebase Authentication and Firestore to ensure your data is stored securely.
                                While we strive to use commercially acceptable means to protect your personal information,
                                we cannot guarantee its absolute security.
                            </p>
                        </div>

                        {/* Section 5: AI & Privacy */}
                        <div className="home-dark-card p-8">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 bg-emerald-500/15 border border-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 text-sm">5</span>
                                AI & Privacy
                            </h2>
                            <p className="text-slate-400 leading-relaxed">
                                Our platform uses Google Gemini AI to analyze simulation transcripts. This analysis
                                is performed to provide you with feedback and recommendations. We do not use your personal
                                data to train third-party AI models.
                            </p>
                        </div>

                        {/* Section 6: Changes to This Policy */}
                        <div className="home-dark-card p-8">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 bg-emerald-500/15 border border-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 text-sm">6</span>
                                Changes to This Policy
                            </h2>
                            <p className="text-slate-400 leading-relaxed">
                                We may update our Privacy Policy from time to time. We will notify you of any changes by
                                posting the new Privacy Policy on this page and updating the "Last Updated" date.
                            </p>
                            <p className="mt-8 text-sm text-slate-500">
                                Last Updated: February 20, 2026
                            </p>
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
