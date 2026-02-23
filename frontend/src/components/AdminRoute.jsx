import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Loading from './ui/Loading';
import toast from 'react-hot-toast';

const AdminRoute = ({ children }) => {
    const { currentUser, userRole, loading } = useAuth();

    if (loading) {
        return <Loading />;
    }

    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }

    if (userRole !== 'admin') {
        toast.error('Access denied. Admin privileges required.');
        return <Navigate to="/simulation-hub" replace />;
    }

    return children;
};

export default AdminRoute;
