import Navbar from '../components/Navbar';

function Dashboard() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="mt-4 text-gray-500">Welcome to your dashboard.</p>
            </main>
        </div>
    );
}

export default Dashboard;
