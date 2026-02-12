
import { useState } from 'react';
import api from '../services/api';
import toast from 'react-hot-toast';

export const useSimulation = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [sessionId, setSessionId] = useState(null);

    const startSimulation = async (type) => {
        setLoading(true);
        try {
            const response = await api.post('/api/simulations/launch', { simulationType: type });
            if (response.data && response.data.sessionId) {
                setSessionId(response.data.sessionId);
                // Initialize with welcome message if provided, or just empty
                if (response.data.initialMessage) {
                    setMessages([{ role: 'npc', text: response.data.initialMessage }]);
                } else {
                    setMessages([]);
                }
            }
        } catch (error) {
            console.error('Failed to start simulation:', error);
            toast.error('Failed to start simulation');
        } finally {
            setLoading(false);
        }
    };

    const sendMessage = async (text) => {
        if (!text.trim() || !sessionId) return;

        // Optimistic update
        const userMessage = { role: 'user', text };
        setMessages((prev) => [...prev, userMessage]);
        setLoading(true);

        try {
            const response = await api.post('/api/persona/chat', {
                sessionId,
                message: text,
            });

            if (response.data && response.data.response) {
                setMessages((prev) => [
                    ...prev,
                    { role: 'npc', text: response.data.response },
                ]);
            }
        } catch (error) {
            console.error('Failed to send message:', error);
            toast.error('Failed to send message');
            // Optional: Remove user message if failed? Or just show error.
        } finally {
            setLoading(false);
        }
    };

    return {
        messages,
        loading,
        sessionId,
        startSimulation,
        sendMessage,
    };
};

export default useSimulation;
