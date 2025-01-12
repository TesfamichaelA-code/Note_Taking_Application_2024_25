import { Course, User } from '../types';
import { ApiClient } from './api-client';

interface Resource {
    _id: string;
    title: string;
    description?: string;
    url: string;
    course?: Course;
    user: User;
    createdAt: string;
    updatedAt: string;
}

export class ResourcesApi {
    static async getAllResources(): Promise<Resource[]> {
        return ApiClient.request('/resources');
    }

    static async getResource(id: string): Promise<Resource> {
        return ApiClient.request(`/resources/${id}`);
    }

    static async uploadResource(formData: FormData): Promise<Resource> {
        return ApiClient.request('/resources/upload', {
            method: 'POST',
            body: formData,
            headers: {} // Let browser set content-type for FormData
        });
    }

    static async deleteResource(id: string): Promise<void> {
        return ApiClient.request(`/resources/${id}`, {
            method: 'DELETE'
        });
    }
}