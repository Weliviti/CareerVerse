import React, { useState, useEffect } from 'react';
import { db } from '../../services/firebase';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';

const SimulationLogs = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLogs();
  }, []);

  const fetchLogs = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch sessions
      const sessionsRef = collection(db, 'sessions');
      const q = query(sessionsRef, orderBy('startTime', 'desc'), limit(50));
      const snapshot = await getDocs(q);

      // Fetch users to map emails
      const usersRef = collection(db, 'users');
      const usersSnapshot = await getDocs(usersRef);
      const userMap = {};
      usersSnapshot.forEach(doc => {
        userMap[doc.id] = doc.data().email || 'unknown@user.com';
      });

      const logsData = snapshot.docs.map(doc => {
        const data = doc.data();
        const status = data.status || 'active';
        const type = status === 'completed' ? 'SUCCESS' : 'INFO';

        // Format timestamp
        let dateStr = 'Unknown Time';
        if (data.startTime && data.startTime.toDate) {
          dateStr = data.startTime.toDate().toLocaleString();
        }

        return {
          id: doc.id,
          type: type,
          timestamp: dateStr,
          userEmail: userMap[data.userId] || 'unknown@user.com',
          message: status === 'completed'
            ? `User completed ${data.simulationType || 'unknown'} simulation`
            : `New simulation started: ${data.simulationType || 'unknown'}`,
          status: status
        };
      });

      setLogs(logsData);
    } catch (err) {
      console.error('Error fetching simulation logs:', err);
      setError('Failed to load simulation logs. Please check your connection or permissions.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyles = (type) => {
    switch (type) {
      case 'SUCCESS':
        return {
          bg: 'bg-green-50/50',
          border: 'border-green-100',
          iconBg: 'bg-white border-green-200 text-green-600',
          text: 'text-green-700',
          msgText: 'text-green-800'
        };
      case 'WARNING':
        return {
          bg: 'bg-yellow-50/50',
          border: 'border-yellow-100',
          iconBg: 'bg-white border-yellow-200 text-yellow-600',
          text: 'text-yellow-700',
          msgText: 'text-yellow-800'
        };
      default: // INFO
        return {
          bg: 'bg-blue-50/50',
          border: 'border-blue-100',
          iconBg: 'bg-white border-blue-200 text-blue-600',
          text: 'text-blue-700',
          msgText: 'text-blue-800'
        };
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Simulation Logs</h1>
        <p className="text-gray-500 mt-1">Track all simulation activities and events</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex items-center gap-3">
          <div className="w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center text-teal-600">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </svg>
          </div>
          <h2 className="text-lg font-bold text-gray-800">Recent Simulation Activities</h2>
        </div>

        <div className="p-6 space-y-4 min-h-[400px]">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-teal-600 mb-4"></div>
              <p className="text-gray-500">Loading activity logs...</p>
            </div>
          ) : error ? (
            <div className="text-center py-20">
              <p className="text-red-500 mb-4 font-medium">{error}</p>
              <button
                onClick={fetchLogs}
                className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors"
              >
                Retry
              </button>
            </div>
          ) : logs.length === 0 ? (
            <div className="text-center py-20 text-gray-500">
              <p>No simulation logs found.</p>
            </div>
          ) : (
            logs.map((log) => {
              const styles = getStatusStyles(log.type);
              return (
                <div key={log.id} className={`flex items-start gap-4 p-4 ${styles.bg} border ${styles.border} rounded-xl hover:shadow-md transition-shadow`}>
                  <div className={`w-8 h-8 rounded-full ${styles.iconBg} flex items-center justify-center flex-shrink-0 mt-1`}>
                    {log.type === 'SUCCESS' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                      </svg>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                      </svg>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span className={`text-xs font-bold ${styles.text} uppercase tracking-wider`}>{log.type}</span>
                      <span className="text-xs text-gray-400 font-medium whitespace-nowrap">🕒 {log.timestamp}</span>
                      <span className="text-xs text-gray-400 font-medium">User: <span className="text-gray-500">{log.userEmail}</span></span>
                    </div>
                    <p className={`text-sm font-semibold ${styles.msgText}`}>{log.message}</p>
                  </div>
                </div>
              );
            })
          )}

          {!loading && !error && logs.length > 0 && (
            <div className="flex flex-col items-center justify-center py-6 text-center border-t border-gray-50 mt-4">
              <p className="text-gray-400 text-xs italic">End of recent activities</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SimulationLogs;
