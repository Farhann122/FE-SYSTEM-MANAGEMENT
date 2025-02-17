import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api", // Set the base URL for all requests
  headers: {
    "Content-Type": "application/json",
  },
});

// Add an interceptor to include the token automatically
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token"); // Retrieve the token from localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
