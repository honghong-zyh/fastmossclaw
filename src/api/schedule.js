import { apiClient } from './client.js';

export const scheduleApi = {
  list() {
    return apiClient.get('/schedules');
  },

  create(data) {
    return apiClient.post('/schedules', data);
  },

  update(id, data) {
    return apiClient.put(`/schedules/${id}`, data);
  },

  toggle(id) {
    return apiClient.put(`/schedules/${id}/toggle`);
  },

  delete(id) {
    return apiClient.delete(`/schedules/${id}`);
  },
};
