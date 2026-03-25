import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BackToTop from '../components/ui/BackToTop';
import Footer from '../components/Footer'; // Assuming Footer component exists based on SimulationHub
import { useAuth } from '../context/AuthContext';
import { useScore } from '../hooks/useScore';
import { useSession } from '../hooks/useSession';
import { useState, useEffect, useMemo } from 'react';
import api from '../services/api';
import CareerCard from '../components/CareerCard';
import SessionHistoryItem from '../components/SessionHistoryItem';

function Dashboard() {
    const { currentUser } = useAuth();
    const { scores, loading: scoresLoading } = useScore(currentUser?.uid);
    const { sessions, loading: sessionsLoading } = useSession(currentUser?.uid);
    const navigate = useNavigate();


    const [aiRecommendations, setAiRecommendations] = useState([]);
    const [recommendationsLoading, setRecommendationsLoading] = useState(false);

    useEffect(() => {
        const fetchRecommendations = async () => {
            if (!currentUser?.uid) return;

            setRecommendationsLoading(true);
            try {
                const response = await api.get(`/api/recommendations/user/${currentUser.uid}`);
                if (response.data && response.data.data) {
                    setAiRecommendations(response.data.data);
                }
            } catch (error) {
                console.error("Failed to fetch AI career recommendations:", error);
            } finally {
                setRecommendationsLoading(false);
            }
        };

        if (currentUser?.uid && !scoresLoading && !sessionsLoading) {
            fetchRecommendations();
        }
    }, [currentUser?.uid, scoresLoading, sessionsLoading]);

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

    const handleExportReport = () => {
        if (!sessions || sessions.length === 0) return;

        const completedSessions = sessions.filter(s => s.status === 'completed');
        if (completedSessions.length === 0) return;

        let reportContent = "=================================================\n";
        reportContent += "              CAREERVERSE SESSION TRANSCRIPTS\n";
        reportContent += "=================================================\n\n";

        // Sort by most recent first
        const sortedSessions = [...completedSessions].sort((a, b) => {
            const dateA = a.start_time?.toDate ? a.start_time.toDate() : new Date(a.start_time);
            const dateB = b.start_time?.toDate ? b.start_time.toDate() : new Date(b.start_time);
            return dateB - dateA;
        });

        sortedSessions.forEach((session, index) => {
            const date = session.start_time?.toDate ? session.start_time.toDate() : new Date(session.start_time);
            const dateStr = date.toLocaleDateString('en-US', {
                weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
            });

            reportContent += `--- SESSION ${index + 1} -----------\n`;
            reportContent += `ROLE: ${session.simulation_type.toUpperCase()}\n`;
            reportContent += `DATE: ${dateStr}\n`;

            // Add scores if they exist
            const sessionScore = scores?.find(s => s.sessionId === session.session_id);
            if (sessionScore) {
                reportContent += `TOTAL SCORE: ${sessionScore.totalScore}\n`;
                if (sessionScore.skills) {
                    reportContent += `SKILLS: ${Object.entries(sessionScore.skills).map(([k, v]) => `${k} (${v})`).join(', ')}\n`;
                }
            }

            reportContent += `\n[TRANSCRIPT]\n`;

            if (session.transcript && Array.isArray(session.transcript) && session.transcript.length > 0) {
                session.transcript.forEach(msg => {
                    const role = msg.role.toUpperCase();
                    // Some older messages might use 'content' instead of 'message'
                    const text = msg.message || msg.content || "";
                    reportContent += `${role}: ${text}\n`;
                });
            } else {
                reportContent += `(No transcript available for this session)\n`;
            }

            reportContent += `\n=================================================\n\n`;
        });

        // Trigger download
        const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `CareerVerse_Transcripts_${new Date().toISOString().split('T')[0]}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };


    return (
        <div className="home-dark min-h-screen">
            {/* ── Parallax glow orbs ── */}
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
            </div>

            <Navbar />

            <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                {/* Loading State */}
                {(scoresLoading || sessionsLoading) && (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-400"></div>
                    </div>
                )}

                {/* Main Content */}
                {!scoresLoading && !sessionsLoading && (
                    <>
                        {/* Header Section */}
                        <div className="mb-10">
                            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-emerald-700/40 bg-emerald-950/40 mb-5">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                                <span className="text-xs font-semibold text-emerald-300 tracking-wide">Your Progress</span>
                            </div>
                            <h1 className="text-4xl font-extrabold text-white mb-2 tracking-tight">
                                Your Career{' '}
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300 italic">Dashboard</span>
                            </h1>
                            <p className="text-slate-400 text-lg">
                                Track your progress and discover your ideal career path
                            </p>
                        </div>


                        {/* Career Recommendations Section */}
                        <div className="mb-12">
                            <div className="home-dark-card p-6 h-full">
                                <h3 className="text-lg font-bold text-white mb-1">AI Career Recommendations</h3>
                                <p className="text-slate-400 text-sm mb-6">Personalized paths based on your simulation history</p>

                                {/* Career Recommendations List */}
                                <div className="space-y-4">
                                    {recommendationsLoading ? (
                                        <div className="flex justify-center items-center py-10">
                                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-400"></div>
                                        </div>
                                    ) : aiRecommendations && aiRecommendations.length > 0 ? (
                                        aiRecommendations.map((rec, index) => (
                                            <CareerCard
                                                key={rec.rank || index}
                                                rank={rec.rank || index + 1}
                                                title={rec.title}
                                                matchPercentage={rec.matchPercentage}
                                                description={rec.description}
                                                skills={rec.skills}
                                                colorClass={rec.colorClass}
                                            />
                                        ))
                                    ) : (
                                        <div className="text-center py-10">
                                            <p className="text-slate-400">Complete simulations to get personalized career recommendations from AI.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Session History Section */}
                        <div className="home-dark-card p-6 mb-12">
                            <div className="flex justify-between items-center mb-6">
                                <div>
                                    <h3 className="text-lg font-bold text-white">Session History</h3>
                                    <p className="text-slate-400 text-sm">Your past simulation performances</p>
                                </div>
                                <button
                                    onClick={handleExportReport}
                                    className="flex items-center gap-2 px-4 py-2 bg-white/[0.04] border border-emerald-500/30 text-emerald-400 rounded-lg hover:bg-emerald-500/10 transition-colors font-medium text-sm"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                                    </svg>
                                    Export Transcripts
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
                        <div className="relative rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6 text-white mb-12 overflow-hidden" style={{ background: 'linear-gradient(135deg, #064e3b 0%, #0d9488 50%, #065f46 100%)' }}>
                            {/* Decorative glow orbs */}
                            <div className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 w-64 h-64 bg-white opacity-5 rounded-full blur-3xl pointer-events-none"></div>
                            <div className="absolute bottom-0 left-0 -translate-x-1/3 translate-y-1/3 w-64 h-64 bg-emerald-900 opacity-20 rounded-full blur-3xl pointer-events-none"></div>

                            <div className="relative">
                                <h2 className="text-2xl font-bold mb-2 text-white">Ready for More Simulations?</h2>
                                <p className="text-emerald-100/70 text-lg">
                                    Continue your journey and refine your career recommendations
                                </p>
                            </div>
                            <button
                                onClick={() => { window.scrollTo(0, 0); navigate('/simulation-hub'); }}
                                className="relative hero-btn-primary whitespace-nowrap flex items-center gap-2"
                                style={{ background: 'linear-gradient(135deg, #00e5a0, #00c98d)', boxShadow: '0 4px 20px rgba(0,229,160,0.3)' }}
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
