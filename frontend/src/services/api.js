import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://atozascollegeifla.testatozas.in/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log('API Request:', config.method?.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export const studentAPI = {
  /**
   * Get all students with optional query parameters
   * @param {Object} [params] - Query parameters
   * @param {string} [params.search] - Search term
   * @param {string} [params.sortBy] - Sort field
   * @param {'asc'|'desc'} [params.sortOrder] - Sort order
   * @param {number} [params.page] - Page number
   * @param {number} [params.limit] - Items per page
   * @returns {Promise<StudentsResponse>}
   */
  getStudents: async (params = {}) => {
    const response = await api.get('/students', { params });
    return response.data;
  },

  /**
   * Get student by ID
   * @param {string} id - Student ID
   * @returns {Promise<Student>}
   */
  getStudentById: async (id) => {
    const response = await api.get(`/students/${id}`);
    return response.data;
  },

  /**
   * Create new student
   * @param {StudentFormData} studentData - Student data
   * @returns {Promise<Student>}
   */
  createStudent: async (studentData) => {
    const response = await api.post('/students', studentData);
    return response.data;
  },

  /**
   * Update student
   * @param {string} id - Student ID
   * @param {StudentFormData} studentData - Updated student data
   * @returns {Promise<Student>}
   */
  updateStudent: async (id, studentData) => {
    const response = await api.put(`/students/${id}`, studentData);
    return response.data;
  },

  /**
   * Delete student
   * @param {string} id - Student ID
   * @returns {Promise<void>}
   */
  deleteStudent: async (id) => {
    await api.delete(`/students/${id}`);
  },

  /**
   * Get student statistics
   * @returns {Promise<StudentStats>}
   */
  getStats: async () => {
    const response = await api.get('/students/stats');
    return response.data;
  },

  /**
   * Health check
   * @returns {Promise<{message: string, timestamp: string}>}
   */
  healthCheck: async () => {
    const response = await api.get('/health');
    return response.data;
  }
};

export default api; 