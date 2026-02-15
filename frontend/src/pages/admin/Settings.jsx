import React from 'react';

const Settings = () => {
    return (
        <div>
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
                <p className="text-gray-500 mt-1">Configure system preferences and options</p>
            </div>

            {/* Settings Sections Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* General Settings Card */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer">
                    <h2 className="text-lg font-bold text-gray-900 mb-2">General Settings</h2>
                    <p className="text-gray-500 text-sm">Manage platform-wide configurations</p>
                </div>
            </div>
        </div>
    );
};

export default Settings;
