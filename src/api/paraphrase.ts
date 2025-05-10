// src/apiClient.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3001', // The base URL for your API
  timeout: 5000, // Optional timeout for requests
});

// Function to make the paraphrase API request
export const paraphraseText = async (text) => {
  try {
    const response = await apiClient.post('/paraphrase', { text });
    return response.data; // Assuming the API returns the result in 'data'
  } catch (error) {
    console.error("Error making paraphrase request:", error);
    throw new Error("Failed to paraphrase text");
  }
};

export default apiClient;
