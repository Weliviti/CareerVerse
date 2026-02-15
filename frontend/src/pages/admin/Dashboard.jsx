import React from 'react';

const AdminDashboard = () => {
    const stats = [
        {
            title: 'Total Users',
            value: '2,847',
            change: '+12%',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-teal-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                </svg>
            ),
            bg: 'bg-teal-50',
            text: 'text-teal-600'
        },
        {
            title: 'Total Simulations',
            value: '18,392',
            change: '+8%',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-emerald-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.91 11.672a.375.375 0 010 .656l-5.603 3.113a.375.375 0 01-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112z" />
                </svg>
            ),
            bg: 'bg-emerald-50',
            text: 'text-emerald-600'
        },
        {
            title: 'Average Skill Score',
            value: '82.5',
            change: '+3%',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-cyan-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 18.75h-9m9 0a3 3 0 013 3h-15a3 3 0 013-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0V5.625a1.125 1.125 0 011.125-1.125h.871M9.497 5.625v7.875" />
                </svg>
            ),
            bg: 'bg-cyan-50',
            text: 'text-cyan-600'
        },
        {
            title: 'System Status',
            value: 'Healthy',
            subValue: '.9%',
            change: '+99',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-blue-600">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
                </svg>
            ),
            bg: 'bg-blue-50',
            text: 'text-blue-600'
        },
    ];

    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                <p className="text-gray-500 mt-1">Monitor key metrics and system performance</p>
            </div>

            {/* Metric Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl ${stat.bg}`}>
                                {stat.icon}
                            </div>
                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${stat.bg} ${stat.text}`}>
                                {stat.change}
                            </span>
                        </div>
                        <div className="flex items-baseline gap-1">
                            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
                            {stat.subValue && <span className="text-sm text-gray-500 font-medium">{stat.subValue}</span>}
                        </div>
                        <p className="text-gray-500 text-sm mt-1">{stat.title}</p>
                    </div>
                ))}
            </div>

            {/* Placeholder for Next Phases */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Recent Activity */}
                <div className="lg:col-span-1 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-full">
                    <h2 className="text-lg font-bold text-gray-900 mb-6">Recent Activity</h2>
                    <div className="space-y-6">
                        {[
                            {
                                id: 1,
                                title: 'User completed Technical Interview simulation',
                                time: '2025-11-30 14:32:15',
                                type: 'success'
                            },
                            {
                                id: 2,
                                title: 'New simulation started: Behavioral Interview',
                                time: '2025-11-30 14:28:42',
                                type: 'info'
                            },
                            {
                                id: 3,
                                title: 'System Design simulation completed successfully',
                                time: '2025-11-30 14:15:33',
                                type: 'success'
                            },
                            {
                                id: 4,
                                title: 'Simulation timeout warning for user',
                                time: '2025-11-30 14:05:21',
                                type: 'warning'
                            }
                        ].map((activity, index, arr) => (
                            <div key={activity.id} className="relative pl-6">
                                {/* Timeline Line */}
                                {index !== arr.length - 1 && (
                                    <div className="absolute left-2 top-2 w-0.5 h-full bg-gray-100" style={{ height: 'calc(100% + 24px)' }}></div>
                                )}

                                {/* Timeline Dot */}
                                <div className={`absolute left-0 top-1.5 w-4 h-4 rounded-full border-2 border-white box-content ${activity.type === 'success' ? 'bg-emerald-500' :
                                        activity.type === 'info' ? 'bg-teal-500' :
                                            'bg-amber-500'
                                    }`}></div>

                                <div>
                                    <p className="text-sm font-medium text-gray-800">{activity.title}</p>
                                    <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Column - System Health (Phase 4) */}
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-gray-100 min-h-[400px] flex items-center justify-center border-dashed">
                    <p className="text-gray-400 font-medium">System Health Section (Phase 4)</p>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
