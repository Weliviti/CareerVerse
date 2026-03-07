import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, BrowserRouter, Routes, Route } from 'react-router-dom';

// =========================================================================
// 🛑 ACTION REQUIRED WHEN YOU COPY THIS TO YOUR PROJECT 🛑
// =========================================================================
// 1. UNCOMMENT the next two lines so your app uses your REAL Firebase:
import { auth } from '../services/firebase'; 
import { onAuthStateChanged } from 'firebase/auth';

// 2. DELETE these two mock lines (they are only here so this preview doesn't crash):
// const auth = { currentUser: null }; 
// const onAuthStateChanged = (a, cb) => { return () => {}; }; 
// =========================================================================


const SimulationPlayerInner = () => {
    const { type } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [iframeUrl, setIframeUrl] = useState(""); 
    const iframeRef = useRef(null);

    // Validate simulation type
    const isValidType = ['educator', 'diagnostician', 'advocate'].includes(type?.toLowerCase());

    // Unity-to-React Communication Listener
    useEffect(() => {
        window.ReceiveEvaluationScores = (scoreJsonString) => {
            console.log("React received score from Unity:", scoreJsonString);
            try {
                const parsedData = JSON.parse(scoreJsonString);
                localStorage.setItem("latestSimulationScore", JSON.stringify(parsedData));
                navigate("/simulation/results");
            } catch (error) {
                console.error("Failed to parse score JSON from Unity", error);
            }
        };

        return () => {
            delete window.ReceiveEvaluationScores;
        };
    }, [navigate]);

    // Setup the Secure URL with the REAL Firebase Token
    useEffect(() => {
        if (!isValidType) return;

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                try {
                    // Get the REAL secure token from Google
                    const token = await user.getIdToken(true);
                    
                    // Generate a unique Session ID
                    const uniqueSessionId = "sess_" + Date.now();

                    // Map the route 'type' to your actual Unity build folders
                    let gameFolder = type.toLowerCase();
                    if (gameFolder === 'educator') gameFolder = 'teacher';
                    if (gameFolder === 'diagnostician') gameFolder = 'doctor';
                    if (gameFolder === 'advocate') gameFolder = 'lawyer';

                    // Construct the final secure URL for the iframe
                    const securePath = `/games/${gameFolder}-sim/index.html?token=${token}&session=${uniqueSessionId}`;
                    setIframeUrl(securePath);
                    
                    setTimeout(() => setLoading(false), 1500);
                } catch (error) {
                    console.error("Error getting Firebase token:", error);
                    setLoading(false);
                }
            } else {
                console.error("User is not logged in! Redirecting to login...");
                navigate('/login');
            }
        });

        // Cleanup listener
        return () => unsubscribe();
    }, [type, isValidType, navigate]);

    const handleExit = () => {
        if (window.confirm('Are you sure you want to exit? Your progress may not be saved.')) {
            navigate('/simulation-hub');
        }
    };

    const getSimulationTitle = () => {
        switch (type?.toLowerCase()) {
            case 'educator': return 'The Educator';
            case 'diagnostician': return 'The Diagnostician';
            case 'advocate': return 'The Advocate';
            default: return 'Simulation';
        }
    };

    if (!isValidType) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
                <div className="bg-white p-8 rounded-xl shadow-lg text-center max-w-md w-full border border-red-100">
                    <div className="w-16 h-16 mx-auto bg-red-100 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Invalid Simulation</h2>
                    <p className="text-gray-600 mb-6">Invalid simulation type. Please choose a valid simulation from the hub.</p>
                    <button 
                        onClick={() => navigate('/simulation-hub')}
                        className="bg-gray-900 hover:bg-gray-800 text-white font-medium py-2.5 px-6 rounded-lg transition-colors w-full"
                    >
                        Return to Hub
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
            <div className="bg-gray-900 text-white px-6 py-3 flex items-center justify-between shadow-md z-10">
                <div className="flex items-center gap-4">
                    <h1 className="font-bold text-lg tracking-wide text-gray-200">
                        {getSimulationTitle()}
                    </h1>
                    <span className="text-xs bg-gray-700 px-2 py-1 rounded text-gray-300 uppercase tracking-wider">
                        Simulation In Progress
                    </span>
                </div>

                <div className="flex items-center gap-4">
                    <button
                        onClick={handleExit}
                        className="bg-red-600 hover:bg-red-700 text-white text-sm font-medium px-4 py-2 rounded transition-colors flex items-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Exit Simulation
                    </button>
                </div>
            </div>

            <div className="flex-1 relative bg-gray-900 flex items-center justify-center overflow-hidden">
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-20">
                        <div className="text-center flex flex-col items-center">
                            <div className="w-12 h-12 border-4 border-gray-600 border-t-white rounded-full animate-spin"></div>
                            <p className="mt-4 text-gray-300 animate-pulse font-medium">Initializing Simulation Environment...</p>
                        </div>
                    </div>
                )}

                {/* Only render iframe if the URL is ready with the token! */}
                {iframeUrl && (
                    <iframe
                        ref={iframeRef}
                        src={iframeUrl}
                        title={`${getSimulationTitle()} WebGL`}
                        className="w-full h-full border-0"
                        allow="autoplay; fullscreen; microphone; camera"
                        onLoad={() => setLoading(false)}
                    />
                )}
            </div>
        </div>
    );
};

// Fallback wrapper for the standalone preview environment
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