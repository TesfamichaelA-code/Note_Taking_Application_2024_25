interface ResourceCardProps {
    _id: string;
    title: string;
    description?: string;
    url: string;
    course?: {
        _id: string;
        title: string;
    };
}

export class ResourcesComponent {
    static resourceCard(resource: ResourceCardProps): string {
        return `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${resource.title}</h5>
                    <p class="card-text">${resource.description || 'No description'}</p>
                    <div class="d-flex justify-content-between align-items-center">
                        <small class="text-muted">
                            ${resource.course ? `Course: ${resource.course.title}` : 'No course'}
                        </small>
                        <div class="btn-group">
                            <a href="${resource.url}" class="btn btn-sm btn-primary" 
                               target="_blank">View</a>
                            <a href="${resource.url}" class="btn btn-sm btn-success" 
                               download>Download</a>
                            <button class="btn btn-sm btn-danger delete-resource" 
                                    data-id="${resource._id}">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    static uploadModal(): string {
        return `
            <div class="modal fade" id="uploadModal" tabindex="-1">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Upload Resource</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <form id="uploadForm">
                                <div class="mb-3">
                                    <label for="title" class="form-label">Title</label>
                                    <input type="text" class="form-control" id="title" required>
                                </div>
                                <div class="mb-3">
                                    <label for="description" class="form-label">Description</label>
                                    <textarea class="form-control" id="description" rows="3"></textarea>
                                </div>
                                <div class="mb-3">
                                    <label for="courseId" class="form-label">Course</label>
                                    <select class="form-select" id="courseId" required>
                                        <option value="">Select Course</option>
                                    </select>
                                </div>
                                <div class="mb-3">
                                    <label for="file" class="form-label">File</label>
                                    <input type="file" class="form-control" id="file" required>
                                </div>
                            </form>
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" 
                                    data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" 
                                    id="uploadBtn">Upload</button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
}