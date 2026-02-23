import React, { useState, useEffect } from 'react';
import Input from '../../components/ui/Input';
import { db } from '../../services/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';
import toast from 'react-hot-toast';

const UserManagement = () => {
    const { currentUser } = useAuth();
    const [searchTerm, setSearchTerm] = useState('');
    const [allUsers, setAllUsers] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const limit = 10;

    // Fetch all users from Firestore on mount
    useEffect(() => {
        fetchUsers();
    }, []);

    // Filter + paginate when search or page changes
    useEffect(() => {
        let filtered = allUsers;
        if (searchTerm.trim()) {
            const term = searchTerm.toLowerCase();
            filtered = allUsers.filter(
                (u) =>
                    (u.name || '').toLowerCase().includes(term) ||
                    (u.email || '').toLowerCase().includes(term)
            );
        }
        const total = Math.max(1, Math.ceil(filtered.length / limit));
        setTotalPages(total);
        if (page > total) setPage(1);
        const start = (page - 1) * limit;
        setUsers(filtered.slice(start, start + limit));
    }, [searchTerm, page, allUsers]);

    const fetchUsers = async () => {
        try {
            setLoading(true);
            setError(null);
            const usersRef = collection(db, 'users');
            const snapshot = await getDocs(usersRef);
            const usersList = snapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    uid: doc.id,
                    name: data.name || data.email?.split('@')[0] || 'Unknown',
                    email: data.email || 'N/A',
                    role: data.role || 'user',
                    created_at: data.created_at?.toDate?.() || null,
                    isActive: data.isActive !== false,
                };
            });
            // Sort by created_at descending (newest first), nulls last
            usersList.sort((a, b) => {
                if (!a.created_at) return 1;
                if (!b.created_at) return -1;
                return b.created_at - a.created_at;
            });
            setAllUsers(usersList);
        } catch (err) {
            console.error('Error fetching users:', err);
            setError(err.message || 'An error occurred while fetching users');
            toast.error('Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    // Delete modal state
    const [deleteModal, setDeleteModal] = useState({ open: false, user: null, deleting: false });

    const openDeleteModal = (user) => {
        if (user.uid === currentUser?.uid) {
            toast.error('You cannot delete your own account');
            return;
        }
        setDeleteModal({ open: true, user, deleting: false });
    };

    const closeDeleteModal = () => {
        if (!deleteModal.deleting) {
            setDeleteModal({ open: false, user: null, deleting: false });
        }
    };

    const confirmDeleteUser = async () => {
        const user = deleteModal.user;
        if (!user) return;

        setDeleteModal((prev) => ({ ...prev, deleting: true }));
        try {
            await api.delete(`/api/admin/users/${user.uid}`);
            setAllUsers((prev) => prev.filter((u) => u.uid !== user.uid));
            toast.success(`User "${user.name}" deleted from Authentication & Database`);
            setDeleteModal({ open: false, user: null, deleting: false });
        } catch (err) {
            console.error('Error deleting user:', err);
            const msg = err.response?.data?.message || 'Failed to delete user';
            toast.error(msg);
            setDeleteModal((prev) => ({ ...prev, deleting: false }));
        }
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= totalPages) {
            setPage(newPage);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
                <p className="text-gray-500 mt-1">View and manage all registered users</p>
            </div>

            {/* Main Content Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                {/* Search and Filter Section */}
                <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row gap-4 items-center justify-between">

                    {/* Search Bar */}
                    <div className="w-full md:w-96">
                        <Input
                            placeholder="Search users by name or email..."
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setPage(1); // Reset to page 1 on search
                            }}
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                            }
                            className="bg-gray-50 border-gray-200"
                        />
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        {/* Filter Button */}
                        <button className="p-2.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                            </svg>
                        </button>

                        {/* Empty Box Placeholder (from design) */}
                        <div className="w-24 h-11 bg-gray-50 rounded-lg border border-gray-200 border-dashed"></div>
                    </div>
                </div>

                {/* User Table */}
                <div className="overflow-x-auto min-h-[400px]">
                    {loading ? (
                        <div className="flex items-center justify-center h-full py-20">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
                        </div>
                    ) : error ? (
                        <div className="text-center py-20 text-red-500">
                            <p>{error}</p>
                            <button onClick={fetchUsers} className="mt-4 text-teal-600 hover:underline">Retry</button>
                        </div>
                    ) : (
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-gray-100 text-sm font-semibold text-gray-500">
                                    <th className="px-6 py-4">Name</th>
                                    <th className="px-6 py-4">Email</th>
                                    <th className="px-6 py-4">Joined Date</th>
                                    <th className="px-6 py-4">Simulations</th>
                                    <th className="px-6 py-4">Status</th>
                                    <th className="px-6 py-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {users.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="px-6 py-8 text-center text-gray-500">
                                            No users found.
                                        </td>
                                    </tr>
                                ) : (
                                    users.map((user) => (
                                        <tr key={user.uid} className="hover:bg-gray-50 transition-colors">
                                            <td className="px-6 py-4 text-gray-800 font-medium">{user.name}</td>
                                            <td className="px-6 py-4 text-gray-600">{user.email}</td>
                                            <td className="px-6 py-4 text-gray-500">
                                                {user.created_at ? new Date(user.created_at).toLocaleDateString() : 'N/A'}
                                            </td>
                                            <td className="px-6 py-4 text-gray-800 font-medium">
                                                {user.stats?.totalSimulations || 0}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.isActive !== false ? 'bg-teal-100 text-teal-800' : 'bg-gray-100 text-gray-800'
                                                    }`}>
                                                    {user.isActive !== false ? 'active' : 'inactive'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <button className="p-1.5 text-teal-600 hover:bg-teal-50 rounded-lg transition-colors" title="View Details">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={() => openDeleteModal(user)}
                                                        className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                        title="Delete User"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Delete Confirmation Modal */}
                {deleteModal.open && (
                    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={closeDeleteModal}>
                        <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 animate-in" onClick={(e) => e.stopPropagation()}>
                            {/* Warning Icon */}
                            <div className="mx-auto w-14 h-14 rounded-full bg-red-100 flex items-center justify-center mb-4">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                </svg>
                            </div>

                            <h3 className="text-lg font-bold text-gray-900 text-center">Delete User</h3>
                            <p className="text-gray-500 text-center text-sm mt-2">
                                Are you sure you want to delete <span className="font-semibold text-gray-700">{deleteModal.user?.name}</span> ({deleteModal.user?.email})?
                            </p>
                            <p className="text-red-500 text-center text-xs mt-2 font-medium">
                                This will permanently remove the user from both Authentication and Database. This action cannot be undone.
                            </p>

                            {/* Buttons */}
                            <div className="flex gap-3 mt-6">
                                <button
                                    onClick={closeDeleteModal}
                                    disabled={deleteModal.deleting}
                                    className="flex-1 px-4 py-2.5 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium text-sm disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmDeleteUser}
                                    disabled={deleteModal.deleting}
                                    className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors font-medium text-sm disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {deleteModal.deleting ? (
                                        <>
                                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                            Deleting...
                                        </>
                                    ) : (
                                        'Delete User'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Pagination */}
                <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 bg-gray-50">
                    <div className="text-sm text-gray-600">
                        Showing page <span className="font-medium">{page}</span> of <span className="font-medium">{totalPages}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => handlePageChange(page - 1)}
                            disabled={page === 1}
                            className="p-2 border border-blue-50 bg-white rounded-lg text-teal-600 hover:bg-teal-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>
                        <span className="text-sm font-medium text-gray-700">Page {page} of {totalPages}</span>
                        <button
                            onClick={() => handlePageChange(page + 1)}
                            disabled={page === totalPages}
                            className="p-2 border border-blue-50 bg-white rounded-lg text-teal-600 hover:bg-teal-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserManagement;
