import { AuthGuard } from './utils/auth-guard.js';
import { Toast } from './utils/toast.js';

// Initialize navigation
function initializeNavigation() {
    const user = AuthGuard.getUserInfo();
    const nav = document.querySelector('.navbar-nav');
    
    if (nav) {
        // Update navigation based on user role
        if (user && ['teacher', 'admin'].includes(user.role)) {
            nav.innerHTML += `
                <li class="nav-item">
                    <a class="nav-link" href="/pages/users/index.html">Users</a>
                </li>
            `;
        }

        // Add user info and logout button
        if (user) {
            nav.innerHTML += `
                <li class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" id="userDropdown" 
                       role="button" data-bs-toggle="dropdown">
                        ${user.email}
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li><a class="dropdown-item" href="#" id="logoutBtn">Logout</a></li>
                    </ul>
                </li>
            `;
        }
    }
}

// Handle logout
document.addEventListener('click', (e) => {
    if (e.target.id === 'logoutBtn') {
        e.preventDefault();
        AuthGuard.clearAuth();
        window.location.href = '/pages/auth/login.html';
    }
});

// Initialize application
document.addEventListener('DOMContentLoaded', () => {
    initializeNavigation();
});

// Global error handling
window.addEventListener('unhandledrejection', (event) => {
    console.error('Unhandled promise rejection:', event.reason);
    Toast.error('An error occurred. Please try again later.');
});