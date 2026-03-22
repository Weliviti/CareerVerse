import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const SimulationPlayer = () => {
    const { type } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [isEvaluating, setIsEvaluating] = useState(false);
    const [evalStatus, setEvalStatus] = useState("");
    const [firebaseToken, setFirebaseToken] = useState("");

    // Fetch a real Firebase token on mount so we can pass it to Unity
    useEffect(() => {
        if (currentUser) {
            currentUser.getIdToken().then(token => setFirebaseToken(token));
        }
    }, [currentUser]);

    // --- SESSION ID SYNC ---
    // We generate a unique ID once and keep it stable for the whole simulation.
    // This ensures the ID in your Firestore screenshot matches the one we evaluate.
    const [sessionId] = useState(() => {
        const randomHex = Math.random().toString(16).substring(2, 10);
        return `session_${randomHex}`;
    });

    const getGamePath = (simType) => {
        if (simType === 'diagnostician') return '/games/doctor-sim/index.html';
        // Add other simulation mappings here in the future
        return '/games/teacher-sim/index.html';
    };

    const handleFinishAndEvaluate = async () => {
        const confirmEnd = window.confirm(
            "End the session? The AI will now grade your performance based on your conversation."
        );

        if (confirmEnd) {
            setIsEvaluating(true);
            setEvalStatus("Finding your session...");

            try {
                // Step 1: Ask the backend for the user's real active session ID.
                // The backend uses Firebase Admin SDK (bypasses Firestore security rules).
                let actualSessionId = sessionId; // fallback

                try {
                    const sessionRes = await api.get("/api/sessions/current");
                    if (sessionRes.data?.success && sessionRes.data?.data?.session_id) {
                        actualSessionId = sessionRes.data.data.session_id;
                        console.log("Using real session ID from backend:", actualSessionId);
                    }
                } catch (sessionErr) {
                    console.warn("Could not fetch current session, using fallback:", sessionErr.message);
                }

                setEvalStatus("Analyzing performance with AI...");

                // Step 2: Evaluate with the real session ID
                const response = await api.post("/api/evaluate", { session_id: actualSessionId });
                const result = response.data;

                if (result.success) {
                    setEvalStatus("Success! Redirecting to your results...");
                    localStorage.setItem("latestSimulationScore", JSON.stringify(result));
                    setTimeout(() => { navigate("/simulation/results"); }, 1500);
                } else {
                    throw new Error(result.message || "Evaluation service returned an error.");
                }
            } catch (error) {
                console.error("Evaluation Error:", error);
                setEvalStatus("");
                alert(`Error: ${error.message}`);
            } finally {
                setIsEvaluating(false);
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-950 flex flex-col z-50 font-sans">
            {/* Header */}
            <div className="bg-slate-900 p-4 flex justify-between items-center h-16 border-b border-slate-800 shadow-xl">
                <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-teal-500 rounded-lg flex items-center justify-center font-black text-slate-900 text-xs">CV</div>
                    <h1 className="text-teal-400 font-black tracking-tighter text-lg uppercase">CareerVerse Simulation</h1>
                </div>

                <div className="flex items-center gap-4">
                    {evalStatus && (
                        <span className="text-[10px] text-teal-500 font-bold uppercase animate-pulse">
                            {evalStatus}
                        </span>
                    )}

                    <button
                        onClick={handleFinishAndEvaluate}
                        disabled={isEvaluating}
                        className={`
                            px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all
                            ${isEvaluating
                                ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                                : "bg-red-600 hover:bg-red-500 text-white shadow-lg shadow-red-900/20 active:scale-95"}
                        `}
                    >
                        {isEvaluating ? "Analyzing..." : "Finish & Evaluate"}
                    </button>
                </div>
            </div>

            {/* Unity Simulation Container */}
            <div className="flex-1 bg-black relative">
                {!firebaseToken ? (
                    /* Wait for the real token before loading Unity */
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                        <div className="relative mb-6">
                            <div className="w-14 h-14 border-2 border-teal-500/20 rounded-full"></div>
                            <div className="absolute top-0 w-14 h-14 border-t-2 border-teal-500 rounded-full animate-spin"></div>
                        </div>
                        <p className="text-teal-400 font-black text-[10px] tracking-[0.4em] uppercase animate-pulse">
                            Authenticating...
                        </p>
                    </div>
                ) : (
                    <>
                        <iframe
                            title={`${type} Simulation`}
                            src={`${getGamePath(type)}?session=${sessionId}&token=${firebaseToken}`}
                            className="w-full h-full border-none"
                            allow="autoplay; fullscreen"
                        />
                        {!isEvaluating && (
                            <div className="absolute bottom-4 left-4 pointer-events-none">
                                <div className="bg-slate-900/80 backdrop-blur-md px-3 py-1 rounded text-[9px] text-slate-400 font-mono border border-white/5">
                                    ID: {sessionId}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default SimulationPlayer;