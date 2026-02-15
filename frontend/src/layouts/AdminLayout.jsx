import React from 'react';
import AdminSidebar from '../components/AdminSidebar';

const AdminLayout = ({ children }) => {
    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
            {/* Sidebar (Desktop) */}
            <AdminSidebar />

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col md:ml-64 relative">
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default AdminLayout;
