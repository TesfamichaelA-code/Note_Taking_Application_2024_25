// auth-guard.js
export class AuthGuard {
    static isAuthenticated() {
        return !!localStorage.getItem('token');
    }

    static getToken() {
        return localStorage.getItem('token');
    }

    static getUserInfo() {
        const userInfo = localStorage.getItem('user');
        return userInfo ? JSON.parse(userInfo) : null;
    }

    static setAuth(token, user) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
    }

    static clearAuth() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

    static redirectToLogin() {
        window.location.href = '/pages/auth/login.html';
    }

    static checkAuth() {
        if (!this.isAuthenticated()) {
            this.redirectToLogin();
            return false;
        }
        return true;
    }
}

// Add a global fetch interceptor for authentication
const originalFetch = window.fetch;
window.fetch = async function(...args) {
    const [resource, config] = args;
    
    // Don't add auth header for login/register
    if (resource.includes('/auth/')) {
        return originalFetch(resource, config);
    }

    const token = AuthGuard.getToken();
    if (token) {
        config.headers = {
            ...config.headers,
            'Authorization': `Bearer ${token}`
        };
    }

    try {
        const response = await originalFetch(resource, config);
        if (response.status === 401) {
            AuthGuard.clearAuth();
            AuthGuard.redirectToLogin();
        }
        return response;
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};