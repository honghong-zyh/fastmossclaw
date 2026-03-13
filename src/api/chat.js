import { apiClient } from './client.js';

export const chatApi = {
  send(message) {
    return apiClient.post('/chat/send', { message });
  },

  getHistory() {
    return apiClient.get('/chat/history');
  },

  getConversation(id) {
    return apiClient.get(`/chat/conversations/${id}`);
  },

  deleteConversation(id) {
    return apiClient.delete(`/chat/conversations/${id}`);
  },
};
