import React, { useState, useEffect, useRef, createContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
const SimulationPlayer = () => {
    const { type } = useParams(); // 'doctor', 'teacher', or 'diagnostician'
    const navigate = useNavigate();
    const { currentUser } = useAuth();
    const [loading, setLoading] = useState(true);
    const [iframeUrl, setIframeUrl] = useState("");
    const iframeRef = useRef(null);

    useEffect(() => {
        // --- THE BRIDGE: Listening for Unity's evaluation result ---
        const handleMessage = (event) => {
            if (event.data.type === 'SIM_RESULTS') {
                console.log("React: Results received from Unity!");
                try {
                    const rawJson = event.data.isBase64 ? atob(event.data.data) : event.data.data;
                    localStorage.setItem("latestSimulationScore", rawJson);
                    navigate("/simulation/results");
                } catch (err) {
                    console.error("Error decoding Unity results:", err);
                }
            }
        };

        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, [navigate]);

    useEffect(() => {
        const initGame = async () => {
            if (currentUser) {
                try {
                    const token = await currentUser.getIdToken();

                    // --- FIX: IMPROVED MAPPING ---
                    // We check for 'doctor' OR 'diagnostician' to point to the doctor-sim folder
                    const isDoctor = type?.toLowerCase() === 'doctor' || type?.toLowerCase() === 'diagnostician';
                    const gameFolder = isDoctor ? 'doctor-sim' : 'teacher-sim';

                    const sessionId = `sess_${type}_${Date.now()}`;

                    // Construct the URL to your Unity index.html
                    // Double check that your folder in /public/games/ is named exactly 'doctor-sim'
                    const url = `/games/${gameFolder}/index.html?token=${token}&session=${sessionId}`;

                    console.log(`Loading Simulation: ${type} from folder: ${gameFolder}`);
                    setIframeUrl(url);

                    // Give Unity 5 seconds to show its own splash screen before hiding our loader
                    setTimeout(() => setLoading(false), 5000);
                } catch (error) {
                    console.error("Error getting user token:", error);
                }
            }
        };
        initGame();
    }, [type, currentUser]);

    const handleSmartExit = () => {
        if (iframeRef.current && iframeRef.current.contentWindow) {
            try {
                const iframeWin = iframeRef.current.contentWindow;
                // 'unityInstance' must be exposed in your Unity index.html
                if (iframeWin.unityInstance) {
                    iframeWin.unityInstance.SendMessage('SessionManager', 'ForceEndFromReact');
                    setLoading(true);
                } else {
                    if (window.confirm("Simulation still loading. Exit to Dashboard?")) {
                        navigate('/dashboard');
                    }
                }
            } catch {
                navigate('/dashboard');
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-slate-950 flex flex-col z-50 font-sans text-white">
            {/* Header Navigation */}
            <div className="bg-slate-900 p-4 flex justify-between items-center h-16 border-b border-slate-800 shadow-2xl">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/simulation-hub')} className="p-2 hover:bg-slate-800 rounded-full transition-all">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5 text-teal-400">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                        </svg>
                    </button>
                    <div>
                        <h1 className="font-black text-xs uppercase tracking-[0.2em] text-teal-400 leading-none">
                            CareerVerse Simulation
                        </h1>
                        <p className="text-[9px] text-slate-500 font-bold uppercase mt-1">
                            Environment: {type?.toUpperCase()} ACTIVE
                        </p>
                    </div>
                </div>

                <button
                    onClick={handleSmartExit}
                    className="bg-red-600 hover:bg-red-500 text-white px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-red-900/40 border border-red-500/50"
                >
                    Finish & Evaluate
                </button>
            </div>

            {/* Main Game Viewport */}
            <div className="flex-1 relative bg-black overflow-hidden">
                {loading && (
                    <div className="absolute inset-0 bg-slate-950 flex flex-col items-center justify-center z-50">
                        <div className="relative">
                            <div className="w-16 h-16 border-2 border-teal-500/20 rounded-full"></div>
                            <div className="absolute top-0 w-16 h-16 border-t-2 border-teal-500 rounded-full animate-spin"></div>
                        </div>
                        <p className="mt-8 text-teal-500 font-black text-[10px] tracking-[0.4em] uppercase animate-pulse">
                            Syncing Neural Interface...
                        </p>
                    </div>
                )}

                {iframeUrl && (
                    <iframe
                        ref={iframeRef}
                        src={iframeUrl}
                        className="w-full h-full border-none bg-black"
                        title="CareerVerse Simulation Viewport"
                        allow="autoplay; fullscreen; microphone"
                    />
                )}
            </div>
        </div>
    );
};

export default SimulationPlayer;