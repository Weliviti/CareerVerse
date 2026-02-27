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
