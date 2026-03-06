import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const SimulationResults = () => {
  const [resultData, setResultData] = useState(null);

  useEffect(() => {
    // Read the score that SimulationPlayer just saved!
    const savedData = localStorage.getItem("latestSimulationScore");
    if (savedData) {
      setResultData(JSON.parse(savedData));
    }
  }, []);

  if (!resultData) {
    return <div className="min-h-screen flex items-center justify-center">Loading Results...</div>;
  }

  // Extract the score from your specific JSON structure
  const finalScore = resultData.data?.score || 0;

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl overflow-hidden text-center p-10">
        
        <div className="mb-6">
          <h1 className="text-4xl font-extrabold text-gray-900">Simulation Complete!</h1>
          <p className="text-gray-500 mt-2">The AI has evaluated your performance.</p>
        </div>

        <div className="my-8 relative inline-flex items-center justify-center">
          <svg className="w-48 h-48 transform -rotate-90">
            <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-gray-200" />
            <circle 
              cx="96" cy="96" r="88" 
              stroke="currentColor" strokeWidth="12" fill="transparent" 
              className={finalScore >= 80 ? "text-green-500" : finalScore >= 50 ? "text-yellow-500" : "text-red-500"}
              strokeDasharray={88 * 2 * Math.PI}
              strokeDashoffset={(88 * 2 * Math.PI) - ((finalScore / 100) * (88 * 2 * Math.PI))}
            />
          </svg>
          <div className="absolute flex flex-col items-center justify-center">
            <span className="text-5xl font-black text-gray-800">{finalScore}</span>
            <span className="text-sm text-gray-500 font-bold">/ 100</span>
          </div>
        </div>

        <div className="mt-8 flex justify-center gap-4">
          <Link to="/dashboard" className="px-6 py-3 bg-teal-600 text-white font-bold rounded-lg hover:bg-teal-700 transition">
            Go to Dashboard
          </Link>
          <Link to="/simulation-hub" className="px-6 py-3 bg-gray-200 text-gray-800 font-bold rounded-lg hover:bg-gray-300 transition">
            Try Another Simulation
          </Link>
        </div>

      </div>
    </div>
  );
};

export default SimulationResults;