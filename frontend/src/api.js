// Import the Axios library
import axios from "axios";
// Import the ACCESS_TOKEN constant from the constants module
import { ACCESS_TOKEN } from "./constants";

// Create an instance of Axios with a base URL and a maximum number of redirects to follow
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // The base URL is fetched from an environment variable
  maxRedirects: 10, // Set the maximum number of redirects to follow to 10
})

// Add a request interceptor to the Axios instance
api.interceptors.request.use(
  (config) => {
    
    const token = localStorage.getItem(ACCESS_TOKEN); // Get the access token from local storage
    
    // If the token exists, add it to the Authorization header of the request
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // Return the modified request configuration
    return config;
  },
  // If there's an error in the request interceptor, return a rejected promise
  (error) => {
    return Promise.reject(error);
  }
);

// Export the Axios instance as the default export of the module
export default api;
