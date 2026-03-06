import React from 'react';

const CareerCard = ({ rank, title, matchPercentage, description, skills, colorClass = "bg-teal-500" }) => {
    // Determine badge color based on match percentage or rank if needed
    // For now, using the card's theme color logic or fixed colors as per design

    return (
        <div className="bg-white/[0.04] rounded-xl border border-white/[0.06] p-5 hover:border-emerald-500/20 hover:bg-white/[0.06] transition-all flex gap-4">
            {/* Rank Box */}
            <div className={`flex-shrink-0 w-10 h-10 ${colorClass} rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm`}>
                {rank}
            </div>

            {/* Content */}
            <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-bold text-white">{title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-bold text-white ${colorClass}`}>
                        {matchPercentage}%
                    </span>
                </div>

                <p className="text-slate-400 text-sm mb-4 leading-relaxed">
                    {description}
                </p>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-white/5 border border-white/10 text-slate-300 text-xs font-semibold rounded-full">
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CareerCard;
