export class NotesComponent {
    static noteCard(note) {
        return `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${note.title}</h5>
                    <p class="card-text">${note.content.substring(0, 150)}...</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <small class="text-muted">
                            ${note.course ? `Course: ${note.course.title}` : 'No course'}
                        </small>
                        <div class="btn-group">
                            <a href="edit.html?id=${note._id}" class="btn btn-sm btn-outline-primary">Edit</a>
                            <button class="btn btn-sm btn-outline-danger delete-note" 
                                    data-id="${note._id}">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    static noteForm(courses, note = null) {
        return `
            <form id="noteForm">
                <div class="mb-3">
                    <label for="title" class="form-label">Title</label>
                    <input type="text" class="form-control" id="title" 
                           value="${note?.title || ''}" required>
                </div>
                <div class="mb-3">
                    <label for="courseId" class="form-label">Course</label>
                    <select class="form-select" id="courseId">
                        <option value="">Select Course</option>
                        ${courses.map(course => `
                            <option value="${course._id}" 
                                    ${note?.course?._id === course._id ? 'selected' : ''}>
                                ${course.title}
                            </option>
                        `).join('')}
                    </select>
                </div>
                <div class="mb-3">
                    <label for="content" class="form-label">Content</label>
                    <div id="editor">${note?.content || ''}</div>
                </div>
                <button type="submit" class="btn btn-primary">Save Note</button>
            </form>
        `;
    }
}