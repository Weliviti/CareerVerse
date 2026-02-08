import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

function Dashboard() {
    const { currentUser } = useAuth();

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="bg-white rounded-lg shadow-md p-8">
                    <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
                    <p className="mt-2 text-lg text-gray-600">
                        Welcome back, {currentUser?.email}!
                    </p>

                    <div className="mt-8 space-y-4">
                        <p className="text-gray-700">
                            You've successfully logged in to CareerVerse.
                        </p>
                        <div className="bg-teal-50 border-l-4 border-teal-500 p-4 mt-4">
                            <p className="text-teal-800">
                                🎉 This is your dashboard placeholder. More features coming soon!
                            </p>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Dashboard;
