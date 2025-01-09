class Course {
    constructor(
        public id: string,
        public title: string,
        public publishedBy: string,
        public href: string
    ) {}
}

class EduWave {
    private courses: Course[] = [
        new Course('1', 'Fundamental Of Electrical Circuit', 'Mr. Vittapu', '#electrical-circuit'),
        new Course('2', 'Fundamental Of Software Engineering', 'Mr. Vittapu', '#software-engineering'),
        new Course('3', 'Human Computer Interaction', 'Mr. Mittapu', '#human-computer-interaction'),
        new Course('4', 'Computer Architecture and Organization', 'Mr. Abebe', '#computer-architecture'),
        new Course('5', 'Website Development', 'Mr. Betsegaw', '#website-development')
    ];

    private createNavbar(): HTMLElement {
        const navbar = document.createElement('nav');
        navbar.className = 'navbar navbar-expand-lg navbar-light bg-light py-3';
        navbar.innerHTML = `
            <div class="container">
                <a class="navbar-brand d-flex align-items-center" href="#">
                    <svg class="logo me-2" viewBox="0 0 100 100" width="40" height="40">
                        <path d="M20,20 Q50,10 80,20 Q50,30 20,20" fill="none" stroke="black" stroke-width="4"/>
                        <path d="M20,40 Q50,30 80,40 Q50,50 20,40" fill="none" stroke="black" stroke-width="4"/>
                        <path d="M20,60 Q50,50 80,60 Q50,70 20,60" fill="none" stroke="black" stroke-width="4"/>
                    </svg>
                    EduWave
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
                    <ul class="navbar-nav">
                        <li class="nav-item"><a class="nav-link" href="#">Home</a></li>
                        <li class="nav-item"><a class="nav-link" href="#">Courses</a></li>
                        <li class="nav-item"><a class="nav-link" href="#">Profile</a></li>
                    </ul>
                </div>
            </div>
        `;
        return navbar;
    }

    private createCourseCard(course: Course): HTMLElement {
        const card = document.createElement('div');
        card.className = 'col-md-6 col-sm-12 mb-4';
        card.innerHTML = `
            <div class="course-card">
                <a href="${course.href}" class="text-white text-decoration-none">
                    <h3>${course.title}</h3>
                </a>
                <p class="mt-auto text-end mb-0">Published by ${course.publishedBy}</p>
            </div>
        `;
        return card;
    }

    private createCoursesSection(): HTMLElement {
        const section = document.createElement('div');
        section.className = 'container py-5';
        section.innerHTML = `
            <h1 class="display-4 mb-4">Courses</h1>
            <p class="lead mb-5">
                EduWave offers a rich collection of notes and presentations from teachers, covering various subjects
                like Mathematics, Science, Art, and more. With interactive lessons and resources, it's designed to help
                students learn, grow, and excel at their own pace.
            </p>
        `;

        const courseGrid = document.createElement('div');
        courseGrid.className = 'row g-4';
        this.courses.forEach(course => {
            courseGrid.appendChild(this.createCourseCard(course));
        });

        section.appendChild(courseGrid);
        return section;
    }

    public render(): void {
        document.body.className = 'bg-light';
        document.body.appendChild(this.createNavbar());
        document.body.appendChild(this.createCoursesSection());

        // Add necessary styles
        const style = document.createElement('style');
        style.textContent = `
            .course-card {
                background-color: #000;
                color: white;
                border-radius: 15px;
                padding: 20px;
                height: 100%;
                transition: transform 0.2s, box-shadow 0.2s;
            }
            .course-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            }
            .logo {
                width: 40px;
                height: 40px;
            }
            .nav-link {
                color: #000;
                font-weight: 500;
            }
            .nav-link:hover {
                color: #666;
            }
        `;
        document.head.appendChild(style);
    }
}

// Run the application
window.onload = () => {
    const app = new EduWave();
    app.render();
};
