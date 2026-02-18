import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const SimulationHub = () => {
    const navigate = useNavigate();
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

                {/* Available Simulations Section */}
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Available Simulations</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* The Educator */}
                        <div className="bg-white rounded-3xl border-2 border-blue-500 overflow-hidden shadow-sm flex flex-col h-full">
                            <div className="p-8 flex-1">
                                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 mb-6">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" />
                                        <path d="M6 12v5c3 3 9 3 12 0v-5" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">The Educator</h3>
                                <p className="text-gray-700 font-medium mb-4">Teach a 10th Grade English Class</p>
                                <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                                    Guide students through a lesson on Shakespeare's Romeo and Juliet. Handle classroom dynamics, answer questions, and inspire learning.
                                </p>
                                <div className="flex flex-wrap gap-2 mb-8">
                                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">Empathy</span>
                                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">Clarity</span>
                                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">Classroom Control</span>
                                </div>
                            </div>
                            <div className="px-8 pb-8">
                                <div className="flex items-center justify-between mb-6 text-sm">
                                    <div className="flex items-center text-gray-500 gap-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        20 minutes
                                    </div>
                                    <span className="px-3 py-1 bg-gray-100 text-gray-600 font-bold rounded-lg text-xs">Medium</span>
                                </div>
                                <button
                                    onClick={() => navigate('/simulation/play/educator')}
                                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
                                >
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.333-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                    </svg>
                                    Launch Simulation
                                </button>
                            </div>
                        </div>

                        {/* The Diagnostician */}
                        <div className="bg-white rounded-3xl border-2 border-emerald-500 overflow-hidden shadow-sm flex flex-col h-full">
                            <div className="p-8 flex-1">
                                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500 mb-6">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">The Diagnostician</h3>
                                <p className="text-gray-700 font-medium mb-4">Diagnose a Complex Medical Case</p>
                                <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                                    Interview a patient, analyze symptoms, order tests, and reach a diagnosis. Balance empathy with analytical thinking under pressure.
                                </p>
                                <div className="flex flex-wrap gap-2 mb-8">
                                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">Diagnostic Logic</span>
                                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">Empathy</span>
                                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">Communication</span>
                                </div>
                            </div>
                            <div className="px-8 pb-8">
                                <div className="flex items-center justify-between mb-6 text-sm">
                                    <div className="flex items-center text-gray-500 gap-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        20 minutes
                                    </div>
                                    <span className="px-3 py-1 bg-red-500 text-white font-bold rounded-lg text-xs">Hard</span>
                                </div>
                                <button
                                    onClick={() => navigate('/simulation/play/diagnostician')}
                                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
                                >
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.333-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                    </svg>
                                    Launch Simulation
                                </button>
                            </div>
                        </div>

                        {/* The Advocate */}
                        <div className="bg-white rounded-3xl border-2 border-orange-500 overflow-hidden shadow-sm flex flex-col h-full">
                            <div className="p-8 flex-1">
                                <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-500 mb-6">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">The Advocate</h3>
                                <p className="text-gray-700 font-medium mb-4">Defend a Client in Court</p>
                                <p className="text-gray-500 text-sm mb-6 leading-relaxed">
                                    Navigate a courtroom setting, present arguments, cross-examine witnesses, and advocate for your client's best interests.
                                </p>
                                <div className="flex flex-wrap gap-2 mb-8">
                                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">Persuasion</span>
                                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">Logical Acumen</span>
                                    <span className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">Negotiation</span>
                                </div>
                            </div>
                            <div className="px-8 pb-8">
                                <div className="flex items-center justify-between mb-6 text-sm">
                                    <div className="flex items-center text-gray-500 gap-1">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        20 minutes
                                    </div>
                                    <span className="px-3 py-1 bg-red-500 text-white font-bold rounded-lg text-xs">Hard</span>
                                </div>
                                <button
                                    onClick={() => navigate('/simulation/play/advocate')}
                                    className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2"
                                >
                                    <svg className="w-5 h-5 fill-current" viewBox="0 0 20 20">
                                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.333-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                    </svg>
                                    Launch Simulation
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CTA Banner Section */}
                <div className="mt-16 bg-teal-600 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 text-white shadow-xl shadow-teal-100">
                    <div>
                        <h2 className="text-2xl font-bold mb-2 text-white">Complete All Three Simulations</h2>
                        <p className="text-teal-50 opacity-90 text-lg">
                            Get comprehensive career recommendations by completing all simulation paths
                        </p>
                    </div>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="bg-white text-teal-600 hover:bg-teal-50 font-bold px-8 py-4 rounded-2xl transition-all shadow-md whitespace-nowrap"
                    >
                        View Dashboard
                    </button>
                </div>

            </main>

            <Footer />
        </div>
    );
};

export default SimulationHub;
