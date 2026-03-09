import Navbar from '../components/Navbar';
import BackToTop from '../components/ui/BackToTop';
import Footer from '../components/Footer';

function TermsOfService() {
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
                            <span className="text-sm font-semibold text-emerald-300 tracking-wide">📜 Legal Documentation</span>
                        </div>

                        {/* Main Heading */}
                        <h1 className="hero-heading mb-6">
                            <span className="block text-white">Terms of</span>
                            <span className="block hero-heading-accent">Service</span>
                        </h1>

                        {/* Description */}
                        <p className="max-w-2xl mx-auto text-base sm:text-lg text-slate-400 mb-12 leading-relaxed">
                            Welcome to CareerVerse! These Terms of Service govern your use of our platform and simulations.
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
                        {/* Section 1: Acceptance of Terms */}
                        <div className="home-dark-card p-8">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 bg-emerald-500/15 border border-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 text-sm">1</span>
                                Acceptance of Terms
                            </h2>
                            <p className="text-slate-400 leading-relaxed">
                                By accessing or using CareerVerse, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site.
                            </p>
                        </div>

                        {/* Section 2: Eligibility */}
                        <div className="home-dark-card p-8">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 bg-emerald-500/15 border border-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 text-sm">2</span>
                                Eligibility
                            </h2>
                            <p className="text-slate-400 leading-relaxed">
                                You must be at least 13 years of age to use the Service. By agreeing to these Terms, you represent and warrant to us that: (a) you are at least 13 years old; (b) you have not previously been suspended or removed from the Service; and (c) your registration and your use of the Service is in compliance with all applicable laws and regulations.
                            </p>
                        </div>

                        {/* Section 3: User Accounts & Security */}
                        <div className="home-dark-card p-8">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 bg-emerald-500/15 border border-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 text-sm">3</span>
                                User Accounts & Security
                            </h2>
                            <p className="text-slate-400 leading-relaxed">
                                When you create an account with us, you must provide information that is accurate, complete, and current at all times. Failure to do so constitutes a breach of the Terms, which may result in immediate termination of your account. You are responsible for safeguarding the password that you use to access the Service and for any activities or actions under your password.
                            </p>
                        </div>

                        {/* Section 4: AI-Powered Simulations */}
                        <div className="home-dark-card p-8">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 bg-emerald-500/15 border border-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 text-sm">4</span>
                                AI-Powered Simulations & Data
                            </h2>
                            <p className="text-slate-400 leading-relaxed mb-4">
                                CareerVerse uses advanced Google Gemini AI to power its career simulations and evaluation engine. By using these simulations, you understand and agree that:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-slate-400">
                                <li><strong className="text-emerald-300">Transcripts:</strong> Your interactions within the 3D simulations are recorded as text transcripts for AI analysis.</li>
                                <li><strong className="text-emerald-300">Evaluation:</strong> AI models generate performance scores and career recommendations based on these transcripts.</li>
                                <li><strong className="text-emerald-300">Data Use:</strong> We use this data to provide you with insights into your natural aptitudes and career matches as described in our Privacy Policy.</li>
                            </ul>
                        </div>

                        {/* Section 5: Intellectual Property */}
                        <div className="home-dark-card p-8">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 bg-emerald-500/15 border border-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 text-sm">5</span>
                                Intellectual Property
                            </h2>
                            <p className="text-slate-400 leading-relaxed">
                                The Service and its original content (excluding User Content), features, and functionality are and will remain the exclusive property of CareerVerse and its licensors. The Service is protected by copyright, trademark, and other laws. Our trademarks and trade dress may not be used in connection with any product or service without the prior written consent of CareerVerse.
                            </p>
                        </div>

                        {/* Section 6: User Conduct */}
                        <div className="home-dark-card p-8">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 bg-emerald-500/15 border border-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 text-sm">6</span>
                                User Conduct
                            </h2>
                            <p className="text-slate-400 leading-relaxed mb-4">
                                You agree not to use the Service:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-slate-400">
                                <li>In any way that violates any applicable local, state, national, or international law or regulation.</li>
                                <li>For the purpose of exploiting, harming, or attempting to exploit or harm minors in any way by exposing them to inappropriate content or otherwise.</li>
                                <li>To transmit, or procure the sending of, any advertising or promotional material, including any "junk mail", "chain letter", "spam", or any other similar solicitation.</li>
                                <li>To impersonate or attempt to impersonate the Company, a Company employee, another user, or any other person or entity.</li>
                            </ul>
                        </div>

                        {/* Section 7: Privacy & Data */}
                        <div className="home-dark-card p-8">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 bg-emerald-500/15 border border-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 text-sm">7</span>
                                Privacy & Data
                            </h2>
                            <p className="text-slate-400 leading-relaxed">
                                Your use of the Service is also governed by our Privacy Policy, which is incorporated into these Terms by reference. Please review our <a href="/privacy" className="text-emerald-400 hover:text-emerald-300 font-medium underline underline-offset-4 transition-colors">Privacy Policy</a> to understand how we collect, use, and share your information.
                            </p>
                        </div>

                        {/* Section 8: Disclaimers & Warranties */}
                        <div className="home-dark-card p-8">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 bg-emerald-500/15 border border-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 text-sm">8</span>
                                Disclaimers & Warranties
                            </h2>
                            <p className="text-slate-400 leading-relaxed">
                                The Service is provided on an "AS IS" and "AS AVAILABLE" basis. CareerVerse makes no representations or warranties of any kind, express or implied, as to the operation of their services, or the information, content, or materials included therein. You expressly agree that your use of these services, their content, and any services or items obtained from us is at your sole risk.
                            </p>
                        </div>

                        {/* Section 9: Limitation of Liability */}
                        <div className="home-dark-card p-8">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 bg-emerald-500/15 border border-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 text-sm">9</span>
                                Limitation of Liability
                            </h2>
                            <p className="text-slate-400 leading-relaxed">
                                In no event shall CareerVerse, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of your transmissions or content.
                            </p>
                        </div>

                        {/* Section 10: Changes to Terms */}
                        <div className="home-dark-card p-8">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 bg-emerald-500/15 border border-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 text-sm">10</span>
                                Changes to Terms
                            </h2>
                            <p className="text-slate-400 leading-relaxed">
                                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days' notice prior to any new terms taking effect. What constitutes a material change will be determined at our sole discretion. By continuing to access or use our Service after those revisions become effective, you agree to be bound by the revised terms.
                            </p>
                        </div>

                        {/* Contact Us */}
                        <div className="home-dark-card p-8">
                            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 bg-emerald-500/15 border border-emerald-500/20 rounded-lg flex items-center justify-center text-emerald-400 text-sm">11</span>
                                Contact Us
                            </h2>
                            <p className="text-slate-400 leading-relaxed mb-4">
                                If you have any questions about these Terms, please contact us:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-slate-400">
                                <li>By email: <a href="mailto:careerverselk@gmail.com" className="text-emerald-400 hover:text-emerald-300 font-medium underline underline-offset-4 transition-colors">careerverselk@gmail.com</a></li>
                                <li>By visiting the Contact page on our website</li>
                            </ul>
                            <p className="mt-8 text-sm text-slate-500">
                                Last Updated: February 27, 2026
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

export default TermsOfService;
