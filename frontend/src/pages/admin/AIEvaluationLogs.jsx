import React from 'react';

// Mock Data
const mockLogs = [
    {
        id: 1,
        type: 'success',
        timestamp: '2025-11-30 14:35:22',
        title: 'AI evaluation completed for Technical Interview - Score: 85/100',
        message: 'AI evaluation completed for Technical Interview - Score: 85/100' // Keeping title/message same for now based on image layout
    },
    {
        id: 2,
        type: 'info',
        timestamp: '2025-11-30 14:32:18',
        title: 'Processing natural language response for behavioral assessment',
        message: 'Processing natural language response for behavioral assessment'
    },
    {
        id: 3,
        type: 'success',
        timestamp: '2025-11-30 14:28:45',
        title: 'Skill scoring algorithm completed - Communication: 78/100',
        message: 'Skill scoring algorithm completed - Communication: 78/100'
    },
    {
        id: 4,
        type: 'warning',
        timestamp: '2025-11-30 14:20:33',
        title: 'AI model response time exceeded 2 seconds - Performance degradation detected',
        message: 'AI model response time exceeded 2 seconds - Performance degradation detected'
    },
    {
        id: 5,
        type: 'success',
        timestamp: '2025-11-30 14:15:55',
        title: 'System design evaluation completed with detailed feedback',
        message: 'System design evaluation completed with detailed feedback'
    },
    {
        id: 6,
        type: 'error',
        timestamp: '2025-11-30 14:10:12',
        title: 'Evaluation failed - retrying',
        message: 'Error processing request'
    }
];

// Helper for styles based on type
const getStatusStyles = (type) => {
    switch (type) {
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
    return (
        <div className="max-w-5xl">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-800">AI Evaluation Logs</h1>
                <p className="text-gray-600 mt-2">Monitor AI performance and evaluation results</p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-700 mb-6 flex items-center gap-2">
                    <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    AI Evaluation Activities
                </h2>
                <div className="space-y-4">
                    {mockLogs.map(log => (
                        <LogItem key={log.id} log={log} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default AIEvaluationLogs;
