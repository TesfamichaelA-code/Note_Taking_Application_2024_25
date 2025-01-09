var AdminDashboard = /** @class */ (function () {
    function AdminDashboard() {
        this.teachersData = [
            { id: 1, name: 'Mr. Betsegaw', teacherId: '1234', email: 'betsegaw@gmail.com', course: 'Website Development' },
            { id: 2, name: 'Mr. Vittapu', teacherId: '5678', email: 'vittapu@gmail.com', course: 'Fundamental of Electrical Circuit' }
        ];
        this.studentsCount = 200;
        // Initialize properties in the constructor
        this.teachersList = document.querySelector('#teachers tbody');
        this.searchInput = document.querySelector('input[placeholder="Search"]');
        this.addTeacherButton = document.querySelector('.btn-dark');
        this.teachersTab = document.getElementById('teachers-tab');
        this.studentsTab = document.getElementById('students-tab');
        this.totalTeachersElement = document.querySelector('.card-body h3');
        this.totalStudentsElement = document.querySelectorAll('.card-body h3')[1];
        this.teacherForm = document.getElementById('teacher-form');
        this.teacherNameInput = document.getElementById('teacher-name');
        this.teacherIdInput = document.getElementById('teacher-id');
        this.teacherEmailInput = document.getElementById('teacher-email');
        this.teacherCourseInput = document.getElementById('teacher-course');
        this.saveTeacherButton = document.getElementById('save-teacher');
        // Initialize other components
        this.addEventListeners();
        this.renderTeachers();
        this.updateStats();
    }
    AdminDashboard.prototype.addEventListeners = function () {
        var _this = this;
        this.searchInput.addEventListener('input', function () { return _this.searchTeachers(); });
        this.addTeacherButton.addEventListener('click', function () { return _this.showTeacherForm(); });
        this.saveTeacherButton.addEventListener('click', function () { return _this.addNewTeacher(); });
        this.teachersTab.addEventListener('click', function () { return _this.switchTab('teachers'); });
        this.studentsTab.addEventListener('click', function () { return _this.switchTab('students'); });
    };
    AdminDashboard.prototype.renderTeachers = function () {
        var _this = this;
        this.teachersList.innerHTML = '';
        this.teachersData.forEach(function (teacher, index) {
            var row = document.createElement('tr');
            row.innerHTML = "\n                <td>".concat(index + 1, "</td>\n                <td class=\"teacher-name\">").concat(teacher.name, "</td>\n                <td class=\"teacher-id\">").concat(teacher.teacherId, "</td>\n                <td class=\"teacher-email\">").concat(teacher.email, "</td>\n                <td class=\"teacher-course\">").concat(teacher.course, "</td>\n                <td>\n                    <a href=\"#\" class=\"text-primary delete-teacher\" data-id=\"").concat(teacher.id, "\">Delete</a>\n                </td>\n            ");
            if (index === _this.teachersData.length - 1) {
                row.classList.add('spacing-bottom');
            }
            _this.teachersList.appendChild(row);
        });
        document.querySelectorAll('.delete-teacher').forEach(function (button) {
            button.addEventListener('click', function (e) { return _this.deleteTeacher(e); });
        });
    };
    AdminDashboard.prototype.searchTeachers = function () {
        var searchTerm = this.searchInput.value.toLowerCase();
        var filteredTeachers = this.teachersData.filter(function (teacher) {
            return teacher.name.toLowerCase().includes(searchTerm) ||
                teacher.email.toLowerCase().includes(searchTerm) ||
                teacher.course.toLowerCase().includes(searchTerm);
        });
        this.renderFilteredTeachers(filteredTeachers);
    };
    AdminDashboard.prototype.renderFilteredTeachers = function (teachers) {
        var _this = this;
        this.teachersList.innerHTML = '';
        teachers.forEach(function (teacher, index) {
            var row = document.createElement('tr');
            row.innerHTML = "\n                <td>".concat(index + 1, "</td>\n                <td>").concat(teacher.name, "</td>\n                <td>").concat(teacher.teacherId, "</td>\n                <td>").concat(teacher.email, "</td>\n                <td>").concat(teacher.course, "</td>\n                <td><a href=\"#\" class=\"text-primary delete-teacher\" data-id=\"").concat(teacher.id, "\">Delete</a></td>\n            ");
            if (index === teachers.length - 1) {
                row.classList.add('spacing-bottom');
            }
            _this.teachersList.appendChild(row);
        });
        document.querySelectorAll('.delete-teacher').forEach(function (button) {
            button.addEventListener('click', function (e) { return _this.deleteTeacher(e); });
        });
    };
    AdminDashboard.prototype.showTeacherForm = function () {
        // Display the form and focus on the teacher's name input
        this.teacherForm.style.display = 'block';
        this.teacherNameInput.focus();
    };
    AdminDashboard.prototype.addNewTeacher = function () {
        var name = this.teacherNameInput.value.trim();
        var teacherId = this.teacherIdInput.value.trim();
        var email = this.teacherEmailInput.value.trim();
        var course = this.teacherCourseInput.value.trim();
        if (name && teacherId && email && course) {
            var newTeacher = {
                id: this.teachersData.length + 1,
                name: name,
                teacherId: teacherId,
                email: email,
                course: course
            };
            this.teachersData.push(newTeacher);
            this.renderTeachers();
            this.updateStats();
            this.teacherForm.style.display = 'none'; // Hide the form after adding the teacher
            this.resetFormFields();
        }
        else {
            alert('All fields are required!');
        }
    };
    AdminDashboard.prototype.deleteTeacher = function (e) {
        e.preventDefault();
        var target = e.target;
        var teacherId = parseInt(target.getAttribute('data-id') || '0', 10);
        this.teachersData = this.teachersData.filter(function (teacher) { return teacher.id !== teacherId; });
        // Remove the corresponding row from the table
        var row = target.closest('tr');
        if (row) {
            row.remove();
        }
        this.updateStats();
    };
    AdminDashboard.prototype.resetFormFields = function () {
        this.teacherNameInput.value = '';
        this.teacherIdInput.value = '';
        this.teacherEmailInput.value = '';
        this.teacherCourseInput.value = '';
    };
    AdminDashboard.prototype.switchTab = function (tab) {
        var _a, _b, _c, _d;
        if (tab === 'teachers') {
            this.teachersTab.classList.add('active');
            this.studentsTab.classList.remove('active');
            (_a = document.getElementById('teachers')) === null || _a === void 0 ? void 0 : _a.classList.add('show', 'active');
            (_b = document.getElementById('students')) === null || _b === void 0 ? void 0 : _b.classList.remove('show', 'active');
        }
        else {
            this.teachersTab.classList.remove('active');
            this.studentsTab.classList.add('active');
            (_c = document.getElementById('teachers')) === null || _c === void 0 ? void 0 : _c.classList.remove('show', 'active');
            (_d = document.getElementById('students')) === null || _d === void 0 ? void 0 : _d.classList.add('show', 'active');
        }
    };
    AdminDashboard.prototype.updateStats = function () {
        this.totalTeachersElement.textContent = this.teachersData.length.toString();
        this.totalStudentsElement.textContent = this.studentsCount.toString();
    };
    return AdminDashboard;
}());
document.addEventListener('DOMContentLoaded', function () {
    new AdminDashboard();
});
