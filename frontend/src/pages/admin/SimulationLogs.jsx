import React from 'react';

const SimulationLogs = () => {
  return (
    <div className="max-w-6xl mx-auto">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Simulation Logs</h1>
        <p className="text-gray-500 mt-1">Track all simulation activities and events</p>
      </div>

      {/* Main Card Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Card Header */}
        <div className="p-6 border-b border-gray-50 flex items-center gap-3">
          <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center text-teal-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-gray-800">Recent Simulation Activities</h2>
        </div>

        {/* Log Entries Container */}
        <div className="p-6 space-y-4">
          {/* Success Entry */}
          <div className="flex items-start gap-4 p-4 bg-green-50/50 border border-green-100 rounded-xl hover:shadow-md transition-shadow">
            <div className="w-8 h-8 rounded-full bg-white border border-green-200 flex items-center justify-center text-green-600 flex-shrink-0 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-green-700 uppercase tracking-wider">Success</span>
                <span className="text-xs text-gray-400 font-medium whitespace-nowrap">🕒 2025-11-30 14:32:15</span>
                <span className="text-xs text-gray-400 font-medium">User: <span className="text-gray-500">alice@email.com</span></span>
              </div>
              <p className="text-sm font-semibold text-green-800">User completed Technical Interview simulation</p>
            </div>
          </div>

          {/* Success Entry 2 */}
          <div className="flex items-start gap-4 p-4 bg-green-50/50 border border-green-100 rounded-xl hover:shadow-md transition-shadow">
            <div className="w-8 h-8 rounded-full bg-white border border-green-200 flex items-center justify-center text-green-600 flex-shrink-0 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-green-700 uppercase tracking-wider">Success</span>
                <span className="text-xs text-gray-400 font-medium whitespace-nowrap">🕒 2025-11-30 14:15:33</span>
                <span className="text-xs text-gray-400 font-medium">User: <span className="text-gray-500">emma@email.com</span></span>
              </div>
              <p className="text-sm font-semibold text-green-800">System Design simulation completed successfully</p>
            </div>
          </div>

          {/* Info Entry */}
          <div className="flex items-start gap-4 p-4 bg-blue-50/50 border border-blue-100 rounded-xl hover:shadow-md transition-shadow">
            <div className="w-8 h-8 rounded-full bg-white border border-blue-200 flex items-center justify-center text-blue-600 flex-shrink-0 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-blue-700 uppercase tracking-wider">Info</span>
                <span className="text-xs text-gray-400 font-medium whitespace-nowrap">🕒 2025-11-30 14:28:42</span>
                <span className="text-xs text-gray-400 font-medium">User: <span className="text-gray-500">bob@email.com</span></span>
              </div>
              <p className="text-sm font-semibold text-blue-800">New simulation started: Behavioral Interview</p>
            </div>
          </div>

          {/* Warning Entry */}
          <div className="flex items-start gap-4 p-4 bg-yellow-50/50 border border-yellow-100 rounded-xl hover:shadow-md transition-shadow">
            <div className="w-8 h-8 rounded-full bg-white border border-yellow-200 flex items-center justify-center text-yellow-600 flex-shrink-0 mt-1">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-yellow-700 uppercase tracking-wider">Warning</span>
                <span className="text-xs text-gray-400 font-medium whitespace-nowrap">🕒 2025-11-30 14:05:21</span>
                <span className="text-xs text-gray-400 font-medium">User: <span className="text-gray-500">carol@email.com</span></span>
              </div>
              <p className="text-sm font-semibold text-yellow-800">Simulation timeout warning for user</p>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center py-6 text-center border-t border-gray-50 mt-4">
            <p className="text-gray-400 text-xs italic">Mock data integration and final polish in the final step...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulationLogs;
