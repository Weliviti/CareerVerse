import React from 'react';

const CareerCard = ({ rank, title, matchPercentage, description, skills, colorClass = "bg-teal-500" }) => {
    // Determine badge color based on match percentage or rank if needed
    // For now, using the card's theme color logic or fixed colors as per design

    return (
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm hover:shadow-md transition-all flex gap-4">
            {/* Rank Box */}
            <div className={`flex-shrink-0 w-10 h-10 ${colorClass} rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-sm`}>
                {rank}
            </div>

            {/* Content */}
            <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                    <h4 className="text-lg font-bold text-gray-900">{title}</h4>
                    <span className={`px-2 py-1 rounded-full text-xs font-bold text-white ${colorClass}`}>
                        {matchPercentage}%
                    </span>
                </div>

                <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {description}
                </p>

                {/* Skills Tags */}
                <div className="flex flex-wrap gap-2">
                    {skills.map((skill, index) => (
                        <span key={index} className="px-3 py-1 bg-gray-100 text-gray-600 text-xs font-semibold rounded-full">
                            {skill}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CareerCard;
