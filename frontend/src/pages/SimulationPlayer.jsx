import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, BrowserRouter, Routes, Route } from 'react-router-dom';

// 1. UNCOMMENT the next two lines so your app uses your REAL Firebase:
import { auth } from '../services/firebase'; 
import { onAuthStateChanged } from 'firebase/auth';

// 2. DELETE these mock functions (they only exist so this preview doesn't crash):
// const auth = { currentUser: { uid: 'test' } };
// const onAuthStateChanged = (a, cb) => { 
//     cb({ uid: 'test', getIdToken: async () => 'mock_token' }); 
//     return () => {}; 
// };
// =========================================================================

const SimulationPlayerInner = () => {
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
                try {
                    // We decode Base64 here so JSON newlines don't crash the browser
                    const rawJson = event.data.isBase64 ? atob(event.data.data) : event.data.data;
                    localStorage.setItem("latestSimulationScore", rawJson);
                    navigate("/simulation/results");
                } catch (err) {
                    console.error("Error saving data:", err);
                }
            }
        };

        window.addEventListener("message", handleMessage);
        return () => window.removeEventListener("message", handleMessage);
    }, [navigate]);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const token = await user.getIdToken();
                const gameFolder = type === 'educator' ? 'teacher' : (type ? type.toLowerCase() : 'teacher');
                setIframeUrl(`/games/${gameFolder}-sim/index.html?token=${token}&session=sess_${Date.now()}`);
                setTimeout(() => setLoading(false), 2000);
            } else {
                navigate('/login');
            }
        });
        return () => unsubscribe();
    }, [type, navigate]);

    // This function tells Unity: "Hey, finish the game and send scores!"
    const handleSmartExit = () => {
        if (iframeRef.current && iframeRef.current.contentWindow) {
            try {
                // --- THE FIX: Look inside the iframe window! ---
                const iframeWindow = iframeRef.current.contentWindow;
                const unityInstance = iframeWindow.unityInstance; 

                if (unityInstance) {
                    unityInstance.SendMessage('SessionManager', 'ForceEndFromReact');
                    setLoading(true); // Show loading while AI grades
                } else {
                    // Fallback if game hasn't finished loading
                    if (window.confirm("Game not fully loaded. Exit anyway?")) {
                        navigate('/dashboard');
                    }
                }
            } catch (e) {
                navigate('/dashboard');
            }
        }
    };

    return (
        <div className="fixed inset-0 bg-black flex flex-col z-50">
            <div className="bg-gray-900 text-white p-4 flex justify-between items-center h-16 border-b border-gray-800">
                <h1 className="font-bold tracking-tight">CareerVerse: {type || 'Simulation'}</h1>
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
                        allow="autoplay; fullscreen; microphone"
                    />
                )}
            </div>
        </div>
    );
};

// Fallback wrapper so the standalone preview environment doesn't crash without a router context
const SimulationPlayer = () => {
    if (typeof window !== 'undefined' && !window.location.pathname.includes('/simulation/play/')) {
       return (
           <BrowserRouter>
               <Routes>
                   <Route path="*" element={<SimulationPlayerInner />} />
               </Routes>
           </BrowserRouter>
       );
    }
    return <SimulationPlayerInner />;
};

export default SimulationPlayer;