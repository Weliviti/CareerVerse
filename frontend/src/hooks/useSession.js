import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';

/**
 * Custom hook to fetch and manage user sessions.
 *
 * Fetches sessions from the backend on mount and provides
 * a refreshSessions() function for manual re-fetching.
 *
 * @param {string} userId - The user's UID to fetch sessions for
 * @returns {Object} { sessions, loading, refreshSessions }
 *
 * @example
 * const { sessions, loading, refreshSessions } = useSession(userId);
 */
export function useSession(userId) {
    const [sessions, setSessions] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchSessions = useCallback(async () => {
        if (!userId) return;

        setLoading(true);
        try {
            const response = await api.get('/api/sessions/user/' + userId);
            if (response.data && response.data.sessions) {
                setSessions(response.data.sessions);
            }
        } catch (error) {
            console.error('Failed to fetch sessions:', error);
        } finally {
            setLoading(false);
        }
    }, [userId]);

    // Fetch sessions on mount and when userId changes
    useEffect(() => {
        fetchSessions();
    }, [fetchSessions]);

    // Public function to manually refetch sessions
    const refreshSessions = () => {
        fetchSessions();
    };

    return { sessions, loading, refreshSessions };
}

export default useSession;
