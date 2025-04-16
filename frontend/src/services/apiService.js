// src/services/apiService.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5001/api'; // Ensure this matches your backend server URL

// Fetch hello message from backend
export const fetchHelloWorld = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/hello`);
    return response.data;
  } catch (error) {
    console.error('Error fetching hello world:', error);
    throw error;
  }
};
