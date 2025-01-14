import { Course, User } from '../types';
import { ApiClient } from './api-client';

interface Note {
    _id: string;
    title: string;
    content: string;
    course?: Course;
    user: User;
    createdAt: string;
    updatedAt: string;
}

export class NotesApi {
    static async getAllNotes(): Promise<Note[]> {
        return ApiClient.request('/notes');
    }

    static async getNote(id: string): Promise<Note> {
        return ApiClient.request(`/notes/${id}`);
    }

    static async createNote(noteData: Partial<Note>): Promise<Note> {
        return ApiClient.request('/notes', {
            method: 'POST',
            body: JSON.stringify(noteData)
        });
    }

    static async updateNote(id: string, noteData: Partial<Note>): Promise<Note> {
        return ApiClient.request(`/notes/${id}`, {
            method: 'PUT',
            body: JSON.stringify(noteData)
        });
    }

    static async deleteNote(id: string): Promise<void> {
        return ApiClient.request(`/notes/${id}`, {
            method: 'DELETE'
        });
    }
}