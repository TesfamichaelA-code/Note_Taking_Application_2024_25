export class FlashcardsComponent {
    static flashcardCard(flashcard) {
        return `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Question</h5>
                    <p class="card-text">${flashcard.question}</p>
                    <hr>
                    <h5 class="card-title">Answer</h5>
                    <p class="card-text">${flashcard.answer}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <small class="text-muted">
                            ${flashcard.course ? `Course: ${flashcard.course.title}` : 'No course'}
                        </small>
                        <div class="btn-group">
                            <a href="edit.html?id=${flashcard._id}" class="btn btn-sm btn-outline-primary">Edit</a>
                            <button class="btn btn-sm btn-outline-danger delete-flashcard" 
                                    data-id="${flashcard._id}">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    static studyCard(flashcard) {
        return `
            <div class="flashcard" id="currentCard">
                <div class="flashcard-inner">
                    <div class="flashcard-front">
                        <h3>Question</h3>
                        <p>${flashcard.question}</p>
                    </div>
                    <div class="flashcard-back">
                        <h3>Answer</h3>
                        <p>${flashcard.answer}</p>
                    </div>
                </div>
            </div>
        `;
    }
}