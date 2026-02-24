import Navbar from '../components/Navbar';
import BackToTop from '../components/ui/BackToTop';
import Footer from '../components/Footer';

function OurTeam() {
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
                            👥 Meet the Creators
                        </span>

                        {/* Main Heading */}
                        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-gray-900 tracking-tight mb-6 leading-[1.1]">
                            Our{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-600 to-emerald-500 italic">
                                Team
                            </span>
                        </h1>

                        {/* Description */}
                        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-500 mb-14 leading-relaxed">
                            Meet the passionate team of innovators behind CareerVerse, dedicated to
                            revolutionizing career discovery through cutting-edge AI and immersive technology.
                        </p>
                    </div>
                </div>
            </section>

            <BackToTop />
            <Footer />
        </div>
    );
}

export default OurTeam;
