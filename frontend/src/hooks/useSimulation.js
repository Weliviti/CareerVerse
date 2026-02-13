
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
            // Updated to use the actual session start endpoint
            const { data } = await api.post('/api/sessions/start', {
                simulation_type: type, // Ensure backend expects 'simulation_type' or 'type'
            });

            if (data && data.session_id) {
                setSessionId(data.session_id);
                // Backend might return initial message or just session ID
                if (data.initial_message) {
                    setMessages([{ role: 'npc', text: data.initial_message }]);
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
            // Updated to use the actual chat endpoint
            const { data } = await api.post('/api/persona/chat', {
                session_id: sessionId,
                message: text,
            });

            if (data && data.response) {
                setMessages((prev) => [
                    ...prev,
                    { role: 'npc', text: data.response },
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
