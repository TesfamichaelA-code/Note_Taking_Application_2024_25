import bootstrap = require("bootstrap");

export class Toast {
    static show(message: string, type: 'success' | 'danger' | 'warning' | 'info' = 'info'): void {
        const toastContainer = document.querySelector('.toast-container');
        if (!toastContainer) return;

        const toast = document.createElement('div');
        toast.className = `toast align-items-center text-white bg-${type}`;
        toast.setAttribute('role', 'alert');
        toast.setAttribute('aria-live', 'assertive');
        toast.setAttribute('aria-atomic', 'true');

        toast.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" 
                        data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
        `;

        toastContainer.appendChild(toast);
        const bsToast = new bootstrap.Toast(toast);
        bsToast.show();

        toast.addEventListener('hidden.bs.toast', () => {
            toast.remove();
        });
    }

    static success(message: string): void {
        this.show(message, 'success');
    }

    static error(message: string): void {
        this.show(message, 'danger');
    }

    static warning(message: string): void {
        this.show(message, 'warning');
    }
}