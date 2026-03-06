import React from 'react';

const SessionHistoryItem = ({ title, rating, date, duration, skills, themeColor = "teal" }) => {
    // Map theme color names to dark-theme CSS classes
    const colorMap = {
        teal: {
            bg: 'bg-emerald-500/10',
            text: 'text-emerald-400',
            border: 'border-emerald-500/20',
            badge: 'bg-emerald-500/15 text-emerald-400'
        },
        blue: {
            bg: 'bg-blue-500/10',
            text: 'text-blue-400',
            border: 'border-blue-500/20',
            badge: 'bg-blue-500/15 text-blue-400'
        },
        indigo: {
            bg: 'bg-indigo-500/10',
            text: 'text-indigo-400',
            border: 'border-indigo-500/20',
            badge: 'bg-indigo-500/15 text-indigo-400'
        }
    };

    const theme = colorMap[themeColor] || colorMap.teal;

    return (
        <div className="bg-white/[0.04] border border-white/[0.06] rounded-xl p-4 hover:border-emerald-500/20 hover:bg-white/[0.06] transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Left Side: Title & Meta */}
            <div>
                <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-bold text-white">{title}</h4>
                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${theme.badge}`}>
                        {rating}
                    </span>
                </div>
                <div className="flex items-center gap-4 text-sm text-slate-500">
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
                        <span className="text-slate-400 font-medium">{skill.name}:</span>
                        <span className={`font-bold ${theme.text}`}>{skill.score}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SessionHistoryItem;
