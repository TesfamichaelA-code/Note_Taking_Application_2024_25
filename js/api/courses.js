import { ApiClient } from './api-client.js';

export class CoursesApi {
    static async getAllCourses() {
        return ApiClient.request('/courses');
    }

    static async getCourse(id) {
        return ApiClient.request(`/courses/${id}`);
    }

    static async createCourse(courseData) {
        return ApiClient.request('/courses', {
            method: 'POST',
            body: JSON.stringify(courseData)
        });
    }

    static async updateCourse(id, courseData) {
        return ApiClient.request(`/courses/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(courseData)
        });
    }

    static async deleteCourse(id) {
        return ApiClient.request(`/courses/${id}`, {
            method: 'DELETE'
        });
    }

    static async addStudent(courseId, studentId) {
        return ApiClient.request(`/courses/${courseId}/students/${studentId}`, {
            method: 'PATCH'
        });
    }

    static async removeStudent(courseId, studentId) {
        return ApiClient.request(`/courses/${courseId}/students/${studentId}`, {
            method: 'DELETE'
        });
    }
}