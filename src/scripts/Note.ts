interface Chapter {
    id: number;
    title: string;
    isEditing: boolean;
}

class DocumentManager {

    private chaptersContainer: HTMLElement;

    constructor() {
        this.chaptersContainer = document.getElementById('chaptersContainer')!;
        this.initialize();
    }

    private initialize(): void {
        // Add button click handler
        const addButton = document.getElementById('addButton');
        if (addButton) {
            addButton.addEventListener('click', () => this.addNewChapter());
        }

        // Initialize existing chapters (if any)
        this.setupChapterListeners();
    }

    private addNewChapter(): void {
        const chapterNumber = this.chaptersContainer.children.length + 1;
        const chapterItem = document.createElement('div');
        chapterItem.className = 'chapter-item mb-3'; // Add margin class for spacing
        chapterItem.innerHTML = `
            <button class="chapter-button list-group-item list-group-item-action d-flex justify-content-between align-items-center bg-dark text-white border-0 rounded-3">
                <span class="chapter-text" contenteditable="true">Chapter ${chapterNumber}</span>
                <span class="file-name"></span>
                <span class="minus-icon cursor-pointer">−</span>
            </button>
        `;
        this.chaptersContainer.appendChild(chapterItem);
        this.setupChapterListeners();
    }

    private setupChapterListeners(): void {
        // Remove all existing listeners first
        const existingIcons = document.querySelectorAll('.minus-icon');
        existingIcons.forEach(icon => {
            const newIcon = icon.cloneNode(true);
            icon.parentNode?.replaceChild(newIcon, icon);
        });

        // Add new listeners for minus icons
        const minusIcons = document.querySelectorAll('.minus-icon');
        minusIcons.forEach(icon => {
            icon.addEventListener('click', (e: Event) => this.removeChapter(e));
        });

        // Add listeners for chapter text editing
        const chapterTexts = document.querySelectorAll('.chapter-text');
        chapterTexts.forEach(text => {
            // Make text editable on click
            (text as HTMLElement).addEventListener('click', () => {
                (text as HTMLElement).contentEditable = 'true';
                (text as HTMLElement).focus();
            });

            text.addEventListener('keydown', (e: Event) => {
                const keyboardEvent = e as KeyboardEvent;
                const target = keyboardEvent.target as HTMLElement;
                if (keyboardEvent.key === 'Enter') {
                    e.preventDefault();
                    target.contentEditable = 'false';
                    target.blur();
                }
            });

            text.addEventListener('blur', () => {
                const textElement = text as HTMLElement;
                textElement.contentEditable = 'false';
                if (!textElement.textContent?.trim()) {
                    textElement.textContent = `Chapter ${this.getChapterIndex(textElement) + 1}`;
                }
            });
        });

        // Add listeners for chapter buttons (file upload)
        const chapterButtons = document.querySelectorAll('.chapter-button');
        chapterButtons.forEach(button => {
            button.addEventListener('click', (e: Event) => {
                const target = e.target as HTMLElement;
                // Don't trigger file upload if clicking on the text or minus icon
                if (target.classList.contains('chapter-text') || target.classList.contains('minus-icon')) {
                    return;
                }
                this.handleFileUpload();
            });
        });
    }

    private getChapterIndex(element: HTMLElement): number {
        const chapterItem = element.closest('.chapter-item');
        if (!chapterItem) return 0;
        return Array.from(this.chaptersContainer.children).indexOf(chapterItem);
    }

    private removeChapter(event: Event): void {
        event.preventDefault();
        event.stopPropagation();
        const icon = event.target as HTMLElement;
        const chapterItem = icon.closest('.chapter-item');
        if (chapterItem && chapterItem.parentElement) {
            chapterItem.parentElement.removeChild(chapterItem);
        }
    }

    private handleFileUpload(): void {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.pdf,.doc,.docx,.txt'; // You can customize accepted file types

        fileInput.addEventListener('change', (e: Event) => {
            const target = e.target as HTMLInputElement;
            const file = target.files?.[0];
            
            if (file) {
                // Here you can handle the file upload
                console.log('Selected file:', file.name);
                // You can add your file upload logic here
                // For example, sending to a server using FormData
                this.uploadFile(file);
            }
        });

        fileInput.click(); // Trigger file picker
    }

    private uploadFile(file: File): void {
        // Example upload function
        const formData = new FormData();
        formData.append('file', file);

        // You can implement your upload logic here
        // For example:
        /*
        fetch('/api/upload', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            console.log('Upload successful:', data);
            // Handle successful upload
        })
        .catch(error => {
            console.error('Upload failed:', error);
      '*/}}
