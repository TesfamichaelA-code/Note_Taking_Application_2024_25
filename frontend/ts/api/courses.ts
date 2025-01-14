import { User } from '../types';
import { ApiClient } from './api-client';

interface Course {
    _id: string;
    title: string;
    description?: string;
    teacher: User;
    students: User[];
    createdAt: string;
    updatedAt: string;
}

export class CoursesApi {
    static async getAllCourses(): Promise<Course[]> {
        return ApiClient.request('/courses');
    }

    static async getCourse(id: string): Promise<Course> {
        return ApiClient.request(`/courses/${id}`);
    }

    static async createCourse(courseData: Partial<Course>): Promise<Course> {
        return ApiClient.request('/courses', {
            method: 'POST',
            body: JSON.stringify(courseData)
        });
    }

    static async updateCourse(id: string, courseData: Partial<Course>): Promise<Course> {
        return ApiClient.request(`/courses/${id}`, {
            method: 'PUT',
            body: JSON.stringify(courseData)
        });
    }

    static async deleteCourse(id: string): Promise<void> {
        return ApiClient.request(`/courses/${id}`, {
            method: 'DELETE'
        });
    }

    static async addStudent(courseId: string, studentId: string): Promise<void> {
        return ApiClient.request(`/courses/${courseId}/students`, {
            method: 'POST',
            body: JSON.stringify({ studentId })
        });
    }

    static async removeStudent(courseId: string, studentId: string): Promise<void> {
        return ApiClient.request(`/courses/${courseId}/students/${studentId}`, {
            method: 'DELETE'
        });
    }
}