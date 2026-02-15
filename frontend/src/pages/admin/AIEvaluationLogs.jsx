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
                icon: '✅' // Placeholder icon
            };
        case 'info':
            return {
                bg: 'bg-blue-50',
                border: 'border-blue-100',
                text: 'text-blue-700',
                icon: 'ℹ️'
            };
        case 'warning':
            return {
                bg: 'bg-yellow-50',
                border: 'border-yellow-100',
                text: 'text-yellow-700',
                icon: '⚠️'
            };
        case 'error':
            return {
                bg: 'bg-red-50',
                border: 'border-red-100',
                text: 'text-red-700',
                icon: '🚫'
            };
        default:
            return {
                bg: 'bg-gray-50',
                border: 'border-gray-100',
                text: 'text-gray-700',
                icon: '📝'
            };
    }
};

const LogItem = ({ log }) => {
    const styles = getStatusStyles(log.type);

    return (
        <div className={`p-4 mb-3 rounded-lg border ${styles.bg} ${styles.border} flex items-start gap-3`}>
            <span className="text-xl mt-0.5">{styles.icon}</span>
            <div>
                <div className={`text-xs font-semibold uppercase tracking-wider mb-1 ${styles.text} flex items-center gap-2`}>
                    {log.type} <span className="text-gray-400 font-normal normal-case">🕒 {log.timestamp}</span>
                </div>
                <p className={`${styles.text} font-medium`}>{log.message}</p>
            </div>
        </div>
    );
};

const AIEvaluationLogs = () => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-800">AI Evaluation Logs</h1>
            <p className="text-gray-600 mt-2">Monitor AI performance and evaluation results</p>

            <div className="mt-8 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h2 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                    📄 AI Evaluation Activities
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
