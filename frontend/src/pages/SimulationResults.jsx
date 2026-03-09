import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SimulationResults = () => {
    const [evalData] = useState(() => {
        const saved = localStorage.getItem("latestSimulationScore");
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                // Structure: { success: true, data: { scores: {...}, feedback: "..." } }
                return parsed.data;
            } catch (e) {
                console.error("Failed to parse stored results", e);
            }
        }
        return null;
    });
    const navigate = useNavigate();

    if (!evalData) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <p className="text-gray-500 mb-4">Waiting for simulation data...</p>
                <button onClick={() => navigate('/dashboard')} className="text-teal-600 underline">Return to Dashboard</button>
            </div>
        );
    }

    const { scores, feedback } = evalData;

    return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 flex items-center justify-center">
            <div className="max-w-3xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-100">
                {/* Header Score Circle */}
                <div className="bg-teal-600 p-10 text-center text-white relative">
                    <h1 className="text-3xl font-black mb-4">Simulation Results</h1>
                    <div className="inline-flex items-center justify-center p-8 bg-white/10 rounded-full border-4 border-white/20">
                        <span className="text-7xl font-bold">{scores.total_score}</span>
                        <span className="text-2xl font-medium opacity-70 ml-1">%</span>
                    </div>
                    <p className="mt-4 text-teal-100 uppercase tracking-widest text-sm font-bold">Aptitude Score</p>
                </div>

                <div className="p-8 space-y-8">
                    {/* Skills Grid */}
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 mb-4">Core Competencies</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <SkillBar label="Communication" score={scores.communication} color="bg-blue-500" />
                            <SkillBar label="Empathy" score={scores.empathy} color="bg-pink-500" />
                            <SkillBar label="Problem Solving" score={scores.problem_solving} color="bg-orange-500" />
                            <SkillBar label="Management" score={scores.classroom_management} color="bg-teal-500" />
                        </div>
                    </div>

                    {/* AI Feedback */}
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                        <div className="flex items-center gap-2 mb-3">
                            <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                            <h3 className="font-bold text-slate-800">AI Mentor Feedback</h3>
                        </div>
                        <p className="text-slate-600 leading-relaxed italic">"{feedback}"</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                        <button
                            onClick={() => navigate('/dashboard')}
                            className="flex-1 bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-black transition-all shadow-lg"
                        >
                            View Dashboard
                        </button>
                        <button
                            onClick={() => navigate('/simulation-hub')}
                            className="px-8 bg-white border-2 border-slate-200 text-slate-600 py-4 rounded-xl font-bold hover:bg-slate-50 transition-all"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

const SkillBar = ({ label, score, color }) => (
    <div className="bg-white border border-slate-100 p-4 rounded-xl">
        <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-bold text-slate-500 uppercase tracking-tight">{label}</span>
            <span className="text-sm font-black text-slate-800">{score}%</span>
        </div>
        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
            <div
                className={`${color} h-full transition-all duration-1000 ease-out`}
                style={{ width: `${score}%` }}
            ></div>
        </div>
    </div>
);

export default SimulationResults;