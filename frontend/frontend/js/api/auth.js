import { ApiClient } from './api-client.js';

export class AuthApi {
    static async login(email, password) {
        return ApiClient.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
    }

    static async register(userData) {
        return ApiClient.request('/users/register', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    }
}