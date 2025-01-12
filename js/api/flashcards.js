import { ApiClient } from './api-client.js';

export class FlashcardsApi {
    static async getAllFlashcards() {
        return ApiClient.request('/flashcards');
    }

    static async getFlashcard(id) {
        return ApiClient.request(`/flashcards/${id}`);
    }

    static async createFlashcard(flashcardData) {
        return ApiClient.request('/flashcards', {
            method: 'POST',
            body: JSON.stringify(flashcardData)
        });
    }

    static async updateFlashcard(id, flashcardData) {
        return ApiClient.request(`/flashcards/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(flashcardData)
        });
    }

    static async deleteFlashcard(id) {
        return ApiClient.request(`/flashcards/${id}`, {
            method: 'DELETE'
        });
    }

    static async getFlashcardsByCourse(courseId) {
        return ApiClient.request(`/flashcards/course/${courseId}`);
    }
}