import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SimulationHub = () => {
    const { currentUser } = useAuth();
    const userName = currentUser?.displayName || currentUser?.email?.split('@')[0] || 'User';

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Header Section */}
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Welcome back, <span className="text-teal-500">{userName}</span>
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Choose a simulation to discover your natural career aptitude
                    </p>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {/* Completed Card */}
                    <div className="bg-blue-50 p-6 rounded-2xl flex items-center justify-between border border-blue-100">
                        <div>
                            <p className="text-gray-600 font-medium mb-1">Completed</p>
                            <h3 className="text-3xl font-bold text-gray-900">3</h3>
                        </div>
                        <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                            </svg>
                        </div>
                    </div>

                    {/* Avg Score Card */}
                    <div className="bg-emerald-50 p-6 rounded-2xl flex items-center justify-between border border-emerald-100">
                        <div>
                            <p className="text-gray-600 font-medium mb-1">Avg Score</p>
                            <h3 className="text-3xl font-bold text-gray-900">86%</h3>
                        </div>
                        <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-emerald-200">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>

                    {/* Total Time Card */}
                    <div className="bg-amber-50 p-6 rounded-2xl flex items-center justify-between border border-amber-100">
                        <div>
                            <p className="text-gray-600 font-medium mb-1">Total Time</p>
                            <h3 className="text-3xl font-bold text-gray-900">57m</h3>
                        </div>
                        <div className="w-12 h-12 bg-amber-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-amber-200">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Simulations Section Placeholder */}
                <div className="mb-12">
                    {/* Simulations will go here */}
                </div>

            </main>

            <Footer />
        </div>
    );
};

export default SimulationHub;
