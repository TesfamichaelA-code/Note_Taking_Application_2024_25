import { ApiClient } from './api-client.js';

export class UsersApi {
    static async getAllUsers() {
        return ApiClient.request('/users');
    }

    static async getUser(id) {
        return ApiClient.request(`/users/${id}`);
    }

    static async createUser(userData) {
        return ApiClient.request('/users', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    }

    static async updateUser(id, userData) {
        return ApiClient.request(`/users/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(userData)
        });
    }

    static async deleteUser(id) {
        return ApiClient.request(`/users/${id}`, {
            method: 'DELETE'
        });
    }

    static async getCurrentUser() {
        return ApiClient.request('/users/me');
    }
}