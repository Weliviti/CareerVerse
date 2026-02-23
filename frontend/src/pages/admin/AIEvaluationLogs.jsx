import React, { useState, useEffect } from 'react';
import { db } from '../../services/firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';

// Helper for styles based on type
const getStatusStyles = (type) => {
    switch (type.toLowerCase()) {
        case 'success':
            return {
                bg: 'bg-green-50',
                border: 'border-green-100',
                text: 'text-green-700',
                iconColor: 'text-green-500',
                icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                )
            };
        case 'info':
            return {
                bg: 'bg-blue-50',
                border: 'border-blue-100',
                text: 'text-blue-700',
                iconColor: 'text-blue-500',
                icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                )
            };
        case 'warning':
            return {
                bg: 'bg-orange-50',
                border: 'border-orange-100',
                text: 'text-orange-700',
                iconColor: 'text-orange-500',
                icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                )
            };
        case 'error':
            return {
                bg: 'bg-red-50',
                border: 'border-red-100',
                text: 'text-red-700',
                iconColor: 'text-red-500',
                icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                )
            };
        default:
            return {
                bg: 'bg-gray-50',
                border: 'border-gray-100',
                text: 'text-gray-700',
                iconColor: 'text-gray-500',
                icon: null
            };
    }
};

const LogItem = ({ log }) => {
    const styles = getStatusStyles(log.type);

    return (
        <div className={`p-4 rounded-lg border ${styles.bg} ${styles.border} flex items-start gap-3`}>
            <div className={`mt-0.5 ${styles.iconColor}`}>
                {styles.icon}
            </div>
            <div className="flex-1">
                <div className={`text-xs font-semibold uppercase tracking-wider mb-1 ${styles.text} flex items-center gap-2`}>
                    {log.type.toUpperCase()}
                    <span className="text-gray-400 font-normal normal-case flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {log.timestamp}
                    </span>
                </div>
                <p className={`${styles.text} font-medium`}>{log.message}</p>
            </div>
        </div>
    );
};

const AIEvaluationLogs = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchLogs();
    }, []);

    const fetchLogs = async () => {
        try {
            setLoading(true);
            setError(null);

            // 1. Fetch scores as Success logs
            const scoresRef = collection(db, 'scores');
            const scoresQuery = query(scoresRef, orderBy('created_at', 'desc'), limit(30));
            const scoresSnapshot = await getDocs(scoresQuery);

            const scoreLogs = scoresSnapshot.docs.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    type: 'success',
                    timestamp: data.created_at?.toDate?.().toLocaleString() || 'Unknown',
                    message: `AI evaluation completed for ${data.simulation_type || 'Unknown'} - Score: ${data.total_score || 0}/100`,
                    rawDate: data.created_at?.toDate?.() || new Date(0)
                };
            });

            // 2. Fetch general logs if any
            const genLogsRef = collection(db, 'logs');
            const genLogsQuery = query(genLogsRef, orderBy('timestamp', 'desc'), limit(30));
            let systemLogs = [];
            try {
                const genLogsSnapshot = await getDocs(genLogsQuery);
                systemLogs = genLogsSnapshot.docs.map(doc => {
                    const data = doc.data();
                    return {
                        id: doc.id,
                        type: data.type || 'info',
                        timestamp: data.timestamp?.toDate?.().toLocaleString() || 'Unknown',
                        message: data.message || 'System event log',
                        rawDate: data.timestamp?.toDate?.() || new Date(0)
                    };
                });
            } catch (loggingErr) {
                console.warn('Logging collection might not exist yet:', loggingErr);
                // Non-critical, continue with scores only
            }

            // Combine and sort
            const combined = [...scoreLogs, ...systemLogs].sort((a, b) => b.rawDate - a.rawDate);
            setLogs(combined);
        } catch (err) {
            console.error('Error fetching AI evaluation logs:', err);
            setError('Failed to load logs. Ensure Firestore rules are updated and indices exist.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-5xl">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800">AI Evaluation Logs</h1>
                <p className="text-gray-600 mt-2">Monitor AI performance and evaluation results</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 min-h-[400px]">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                        <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        AI Evaluation Activities
                    </h2>
                    <button
                        onClick={fetchLogs}
                        disabled={loading}
                        className="text-sm text-teal-600 hover:text-teal-700 font-medium flex items-center gap-1 disabled:opacity-50"
                    >
                        <svg className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Refresh
                    </button>
                </div>

                <div className="space-y-4">
                    {loading ? (
                        <div className="flex flex-col items-center justify-center py-20">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600 mb-2"></div>
                            <p className="text-gray-500 text-sm">Fetching real-time logs...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-20 bg-red-50 rounded-xl border border-red-100">
                            <p className="text-red-600 text-sm mb-4">{error}</p>
                            <button
                                onClick={fetchLogs}
                                className="px-4 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700"
                            >
                                Retry
                            </button>
                        </div>
                    ) : logs.length === 0 ? (
                        <div className="text-center py-20 text-gray-500 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                            <p>No evaluation logs found yet.</p>
                            <p className="text-xs mt-1 text-gray-400">Scores will appear here once users complete simulations.</p>
                        </div>
                    ) : (
                        logs.map(log => (
                            <LogItem key={log.id} log={log} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default AIEvaluationLogs;
