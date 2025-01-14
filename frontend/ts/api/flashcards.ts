import { Course, User } from '../types';
import { ApiClient } from './api-client';

interface Flashcard {
    _id: string;
    question: string;
    answer: string;
    course?: Course;
    user: User;
    createdAt: string;
    updatedAt: string;
}

export class FlashcardsApi {
    static async getAllFlashcards(): Promise<Flashcard[]> {
        return ApiClient.request('/flashcards');
    }

    static async getFlashcard(id: string): Promise<Flashcard> {
        return ApiClient.request(`/flashcards/${id}`);
    }

    static async createFlashcard(flashcardData: Partial<Flashcard>): Promise<Flashcard> {
        return ApiClient.request('/flashcards', {
            method: 'POST',
            body: JSON.stringify(flashcardData)
        });
    }

    static async updateFlashcard(id: string, flashcardData: Partial<Flashcard>): Promise<Flashcard> {
        return ApiClient.request(`/flashcards/${id}`, {
            method: 'PUT',
            body: JSON.stringify(flashcardData)
        });
    }

    static async deleteFlashcard(id: string): Promise<void> {
        return ApiClient.request(`/flashcards/${id}`, {
            method: 'DELETE'
        });
    }
}