var DocumentManager = /** @class */ (function () {
    function DocumentManager() {
        this.chaptersContainer = document.getElementById('chaptersContainer');
        this.initialize();
    }
    DocumentManager.prototype.initialize = function () {
        var _this = this;
        // Add button click handler
        var addButton = document.getElementById('addButton');
        if (addButton) {
            addButton.addEventListener('click', function () { return _this.addNewChapter(); });
        }
        // Initialize existing chapters (if any)
        this.setupChapterListeners();
    };
    DocumentManager.prototype.addNewChapter = function () {
        var chapterNumber = this.chaptersContainer.children.length + 1;
        var chapterItem = document.createElement('div');
        chapterItem.className = 'chapter-item';
        chapterItem.innerHTML = "\n            <button class=\"chapter-button\">\n                <span class=\"chapter-text\" contenteditable=\"true\">Chapter ".concat(chapterNumber, "</span>\n                <span class=\"minus-icon\">\u2212</span>\n            </button>\n        ");
        this.chaptersContainer.appendChild(chapterItem);
        this.setupChapterListeners();
    };
    DocumentManager.prototype.setupChapterListeners = function () {
        var _this = this;
        // Remove all existing listeners first
        var existingIcons = document.querySelectorAll('.minus-icon');
        existingIcons.forEach(function (icon) {
            var _a;
            var newIcon = icon.cloneNode(true);
            (_a = icon.parentNode) === null || _a === void 0 ? void 0 : _a.replaceChild(newIcon, icon);
        });
        // Add new listeners for minus icons
        var minusIcons = document.querySelectorAll('.minus-icon');
        minusIcons.forEach(function (icon) {
            icon.addEventListener('click', function (e) { return _this.removeChapter(e); });
        });
        // Add listeners for chapter text editing
        var chapterTexts = document.querySelectorAll('.chapter-text');
        chapterTexts.forEach(function (text) {
            // Make text editable on click
            text.addEventListener('click', function (e) {
                var target = e.target;
                target.contentEditable = 'true';
                target.focus();
            });
            text.addEventListener('keydown', function (e) {
                var keyboardEvent = e;
                var target = keyboardEvent.target;
                if (keyboardEvent.key === 'Enter') {
                    e.preventDefault();
                    target.contentEditable = 'false';
                    target.blur();
                }
            });
            text.addEventListener('blur', function (e) {
                var _a;
                var target = e.target;
                target.contentEditable = 'false';
                if (!((_a = target.textContent) === null || _a === void 0 ? void 0 : _a.trim())) {
                    target.textContent = "Chapter ".concat(_this.getChapterIndex(target) + 1);
                }
            });
        });
        // Add listeners for chapter buttons
        var chapterButtons = document.querySelectorAll('.chapter-button');
        chapterButtons.forEach(function (button) {
            button.addEventListener('click', function (e) {
                var target = e.target;
                var buttonElement = target.closest('.chapter-button');
                if (!target.classList.contains('chapter-text') &&
                    !target.classList.contains('minus-icon') &&
                    buttonElement) {
                    _this.handleFileUpload(buttonElement);
                }
            });
        });
    };
    DocumentManager.prototype.getChapterIndex = function (element) {
        var chapterItem = element.closest('.chapter-item');
        if (!chapterItem)
            return 0;
        return Array.from(this.chaptersContainer.children).indexOf(chapterItem);
    };
    DocumentManager.prototype.removeChapter = function (event) {
        event.preventDefault();
        event.stopPropagation();
        var icon = event.target;
        var chapterItem = icon.closest('.chapter-item');
        if (chapterItem && chapterItem.parentElement) {
            chapterItem.parentElement.removeChild(chapterItem);
        }
    };
    DocumentManager.prototype.handleFileUpload = function (button) {
        var _this = this;
        var fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = '.pdf,.doc,.docx,.txt';
        fileInput.addEventListener('change', function (e) {
            var input = e.target;
            if (input && input.files && input.files.length > 0) {
                var file = input.files[0];
                _this.uploadFile(file, button);
            }
        });
        fileInput.click();
    };
    DocumentManager.prototype.uploadFile = function (file, button) {
        var formData = new FormData();
        formData.append('file', file);
        // Find or create file name span within this specific button
        var fileNameSpan = button.querySelector('.file-name');
        if (!fileNameSpan) {
            fileNameSpan = document.createElement('span');
            fileNameSpan.className = 'file-name';
            // Insert before the minus icon
            var minusIcon = button.querySelector('.minus-icon');
            if (minusIcon) {
                button.insertBefore(fileNameSpan, minusIcon);
            }
            else {
                button.appendChild(fileNameSpan);
            }
        }
        // Ensure fileNameSpan is an HTMLElement before accessing style
        if (fileNameSpan instanceof HTMLElement) {
            // Update UI to show selected file
            fileNameSpan.textContent = "(".concat(file.name, ")");
            fileNameSpan.style.fontSize = '0.8em';
            fileNameSpan.style.marginLeft = '10px';
            fileNameSpan.style.color = '#6c757d';
        }
        // Example upload implementation
        try {
            // Your upload logic here
            console.log('Uploading file:', file.name);
            // Simulated upload success
            // Replace this with your actual upload code
            /*
            const response = await fetch('/api/upload', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Upload failed');
            }
            */
        }
        catch (error) {
            console.error('Upload error:', error);
            if (fileNameSpan instanceof HTMLElement) {
                fileNameSpan.textContent = '(Upload failed)';
                fileNameSpan.style.color = '#dc3545';
            }
        }
    };
    return DocumentManager;
}());
// Initialize the document manager when the DOM is loaded
document.addEventListener('DOMContentLoaded', function () {
    var manager = new DocumentManager();
});
