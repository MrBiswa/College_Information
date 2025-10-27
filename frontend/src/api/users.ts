import { apiClient } from './client';

export async function fetchEmployees() {
	const response = await apiClient.get('/users/employees');
	return response.data;
}

export async function activateUser(userId: string) {
	const response = await apiClient.patch(`/users/${userId}/activate`);
	return response.data;
}

export async function deactivateUser(userId: string) {
	const response = await apiClient.patch(`/users/${userId}/deactivate`);
	return response.data;
}

