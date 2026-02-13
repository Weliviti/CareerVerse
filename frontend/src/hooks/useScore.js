import { useState, useEffect, useCallback } from 'react';
import api from '../services/api';

/**
 * Custom hook to fetch and manage user scores.
 *
 * Fetches scores from the backend on mount and provides
 * a refreshScores() function for manual re-fetching.
 *
 * @param {string} userId - The user's UID to fetch scores for
 * @returns {Object} { scores, loading, refreshScores }
 *
 * @example
 * const { scores, loading, refreshScores } = useScore(userId);
 */
export function useScore(userId) {
    const [scores, setScores] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchScores = useCallback(async () => {
        if (!userId) return;

        setLoading(true);
        try {
            const response = await api.get('/api/scores/user/' + userId);
            if (response.data && response.data.scores) {
                setScores(response.data.scores);
            }
        } catch (error) {
            console.error('Failed to fetch scores:', error);
        } finally {
            setLoading(false);
        }
    }, [userId]);

    // Fetch scores on mount and when userId changes
    useEffect(() => {
        fetchScores();
    }, [fetchScores]);

    // Public function to manually refetch scores
    const refreshScores = () => {
        fetchScores();
    };

    return { scores, loading, refreshScores };
}

export default useScore;
