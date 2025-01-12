export class ApiClient {
    static BASE_URL: string = 'http://localhost:3000';

    static async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
        const url = `${this.BASE_URL}${endpoint}`;
        const token = localStorage.getItem('token');
        
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            ...options.headers
        };

        try {
            const response = await fetch(url, {
                ...options,
                headers
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
                return await response.json();
            }
            
            return null as T;
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }
}