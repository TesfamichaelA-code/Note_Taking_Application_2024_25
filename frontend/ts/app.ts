import { AuthGuard } from './utils/auth-guard';
import { Toast } from './utils/toast';
import { NavigationComponent } from './components/navigation';

class App {
    static init(): void {
        document.addEventListener('DOMContentLoaded', () => {
            this.initializeNavigation();
            this.initializeLogoutHandler();
        });
    }

    static initializeNavigation(): void {
        const navContainer = document.querySelector('nav.navbar');
        if (navContainer) {
            const user = AuthGuard.getUserInfo();
            navContainer.outerHTML = NavigationComponent.navbar({ user });
        }
    }

    static initializeLogoutHandler(): void {
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', async () => {
                try {
                    await AuthGuard.clearAuth();
                    window.location.href = '/pages/auth/login.html';
                } catch (error) {
                    console.error('Logout failed:', error);
                    Toast.error('Logout failed. Please try again.');
                }
            });
        }
    }
}

// Initialize application
App.init();