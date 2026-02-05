import Navbar from '../components/Navbar';

function Home() {
    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="text-center py-20">
                    <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl tracking-tight">
                        Welcome to <span className="text-primary-600">CareerVerse</span>
                    </h1>
                    <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                        Experience your future career before you commit. The world's first
                        AI-powered career flight simulator.
                    </p>
                </div>
            </main>
        </div>
    );
}

export default Home;
