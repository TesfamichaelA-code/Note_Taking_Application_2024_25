import { User } from "../types";

interface CourseCardProps {
    _id: string;
    title: string;
    description?: string;
    teacher: User;
}

export class CoursesComponent {
    static courseCard(course: CourseCardProps): string {
        return `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${course.title}</h5>
                    <p class="card-text">${course.description || 'No description'}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <a href="view.html?id=${course._id}" class="btn btn-primary">View Course</a>
                        ${this.courseActions(course)}
                    </div>
                </div>
            </div>
        `;
    }

    static courseActions(course: CourseCardProps): string {
        const user = JSON.parse(localStorage.getItem('user') || '{}') as User;
        if (['teacher', 'admin'].includes(user?.role)) {
            return `
                <button class="btn btn-danger delete-course" data-id="${course._id}">
                    Delete
                </button>
            `;
        }
        return '';
    }

    static courseModal(): string {
        return `
            <div class="modal fade" id="courseModal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Create Course</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <form id="courseForm">
                                <div class="mb-3">
                                    <label for="title" class="form-label">Title</label>
                                    <input type="text" class="form-control" id="title" required>
                                </div>
                                <div class="mb-3">
                                    <label for="description" class="form-label">Description</label>
                                    <textarea class="form-control" id="description" rows="3"></textarea>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" id="saveCourseBtn">Save Course</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}