class AdminDashboard {
    private teachersData: Teacher[] = [
        { id: 1, name: 'Mr. Betsegaw', teacherId: '1234', email: 'betsegaw@gmail.com', course: 'Website Development' },
        { id: 2, name: 'Mr. Vittapu', teacherId: '5678', email: 'vittapu@gmail.com', course: 'Fundamental of Electrical Circuit' }
    ];
    private studentsCount: number = 200;

    private teachersList: HTMLTableSectionElement;
    private searchInput: HTMLInputElement;
    private addTeacherButton: HTMLButtonElement;
    private teachersTab: HTMLButtonElement;
    private studentsTab: HTMLButtonElement;
    private totalTeachersElement: HTMLElement;
    private totalStudentsElement: HTMLElement;
    private teacherForm: HTMLElement;
    private teacherNameInput: HTMLInputElement;
    private teacherIdInput: HTMLInputElement;
    private teacherEmailInput: HTMLInputElement;
    private teacherCourseInput: HTMLInputElement;
    private saveTeacherButton: HTMLButtonElement;

    constructor() {
        // Initialize properties in the constructor
        this.teachersList = document.querySelector('#teachers tbody') as HTMLTableSectionElement;
        this.searchInput = document.querySelector('input[placeholder="Search"]') as HTMLInputElement;
        this.addTeacherButton = document.querySelector('.btn-dark') as HTMLButtonElement;
        this.teachersTab = document.getElementById('teachers-tab') as HTMLButtonElement;
        this.studentsTab = document.getElementById('students-tab') as HTMLButtonElement;
        this.totalTeachersElement = document.querySelector('.card-body h3') as HTMLElement;
        this.totalStudentsElement = document.querySelectorAll('.card-body h3')[1] as HTMLElement;
        this.teacherForm = document.getElementById('teacher-form') as HTMLElement;
        this.teacherNameInput = document.getElementById('teacher-name') as HTMLInputElement;
        this.teacherIdInput = document.getElementById('teacher-id') as HTMLInputElement;
        this.teacherEmailInput = document.getElementById('teacher-email') as HTMLInputElement;
        this.teacherCourseInput = document.getElementById('teacher-course') as HTMLInputElement;
        this.saveTeacherButton = document.getElementById('save-teacher') as HTMLButtonElement;

        // Initialize other components
        this.addEventListeners();
        this.renderTeachers();
        this.updateStats();
    }

    private addEventListeners(): void {
        this.searchInput.addEventListener('input', () => this.searchTeachers());
        this.addTeacherButton.addEventListener('click', () => this.showTeacherForm());
        this.saveTeacherButton.addEventListener('click', () => this.addNewTeacher());
        this.teachersTab.addEventListener('click', () => this.switchTab('teachers'));
        this.studentsTab.addEventListener('click', () => this.switchTab('students'));
    }

    private renderTeachers(): void {
        this.teachersList.innerHTML = '';
        this.teachersData.forEach((teacher, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td class="teacher-name">${teacher.name}</td>
                <td class="teacher-id">${teacher.teacherId}</td>
                <td class="teacher-email">${teacher.email}</td>
                <td class="teacher-course">${teacher.course}</td>
                <td>
                    <a href="#" class="text-primary delete-teacher" data-id="${teacher.id}">Delete</a>
                </td>
            `;
            if (index === this.teachersData.length - 1) {
                row.classList.add('spacing-bottom');
            }
            this.teachersList.appendChild(row);
        });

        document.querySelectorAll('.delete-teacher').forEach(button => {
            button.addEventListener('click', (e) => this.deleteTeacher(e));
        });
    }

    private searchTeachers(): void {
        const searchTerm = this.searchInput.value.toLowerCase();
        const filteredTeachers = this.teachersData.filter(teacher => 
            teacher.name.toLowerCase().includes(searchTerm) ||
            teacher.email.toLowerCase().includes(searchTerm) ||
            teacher.course.toLowerCase().includes(searchTerm)
        );
        this.renderFilteredTeachers(filteredTeachers);
    }

    private renderFilteredTeachers(teachers: Teacher[]): void {
        this.teachersList.innerHTML = '';
        teachers.forEach((teacher, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${teacher.name}</td>
                <td>${teacher.teacherId}</td>
                <td>${teacher.email}</td>
                <td>${teacher.course}</td>
                <td><a href="#" class="text-primary delete-teacher" data-id="${teacher.id}">Delete</a></td>
            `;
            if (index === teachers.length - 1) {
                row.classList.add('spacing-bottom');
            }
            this.teachersList.appendChild(row);
        });

        document.querySelectorAll('.delete-teacher').forEach(button => {
            button.addEventListener('click', (e) => this.deleteTeacher(e));
        });
    }

    private showTeacherForm(): void {
        // Display the form and focus on the teacher's name input
        this.teacherForm.style.display = 'block';
        this.teacherNameInput.focus();
    }

    private addNewTeacher(): void {
        const name = this.teacherNameInput.value.trim();
        const teacherId = this.teacherIdInput.value.trim();
        const email = this.teacherEmailInput.value.trim();
        const course = this.teacherCourseInput.value.trim();

        if (name && teacherId && email && course) {
            const newTeacher: Teacher = {
                id: this.teachersData.length + 1,
                name,
                teacherId,
                email,
                course
            };
            this.teachersData.push(newTeacher);
            this.renderTeachers();
            this.updateStats();
            this.teacherForm.style.display = 'none'; // Hide the form after adding the teacher
            this.resetFormFields();
        } else {
            alert('All fields are required!');
        }
    }

    private deleteTeacher(e: Event): void {
        e.preventDefault();
        const target = e.target as HTMLAnchorElement;
        const teacherId = parseInt(target.getAttribute('data-id') || '0', 10);
        this.teachersData = this.teachersData.filter(teacher => teacher.id !== teacherId);

        // Remove the corresponding row from the table
        const row = target.closest('tr');
        if (row) {
            row.remove();
        }

        this.updateStats();
    }

    private resetFormFields(): void {
        this.teacherNameInput.value = '';
        this.teacherIdInput.value = '';
        this.teacherEmailInput.value = '';
        this.teacherCourseInput.value = '';
    }

    private switchTab(tab: 'teachers' | 'students'): void {
        if (tab === 'teachers') {
            this.teachersTab.classList.add('active');
            this.studentsTab.classList.remove('active');
            document.getElementById('teachers')?.classList.add('show', 'active');
            document.getElementById('students')?.classList.remove('show', 'active');
        } else {
            this.teachersTab.classList.remove('active');
            this.studentsTab.classList.add('active');
            document.getElementById('teachers')?.classList.remove('show', 'active');
            document.getElementById('students')?.classList.add('show', 'active');
        }
    }

    private updateStats(): void {
        this.totalTeachersElement.textContent = this.teachersData.length.toString();
        this.totalStudentsElement.textContent = this.studentsCount.toString();
    }
}

interface Teacher {
    id: number;
    name: string;
    teacherId: string;
    email: string;
    course: string;
}

document.addEventListener('DOMContentLoaded', () => {
    new AdminDashboard();
});
