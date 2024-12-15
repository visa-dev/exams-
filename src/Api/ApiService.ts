import axios, { AxiosInstance } from 'axios';
import {API_BASE_URL} from './config';

class ApiService {
  private client: AxiosInstance;

  private endpoints = {
    register: "",
    login: ""
  };

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 100000, // You can adjust the timeout as needed
    });

    this.endpoints = {
      register: '/api/auth/register',
      login: '/api/auth/login',
      // profile: (userId) => `/users/${userId}`, // Example of dynamic endpoint
    };

    this.client.interceptors.request.use(
      (config) => {
        // Skip adding the token for specific endpoints
        if (
          config.url !== this.endpoints.register &&
          config.url !== this.endpoints.login
        ) {
          const token = localStorage.getItem('authToken'); // Retrieve token from localStorage
          if (token) {
            config.headers.Authorization = `Bearer ${token}`;
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    this.client.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          console.error('Unauthorized! Redirecting to login...');
          // Handle unauthorized access (e.g., redirect to login page)
        }
        return Promise.reject(error);
      }
    );
  }

  // Generic GET request
  async get(endpoint:string, params = {}) {
    try {
      const response = await this.client.get(endpoint, { params });
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Generic POST request
  async post(endpoint:string, data = {}, config = {}) {
    try {
      const response = await this.client.post(endpoint, data, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Generic PUT request
  async put(endpoint:string, data = {}, config = {}) {
    try {
      const response = await this.client.put(endpoint, data, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Generic DELETE request
  async delete(endpoint:string, config = {}) {
    try {
      const response = await this.client.delete(endpoint, config);
      return response.data;
    } catch (error) {
      this.handleError(error);
    }
  }

  // Centralized error handling
  handleError(error:any) {
    console.error('API Error:', error.response?.data || error.message);
    throw error; // Re-throw the error to handle it at the call site
  }
}

export default ApiService;
