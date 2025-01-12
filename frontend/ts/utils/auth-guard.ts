interface User {
    _id: string;
    name: string;
    email: string;
    role: 'student' | 'teacher' | 'admin';
    studentId?: string;
}

export class AuthGuard {
    static isAuthenticated(): boolean {
        return !!localStorage.getItem('token');
    }

    static getToken(): string | null {
        return localStorage.getItem('token');
    }

    static getUserInfo(): User | null {
        const userInfo = localStorage.getItem('user');
        return userInfo ? JSON.parse(userInfo) : null;
    }

    static setAuth(token: string, user: User): void {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
    }

    static async clearAuth(): Promise<void> {
        try {
            const token = this.getToken();
            await fetch('http://localhost:3000/auth/logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
        } catch (error) {
            console.error('Logout error:', error);
        } finally {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
    }

    static checkAuth(): boolean {
        if (!this.isAuthenticated()) {
            window.location.href = '/pages/auth/login.html';
            return false;
        }
        return true;
    }
}