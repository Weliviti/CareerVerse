import React from 'react';

const SessionHistoryItem = ({ title, rating, date, duration, skills, themeColor = "teal" }) => {
    // Map theme color names to CSS classes
    const colorMap = {
        teal: {
            bg: 'bg-teal-50',
            text: 'text-teal-700',
            border: 'border-teal-100',
            badge: 'bg-teal-100 text-teal-700'
        },
        blue: {
            bg: 'bg-blue-50',
            text: 'text-blue-700',
            border: 'border-blue-100',
            badge: 'bg-blue-100 text-blue-700'
        },
        indigo: {
            bg: 'bg-indigo-50',
            text: 'text-indigo-700',
            border: 'border-indigo-100',
            badge: 'bg-indigo-100 text-indigo-700'
        }
    };

    const theme = colorMap[themeColor] || colorMap.teal;

    return (
        <div className="bg-white border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Left Side: Title & Meta */}
            <div>
                <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-bold text-gray-900">{title}</h4>
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${theme.badge}`}>
                        {rating}
                    </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {duration}
                    </div>
                    <div>{date}</div>
                </div>
            </div>

            {/* Right Side: Skill Scores */}
            <div className="flex flex-wrap gap-x-6 gap-y-2">
                {skills.map((skill, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                        <span className="text-gray-600 font-medium">{skill.name}:</span>
                        <span className={`font-bold ${theme.text}`}>{skill.score}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SessionHistoryItem;
