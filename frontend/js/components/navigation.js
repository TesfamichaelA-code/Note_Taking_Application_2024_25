export class NavigationComponent {
    static navbar(user) {
        return `
            <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
                <div class="container">
                    <a class="navbar-brand" href="/">Study Notes</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" 
                            data-bs-target="#navbarNav">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav me-auto">
                            <li class="nav-item">
                                <a class="nav-link" href="/pages/courses/index.html">Courses</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/pages/notes/index.html">Notes</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/pages/flashcards/index.html">Flashcards</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link" href="/pages/resources/index.html">Resources</a>
                            </li>
                            ${['teacher', 'admin'].includes(user?.role) ? `
                                <li class="nav-item">
                                    <a class="nav-link" href="/pages/users/index.html">Users</a>
                                </li>
                            ` : ''}
                        </ul>
                        <ul class="navbar-nav ms-auto">
                            ${user ? `
                                <li class="nav-item">
                                    <span class="nav-link">Welcome, ${user.name}</span>
                                </li>
                                <li class="nav-item">
                                    <a class="nav-link" href="/pages/profile/index.html">Profile</a>
                                </li>
                                <li class="nav-item">
                                    <button class="btn btn-danger nav-link" id="logoutBtn">
                                        <i class="bi bi-box-arrow-right"></i> Logout
                                    </button>
                                </li>
                            ` : ''}
                        </ul>
                    </div>
                </div>
            </nav>
        `;
    }
}