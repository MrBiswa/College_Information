import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001';

export const apiClient = axios.create({
	baseURL: API_BASE_URL,
});

// Attach token from localStorage on creation
const token = localStorage.getItem('token');
if (token) {
	apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

// Response interceptor to handle 401s
apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error?.response?.status === 401) {
			// Remove token and reload to force login
			localStorage.removeItem('token');
			delete apiClient.defaults.headers.common['Authorization'];
			// Optionally redirect if window available
			if (typeof window !== 'undefined') {
				window.location.href = '/login';
			}
		}
		return Promise.reject(error);
	}
);

export function setAuthToken(tokenValue: string | null) {
	if (tokenValue) {
		localStorage.setItem('token', tokenValue);
		apiClient.defaults.headers.common['Authorization'] = `Bearer ${tokenValue}`;
	} else {
		localStorage.removeItem('token');
		delete apiClient.defaults.headers.common['Authorization'];
	}
}

