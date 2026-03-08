import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { auth } from '../services/firebase';
import { onAuthStateChanged } from 'firebase/auth';

const SimulationPlayer = () => {
    const { type } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [iframeUrl, setIframeUrl] = useState("");
    const iframeRef = useRef(null);

    useEffect(() => {
        // --- THE BRIDGE: Listening for Unity's evaluation result ---
        const handleMessage = (event) => {
            if (event.data.type === 'SIM_RESULTS') {
                console.log("React: Results received from Unity!");
                localStorage.setItem("latestSimulationScore", event.data.data);
                navigate("/simulation/results");
            }
        };

        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, [navigate]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const token = await user.getIdToken();
                const gameFolder = type === 'educator' ? 'teacher' : type.toLowerCase();
                setIframeUrl(`/games/${gameFolder}-sim/index.html?token=${token}&session=sess_${Date.now()}`);
                setTimeout(() => setLoading(false), 2000);
            } else {
                navigate('/login');
            }
        });
        return () => unsubscribe();
    }, [type, navigate]);

    // This function tells Unity: "Hey, finish the game and send scores!"
    const closeAndRedirectOpener = () => {
        // Navigate the original tab (SimulationHub) to the dashboard
        if (window.opener && !window.opener.closed) {
            window.opener.location.href = '/dashboard';
        }
        // Close this game tab
        window.close();
        // Fallback if browser blocks window.close()
        setTimeout(() => navigate('/dashboard'), 500);
    };

    const handleSmartExit = () => {
        if (iframeRef.current && iframeRef.current.contentWindow) {
            try {
                const unityInstance = window.unityInstance;
                if (unityInstance) {
                    unityInstance.SendMessage('SessionManager', 'ForceEndFromReact');
                    setLoading(true);
                } else {
                    if (window.confirm("Exit without saving scores?")) {
                        closeAndRedirectOpener();
                    }
                }
            } catch (e) {
                closeAndRedirectOpener();
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black flex flex-col z-50">
            <div className="bg-gray-900 text-white p-4 flex justify-between items-center h-16 border-b border-gray-800">
                <h1 className="font-bold tracking-tight">CareerVerse: {type}</h1>
                <button
                    onClick={handleSmartExit}
                    className="bg-red-600 hover:bg-red-700 px-6 py-1.5 rounded-lg text-sm font-bold shadow-lg transition-all"
                >
                    Finish & Exit
                </button>
            </div>

            <div className="flex-1 relative bg-gray-950">
                {loading && (
                    <div className="absolute inset-0 bg-gray-900 flex flex-col items-center justify-center z-50">
                        <div className="w-12 h-12 border-4 border-t-teal-500 border-gray-700 rounded-full animate-spin mb-4"></div>
                        <p className="text-white font-medium animate-pulse">Calculating Final AI Evaluation...</p>
                    </div>
                )}

                {iframeUrl && (
                    <iframe
                        ref={iframeRef}
                        src={iframeUrl}
                        className="w-full h-full border-none"
                        title="Unity Simulation"
                    />
                )}
            </div>
        </div>
    );
};

export default SimulationPlayer;