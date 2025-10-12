// API клиент для фронтенда
// В реальном приложении здесь будут запросы к бэкенду
// Сейчас работает с localStorage для демонстрации

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

interface RequestOptions extends RequestInit {
  headers?: Record<string, string>;
}

const request = async (endpoint: string, options: RequestOptions = {}) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/auth';
      }
      throw new Error(`API Error: ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
};

export const authAPI = {
  register: (userData: { username: string; email: string; password: string }) =>
    request('/auth/register', { method: 'POST', body: JSON.stringify(userData) }),
  login: (credentials: { email: string; password: string }) =>
    request('/auth/login', { method: 'POST', body: JSON.stringify(credentials) }),
  adminLogin: (credentials: { email: string; password: string }) =>
    request('/auth/admin-login', { method: 'POST', body: JSON.stringify(credentials) }),
  getProfile: () => request('/user/profile'),
};

export const moviesAPI = {
  getAll: () => request('/movies'),
  getById: (id: number) => request(`/movies/${id}`),
  create: (movie: any) =>
    request('/movies', { method: 'POST', body: JSON.stringify(movie) }),
  update: (id: number, movie: any) =>
    request(`/movies/${id}`, { method: 'PUT', body: JSON.stringify(movie) }),
  delete: (id: number) => request(`/movies/${id}`, { method: 'DELETE' }),
};

export const cinemasAPI = {
  getAll: () => request('/cinemas'),
  create: (cinema: any) =>
    request('/cinemas', { method: 'POST', body: JSON.stringify(cinema) }),
  update: (id: number, cinema: any) =>
    request(`/cinemas/${id}`, { method: 'PUT', body: JSON.stringify(cinema) }),
  delete: (id: number) => request(`/cinemas/${id}`, { method: 'DELETE' }),
};

export const screeningsAPI = {
  getAll: () => request('/screenings'),
  create: (screening: any) =>
    request('/screenings', { method: 'POST', body: JSON.stringify(screening) }),
  delete: (id: number) => request(`/screenings/${id}`, { method: 'DELETE' }),
};
