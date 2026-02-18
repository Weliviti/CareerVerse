import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Loading from '../components/ui/Loading';
import ErrorDisplay from '../components/ui/ErrorDisplay';

const SimulationPlayer = () => {
    const { type } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const iframeRef = useRef(null);

    // Validate simulation type
    const isValidType = ['educator', 'diagnostician', 'advocate'].includes(type?.toLowerCase());

    useEffect(() => {
        // Simulate initialization delay
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

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
                <ErrorDisplay
                    error={{ message: 'Invalid simulation type. Please choose a valid simulation from the hub.' }}
                    onRetry={() => navigate('/simulation-hub')}
                />
            </div>
        );
    }

    // Path to the Unity WebGL build's index.html
    // Assuming the build is located at /public/simulation/{type}/index.html
    // and served at root /simulation/{type}/index.html
    const simulationPath = `/simulation/${type}/index.html`;

    return (
        <div className="fixed inset-0 bg-black z-50 flex flex-col">
            {/* Top Bar - Minimalist to keep focus on game */}
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
                    {/* Future: Timer / Score could go here */}

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

            {/* Game Container */}
            <div className="flex-1 relative bg-gray-900 flex items-center justify-center overflow-hidden">
                {loading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-gray-900 z-20">
                        <div className="text-center">
                            <Loading size="large" color="white" />
                            <p className="mt-4 text-gray-300 animate-pulse">Initializing Simulation Environment...</p>
                        </div>
                    </div>
                )}

                <iframe
                    ref={iframeRef}
                    src={simulationPath}
                    title={`${getSimulationTitle()} WebGL`}
                    className="w-full h-full border-0"
                    allow="autoplay; fullscreen; microphone; camera"
                    onLoad={() => setLoading(false)}
                />

                {/* Placeholder if iframe fails to load or for development testing without build files */}
                <div className="absolute inset-0 -z-10 flex flex-col items-center justify-center text-gray-500">
                    <p className="mb-2">If simulation doesn't load, check if build files exist at:</p>
                    <code className="bg-gray-800 px-3 py-1 rounded text-sm font-mono">{simulationPath}</code>
                </div>
            </div>
        </div>
    );
};

export default SimulationPlayer;
