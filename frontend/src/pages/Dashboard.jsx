import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer'; // Assuming Footer component exists based on SimulationHub
import { useAuth } from '../context/AuthContext';
import { useScore } from '../hooks/useScore';
import { useState, useEffect } from 'react';
import SkillRadarChart from '../components/RadarChart';
import CareerCard from '../components/CareerCard';

function Dashboard() {
    const { currentUser } = useAuth();
    const { scores, loading } = useScore(currentUser?.uid);
    const navigate = useNavigate();

    // Mock aggregate data for now (stats logic would typically be in a hook or service)
    const [stats, setStats] = useState({
        totalSimulations: 3,
        averageScore: 86,
        timeInvested: '57m',
        completion: 100
    });

    // Mock data for Radar Chart
    const radarData = [
        { subject: 'Empathy', A: 85, fullMark: 100 },
        { subject: 'Logic', A: 72, fullMark: 100 },
        { subject: 'Persuasion', A: 70, fullMark: 100 },
        { subject: 'Clarity', A: 82, fullMark: 100 },
        { subject: 'Problem Solving', A: 78, fullMark: 100 },
        { subject: 'Stress Handling', A: 65, fullMark: 100 },
    ];

    // Mock data for Career Recommendations
    const recommendations = [
        {
            rank: 1,
            title: 'Lawyer',
            matchPercentage: 92,
            description: 'Your strong persuasion and logical reasoning skills make you an excellent fit for legal advocacy.',
            skills: ['Persuasion', 'Logic', 'Clarity'],
            colorClass: 'bg-teal-500' // Using teal/green for top match
        },
        {
            rank: 2,
            title: 'Doctor',
            matchPercentage: 88,
            description: 'Your empathy combined with analytical problem-solving abilities align well with medical practice.',
            skills: ['Empathy', 'Problem Solving', 'Stress Handling'],
            colorClass: 'bg-blue-500' // Blue for second
        },
        {
            rank: 3,
            title: 'Teacher',
            matchPercentage: 84,
            description: 'Your clarity in communication and natural empathy make you well-suited for education.',
            skills: ['Clarity', 'Empathy', 'Communication'],
            colorClass: 'bg-purple-500' // Purple for third
        }
    ];

    useEffect(() => {
        if (scores && scores.length > 0) {
            // Basic calculation logic if scores are available
            const total = scores.length;
            const avg = Math.round(scores.reduce((acc, curr) => acc + (curr.totalScore || 0), 0) / total);
            // Mock for time and completion for now as they aren't in score object explicitly yet
            setStats(prev => ({
                ...prev,
                totalSimulations: total,
                averageScore: avg
            }));
        }
    }, [scores]);


    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Header Section */}
                <div className="mb-10">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">
                        Your Career <span className="text-teal-500">Dashboard</span>
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Track your progress and discover your ideal career path
                    </p>
                </div>

                {/* Stats Cards Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {/* Total Simulations Card - Mint/Turquoise */}
                    <div className="bg-teal-50 p-6 rounded-2xl flex items-center justify-between border border-teal-100 shadow-sm hover:shadow-md transition-shadow">
                        <div>
                            <p className="text-gray-600 font-medium text-sm mb-1">Total Simulations</p>
                            <h3 className="text-3xl font-bold text-gray-900">{stats.totalSimulations}</h3>
                        </div>
                        <div className="w-12 h-12 bg-transparent text-teal-500 flex items-center justify-center">
                            {/* Trophy Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /> {/* Placeholder bar chart icon, looks like trophy in context or just use generic achievement */}
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                {/* Actually let's use a real trophy path if possible or similar */}
                            </svg>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0V5.625a2.25 2.25 0 10-4.5 0v5.625M12 3.75v-1.5" />
                            </svg>
                        </div>
                    </div>

                    {/* Average Score Card - Light Blue */}
                    <div className="bg-blue-50 p-6 rounded-2xl flex items-center justify-between border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
                        <div>
                            <p className="text-gray-600 font-medium text-sm mb-1">Average Score</p>
                            <h3 className="text-3xl font-bold text-gray-900">{stats.averageScore}%</h3>
                        </div>
                        <div className="w-12 h-12 text-blue-500 flex items-center justify-center">
                            {/* Trending Up Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
                            </svg>
                        </div>
                    </div>

                    {/* Time Invested Card - Light Purple */}
                    <div className="bg-purple-50 p-6 rounded-2xl flex items-center justify-between border border-purple-100 shadow-sm hover:shadow-md transition-shadow">
                        <div>
                            <p className="text-gray-600 font-medium text-sm mb-1">Time Invested</p>
                            <h3 className="text-3xl font-bold text-gray-900">{stats.timeInvested}</h3>
                        </div>
                        <div className="w-12 h-12 text-purple-500 flex items-center justify-center">
                            {/* Clock Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                    </div>

                    {/* Completion Card - Light Yellow/Amber */}
                    <div className="bg-amber-50 p-6 rounded-2xl flex items-center justify-between border border-amber-100 shadow-sm hover:shadow-md transition-shadow">
                        <div>
                            <p className="text-gray-600 font-medium text-sm mb-1">Completion</p>
                            <h3 className="text-3xl font-bold text-gray-900">{stats.completion}%</h3>
                        </div>
                        <div className="w-12 h-12 text-amber-500 flex items-center justify-center">
                            {/* Medal/Award Icon */}
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0V5.625a2.25 2.25 0 10-4.5 0v5.625M12 3.75v-1.5" />
                            </svg>
                        </div>
                    </div>
                </div>

                {/* Dashboard Grid Content - Left (Radar) & Right (Recommendations) */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
                    {/* Left Column: Skill Analysis Radar Chart (Span 2) */}
                    {/* Left Column: Skill Analysis Radar Chart (Span 2) */}
                    <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full flex flex-col">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">Skill Analysis</h3>
                        <p className="text-gray-500 text-sm mb-6">Your performance across different skill dimensions</p>

                        {/* Radar Chart Component */}
                        <div className="flex-1 min-h-[300px] flex items-center justify-center">
                            <SkillRadarChart data={radarData} />
                        </div>
                    </div>

                    {/* Right Column: Career Recommendations (Span 3) */}
                    <div className="lg:col-span-3 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full">
                        <h3 className="text-lg font-bold text-gray-900 mb-1">Career Recommendations</h3>
                        <p className="text-gray-500 text-sm mb-6">Based on your simulation performance</p>

                        {/* Career Recommendations List */}
                        <div className="space-y-4">
                            {recommendations.map((rec) => (
                                <CareerCard
                                    key={rec.rank}
                                    rank={rec.rank}
                                    title={rec.title}
                                    matchPercentage={rec.matchPercentage}
                                    description={rec.description}
                                    skills={rec.skills}
                                    colorClass={rec.colorClass}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Session History Section */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 mb-12">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900">Session History</h3>
                            <p className="text-gray-500 text-sm">Your past simulation performances</p>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-teal-500 text-teal-600 rounded-lg hover:bg-teal-50 transition-colors font-medium text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                            </svg>
                            Export Report
                        </button>
                    </div>

                    {/* Placeholder for Phase 4: Session List */}
                    <div className="flex items-center justify-center h-32 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                        <p className="text-gray-400 font-medium">Session History Coming Soon (Phase 4)</p>
                    </div>
                </div>

                {/* Bottom CTA Banner */}
                <div className="bg-gradient-to-r from-teal-500 to-emerald-500 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 text-white shadow-xl shadow-teal-100 mb-12">
                    <div>
                        <h2 className="text-2xl font-bold mb-2 text-white">Ready for More Simulations?</h2>
                        <p className="text-teal-50 opacity-90 text-lg">
                            Continue your journey and refine your career recommendations
                        </p>
                    </div>
                    <button
                        onClick={() => navigate('/simulation-hub')}  // Assuming this route exists based on context
                        className="bg-white text-teal-600 hover:bg-teal-50 font-bold px-8 py-3 rounded-xl transition-all shadow-md whitespace-nowrap flex items-center gap-2"
                    >
                        Go to Hub
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                        </svg>
                    </button>
                </div>

            </main>

            <Footer />
        </div>
    );
}

export default Dashboard;
