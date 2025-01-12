import { ApiClient } from './api-client.js';

export class ResourcesApi {
    static async getAllResources() {
        return ApiClient.request('/resources');
    }

    static async getResource(id) {
        return ApiClient.request(`/resources/${id}`);
    }

    static async createResource(formData) {
        return ApiClient.request('/resources', {
            method: 'POST',
            body: formData,
            headers: {} // Let browser set content-type for FormData
        });
    }

    static async updateResource(id, resourceData) {
        return ApiClient.request(`/resources/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(resourceData)
        });
    }

    static async deleteResource(id) {
        return ApiClient.request(`/resources/${id}`, {
            method: 'DELETE'
        });
    }

    static async getResourcesByCourse(courseId) {
        return ApiClient.request(`/resources/course/${courseId}`);
    }
}