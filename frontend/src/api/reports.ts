import { apiClient } from './client';

export async function fetchReports(params?: { status?: string; preparedById?: string }) {
	const response = await apiClient.get('/reports', { params });
	return response.data;
}

export async function fetchReport(id: string) {
	const response = await apiClient.get(`/reports/${id}`);
	return response.data;
}

export async function createReport(sampleId: string, preparedById: string) {
	const response = await apiClient.post(`/reports/create/${sampleId}/${preparedById}`);
	return response.data;
}

export async function updateReportStatus(id: string, payload: { status: string; userId?: string }) {
	const response = await apiClient.patch(`/reports/${id}/status`, payload);
	return response.data;
}

