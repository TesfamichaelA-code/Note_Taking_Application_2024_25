import { User } from '../types';
import { ApiClient } from './api-client';

interface LoginResponse {
    access_token: string;
    user: User;
}

interface RegisterData {
    name: string;
    email: string;
    password: string;
    studentId?: string;
    role: 'student' | 'teacher';
}

export class AuthApi {
    static async login(email: string, password: string): Promise<LoginResponse> {
        return ApiClient.request('/auth/login', {
            method: 'POST',
            body: JSON.stringify({ email, password })
        });
    }

    static async register(userData: RegisterData): Promise<void> {
        return ApiClient.request('/auth/register', {
            method: 'POST',
            body: JSON.stringify(userData)
        });
    }
}