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

    static async clearAuth() {
        try {
            // Make a logout request to the backend
            await fetch('http://localhost:3000/auth/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${this.getToken()}`
                }
            });
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            // Clear local storage regardless of server response
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            window.location.href = '/pages/auth/login.html';
        }
    }

    static checkAuth() {
        if (!this.isAuthenticated()) {
            this.redirectToLogin();
            return false;
        }
        return true;
    }

    static redirectToLogin() {
        window.location.href = '/pages/auth/login.html';
    }
    static initLogoutHandler() {
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', async () => {
                await this.clearAuth();
                window.location.href = '/pages/auth/login.html';
            });
        }
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