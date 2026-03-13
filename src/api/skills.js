import { apiClient } from './client.js';

export const skillsApi = {
  list(params) {
    return apiClient.get('/skills', params);
  },

  get(id) {
    return apiClient.get(`/skills/${id}`);
  },

  enable(id) {
    return apiClient.put(`/skills/${id}/enable`);
  },

  disable(id) {
    return apiClient.put(`/skills/${id}/disable`);
  },

  import(url) {
    return apiClient.post('/skills/import', { url });
  },

  delete(id) {
    return apiClient.delete(`/skills/${id}`);
  },
};
