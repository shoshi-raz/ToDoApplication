import axios from 'axios';


axios.defaults.baseURL = process.env.REACT_APP_API_URL


axios.interceptors.response.use(
  response => response,
  error => {
    console.error('Axios error:', error);
    return Promise.reject(error);
  }
);

export default {
  getTasks: async () => {
    const result = await axios.get(`/items`)
    return result.data;
  },

  // service.js
  addTask: async (name) => {
    const result = await axios.post(`/items`, { name, isComplete: false });
    return result.data; // מחזיר { id, name, isComplete }
  },

  setCompleted: async (id, isComplete) => {
    console.log('setCompleted', { id, isComplete })
    await axios.put(`/items/${id}`, { isComplete })
    return {};
  },

  deleteTask: async (id) => {
    console.log('deleteTask')
    await axios.delete(`/items/${id}`)
  }
};
