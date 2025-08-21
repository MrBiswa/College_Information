import { apiClient } from './client';

export async function fetchTemplates(params?: {
	testingCategory?: string;
	productCategory?: string;
	isActive?: boolean;
}) {
	const response = await apiClient.get('/test-templates', { params });
	return response.data;
}

export async function fetchTemplatesByProduct(productCategory: string) {
	const response = await apiClient.get(`/test-templates/by-product/${productCategory}`);
	return response.data;
}

export async function createTemplate(payload: any) {
	const response = await apiClient.post('/test-templates', payload);
	return response.data;
}

export async function updateTemplate(id: string, payload: any) {
	const response = await apiClient.patch(`/test-templates/${id}`, payload);
	return response.data;
}

export async function deleteTemplate(id: string) {
	const response = await apiClient.delete(`/test-templates/${id}`);
	return response.data;
}

