// Authentication API client
const API_URL = 'http://localhost:3000/api';

const auth = {
  /**
   * Check if user is authenticated
   */
  isAuthenticated() {
    return !!localStorage.getItem('token');
  },

  /**
   * Get auth token
   */
  getToken() {
    return localStorage.getItem('token');
  },

  /**
   * Get current user
   */
  getUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  /**
   * Make authenticated API request
   */
  async apiRequest(endpoint, options = {}) {
    const token = this.getToken();
    
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Erro na requisição');
    }

    return data;
  },

  /**
   * Register new user
   */
  async register(name, email, password) {
    return await this.apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password })
    });
  },

  /**
   * Login user
   */
  async login(email, password) {
    return await this.apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
  },

  /**
   * Get current user data
   */
  async getMe() {
    return await this.apiRequest('/auth/me');
  },

  /**
   * Get dashboard data
   */
  async getDashboard() {
    return await this.apiRequest('/home');
  },

  /**
   * Logout user
   */
  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
};

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
  module.exports = auth;
}

