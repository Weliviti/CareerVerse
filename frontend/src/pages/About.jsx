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

            <Footer />
        </div>
    );
}

export default About;
