import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BackToTop from '../components/ui/BackToTop';
import Footer from '../components/Footer'; // Assuming Footer component exists based on SimulationHub
import { useAuth } from '../context/AuthContext';
import { useScore } from '../hooks/useScore';
import { useSession } from '../hooks/useSession';
import { useMemo } from 'react';
import SkillRadarChart from '../components/RadarChart';
import CareerCard from '../components/CareerCard';
import SessionHistoryItem from '../components/SessionHistoryItem';

function Dashboard() {
    const { currentUser } = useAuth();
    const { scores, loading: scoresLoading } = useScore(currentUser?.uid);
    const { sessions, loading: sessionsLoading } = useSession(currentUser?.uid);
    const navigate = useNavigate();

    // Derive stats from real Firebase data (useMemo avoids setState-in-effect)
    const stats = useMemo(() => {
        if (!sessions || !scores) return { totalSimulations: 0, averageScore: 0, timeInvested: '0m', completion: 0 };

        const completedSessions = sessions.filter(s => s.status === 'completed');
        const totalSimulations = completedSessions.length;

        let averageScore = 0;
        if (scores.length > 0) {
            const totalScore = scores.reduce((acc, curr) => acc + (curr.totalScore || 0), 0);
            averageScore = Math.round(totalScore / scores.length);
        }

        let totalMinutes = 0;
        completedSessions.forEach(session => {
            if (session.start_time && session.end_time) {
                const startTime = session.start_time.toDate ? session.start_time.toDate() : new Date(session.start_time);
                const endTime = session.end_time.toDate ? session.end_time.toDate() : new Date(session.end_time);
                totalMinutes += (endTime - startTime) / (1000 * 60);
            }
        });

        let timeInvested = '0m';
        if (totalMinutes >= 60) {
            const hours = Math.floor(totalMinutes / 60);
            const minutes = Math.round(totalMinutes % 60);
            timeInvested = minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`;
        } else if (totalMinutes > 0) {
            timeInvested = `${Math.round(totalMinutes)}m`;
        }

        const availableSimulations = 2;
        const uniqueSimulations = new Set(completedSessions.map(s => s.simulation_type)).size;
        const completion = Math.round((uniqueSimulations / availableSimulations) * 100);

        return { totalSimulations, averageScore, timeInvested, completion };
    }, [sessions, scores]);

    // Derive radar chart data from scores
    const radarData = useMemo(() => {
        if (!scores || scores.length === 0) return [];

        const skillsMap = {};
        scores.forEach(score => {
            if (score.skills) {
                Object.entries(score.skills).forEach(([skill, value]) => {
                    if (!skillsMap[skill]) {
                        skillsMap[skill] = { total: 0, count: 0 };
                    }
                    skillsMap[skill].total += value;
                    skillsMap[skill].count += 1;
                });
            }
        });

        return Object.entries(skillsMap).map(([skill, data]) => ({
            subject: skill,
            A: Math.round(data.total / data.count),
            fullMark: 100
        }));
    }, [scores]);

    // Derive session history from sessions + scores
    const sessionHistory = useMemo(() => {
        if (!sessions || !scores) return [];

        const completedSessions = sessions.filter(s => s.status === 'completed');

        return completedSessions
            .map(session => {
                const sessionScore = scores.find(s => s.sessionId === session.session_id);
                if (!sessionScore) return null;

                const startTime = session.start_time.toDate ? session.start_time.toDate() : new Date(session.start_time);
                const dateStr = startTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

                const endTime = session.end_time.toDate ? session.end_time.toDate() : new Date(session.end_time);
                const durationMinutes = Math.round((endTime - startTime) / (1000 * 60));
                const duration = `${durationMinutes} minute${durationMinutes !== 1 ? 's' : ''}`;

                let rating = 'Good';
                if (sessionScore.totalScore >= 90) rating = 'Excellent';
                else if (sessionScore.totalScore >= 80) rating = 'Very Good';
                else if (sessionScore.totalScore >= 70) rating = 'Good';
                else if (sessionScore.totalScore >= 60) rating = 'Fair';
                else rating = 'Needs Improvement';

                let themeColor = 'blue';
                let title = session.simulation_type;
                if (session.simulation_type === 'teacher') {
                    themeColor = 'indigo';
                    title = 'The Educator';
                } else if (session.simulation_type === 'doctor') {
                    themeColor = 'blue';
                    title = 'The Diagnostician';
                }

                const skills = sessionScore.skills
                    ? Object.entries(sessionScore.skills).map(([name, score]) => ({ name, score }))
                    : [];

                return {
                    id: session.session_id,
                    title,
                    rating,
                    date: dateStr,
                    duration,
                    themeColor,
                    skills
                };
            })
            .filter(item => item !== null)
            .sort((a, b) => new Date(b.date) - new Date(a.date));
    }, [sessions, scores]);

    // Mock data for Career Recommendations
    const recommendations = [
        {
            rank: 1,
            title: 'Lawyer',
            matchPercentage: 92,
            description: 'Your strong persuasion and logical reasoning skills make you an excellent fit for legal advocacy.',
            skills: ['Persuasion', 'Logic', 'Clarity'],
            colorClass: 'bg-teal-500'
        },
        {
            rank: 2,
            title: 'Doctor',
            matchPercentage: 88,
            description: 'Your empathy combined with analytical problem-solving abilities align well with medical practice.',
            skills: ['Empathy', 'Problem Solving', 'Stress Handling'],
            colorClass: 'bg-blue-500'
        },
        {
            rank: 3,
            title: 'Teacher',
            matchPercentage: 84,
            description: 'Your clarity in communication and natural empathy make you well-suited for education.',
            skills: ['Clarity', 'Empathy', 'Communication'],
            colorClass: 'bg-purple-500'
        }
    ];


    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <Navbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Loading State */}
                {(scoresLoading || sessionsLoading) && (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-500"></div>
                    </div>
                )}

                {/* Main Content */}
                {!scoresLoading && !sessionsLoading && (
                    <>
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
                                    {/* Gaming Console Icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.087c0-.355.186-.676.401-.959.221-.29.349-.634.349-1.003 0-1.036-1.007-1.875-2.25-1.875s-2.25.84-2.25 1.875c0 .369.128.713.349 1.003.215.283.401.604.401.959v0a.64.64 0 01-.657.643 48.39 48.39 0 01-4.163-.3c.186 1.613.293 3.25.315 4.907a.656.656 0 01-.658.663v0c-.355 0-.676-.186-.959-.401a1.647 1.647 0 00-1.003-.349c-1.036 0-1.875 1.007-1.875 2.25s.84 2.25 1.875 2.25c.369 0 .713-.128 1.003-.349.283-.215.604-.401.959-.401v0c.31 0 .555.26.532.57a48.039 48.039 0 01-.642 5.056c1.518.19 3.058.309 4.616.354a.64.64 0 00.657-.643v0c0-.355-.186-.676-.401-.959a1.647 1.647 0 01-.349-1.003c0-1.035 1.008-1.875 2.25-1.875 1.243 0 2.25.84 2.25 1.875 0 .369-.128.713-.349 1.003-.215.283-.4.604-.4.959v0c0 .333.277.599.61.58a48.1 48.1 0 005.427-.63 48.05 48.05 0 00.582-4.717.532.532 0 00-.533-.57v0c-.355 0-.676.186-.959.401-.29.221-.634.349-1.003.349-1.035 0-1.875-1.007-1.875-2.25s.84-2.25 1.875-2.25c.37 0 .713.128 1.003.349.283.215.604.401.96.401v0a.656.656 0 00.658-.663 48.422 48.422 0 00-.37-5.36c-1.886.342-3.81.574-5.766.689a.578.578 0 01-.61-.58v0z" />
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
                                    {/* Checkmark Circle Icon */}
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
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

                            {/* Session History List */}
                            <div className="space-y-4">
                                {sessionHistory.map((session) => (
                                    <SessionHistoryItem
                                        key={session.id}
                                        title={session.title}
                                        rating={session.rating}
                                        date={session.date}
                                        duration={session.duration}
                                        skills={session.skills}
                                        themeColor={session.themeColor}
                                    />
                                ))}
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
                                onClick={() => { window.scrollTo(0, 0); navigate('/simulation-hub'); }}
                                className="bg-white text-teal-600 hover:bg-teal-50 font-bold px-8 py-3 rounded-xl transition-all shadow-md whitespace-nowrap flex items-center gap-2"
                            >
                                Go to Hub
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                                </svg>
                            </button>
                        </div>
                    </>
                )}

            </main>

            <BackToTop />
            <Footer />
        </div>
    );
}

export default Dashboard;
