import { apiClient } from './client';

export enum SampleStatus {
	submitted = 'submitted',
	assigned = 'assigned',
	in_progress = 'in_progress',
	testing_complete = 'testing_complete',
	report_generated = 'report_generated',
	completed = 'completed',
	cancelled = 'cancelled',
}

export async function fetchSamples(params?: {
	status?: string;
	assignedEmployeeId?: string;
	productCategory?: string;
}) {
	const response = await apiClient.get('/samples', { params });
	return response.data;
}

export async function fetchEmployeeWorkload() {
	const response = await apiClient.get('/samples/employee-workload');
	return response.data;
}

export async function assignSample(sampleId: string, employeeId: string) {
	const response = await apiClient.patch(`/samples/${sampleId}/assign/${employeeId}`);
	return response.data;
}

export async function updateSampleStatus(sampleId: string, status: SampleStatus) {
	const response = await apiClient.patch(`/samples/${sampleId}/status`, { status });
	return response.data;
}

export async function deleteSample(sampleId: string) {
	const response = await apiClient.delete(`/samples/${sampleId}`);
	return response.data;
}

