import { ApiClient } from './api-client.js';

export class NotesApi {
    static async getAllNotes() {
        return ApiClient.request('/notes');
    }

    static async getNote(id) {
        return ApiClient.request(`/notes/${id}`);
    }

    static async createNote(noteData) {
        return ApiClient.request('/notes', {
            method: 'POST',
            body: JSON.stringify(noteData)
        });
    }

    static async updateNote(id, noteData) {
        return ApiClient.request(`/notes/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(noteData)
        });
    }

    static async deleteNote(id) {
        return ApiClient.request(`/notes/${id}`, {
            method: 'DELETE'
        });
    }

    static async getNotesByCourse(courseId) {
        return ApiClient.request(`/notes?course=${courseId}`);
    }
}