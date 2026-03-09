// Feedback API service
import api from './api';

/**
 * Submit user feedback
 * @param {Object} feedbackData - { name: string, message: string }
 * @returns {Promise} API response
 */
export const submitFeedback = async (feedbackData) => {
  try {
    const response = await api.post('/api/feedback', feedbackData);
    return response.data;
  } catch (error) {
    console.error('Error submitting feedback:', error);
    throw error;
  }
};
