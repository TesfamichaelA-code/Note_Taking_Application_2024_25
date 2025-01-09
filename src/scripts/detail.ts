interface Course {
    title: string;
    chapters: string[];
    notes: { title: string; description: string }[];
  }
  
  // Data for courses
  const courses: Course[] = [
    {
      title: "Website Development",
      chapters: ["Chapter 1", "Chapter 2", "Chapter 3", "Chapter 4"],
      notes: [
        { title: "How to Work on HTML", description: "Write your HTML code in a .html file and open it in a browser." },
        { title: "How to Work on CSS", description: "Link your .css file to your HTML and style your webpage." },
      ],
    },
    {
      title: "JavaScript Basics",
      chapters: ["Introduction", "Variables", "Functions", "DOM Manipulation"],
      notes: [
        { title: "Working with Variables", description: "Learn how to declare and use variables in JavaScript." },
        { title: "DOM Manipulation", description: "Learn how to modify HTML elements dynamically." },
      ],
    },
  ];
  
  // References to HTML elements
  const courseTitleElement = document.getElementById("course-title") as HTMLElement;
  const chaptersElement = document.getElementById("chapters") as HTMLElement;
  const notesElement = document.getElementById("notes") as HTMLElement;
  const addNoteButton = document.querySelector(".add-note-btn") as HTMLElement;
  
  // Track the currently selected course
  let currentCourseIndex = 0;
  
  // Function to render chapters
  function renderChapters(chapters: string[]) {
    chaptersElement.innerHTML = ""; // Clear previous chapters
    chapters.forEach((chapter) => {
      const chapterButton = document.createElement("button");
      chapterButton.className = "chapter-btn";
      chapterButton.textContent = chapter;
      chaptersElement.appendChild(chapterButton);
    });
  }
  
  // Function to render notes
  function renderNotes(notes: { title: string; description: string }[]) {
    notesElement.innerHTML = ""; // Clear previous notes
    notes.forEach((note) => {
      const noteCard = `
        <div class="col-md-6">
          <div class="card note-card p-3">
            <h5 class="card-title">${note.title}</h5>
            <p class="card-text">${note.description}</p>
            <a href="#" class="text-decoration-none">✏️</a>
          </div>
        </div>
      `;
      notesElement.innerHTML += noteCard;
    });
  }
  
  // Function to render the selected course
  function renderCourse(courseIndex: number) {
    currentCourseIndex = courseIndex;
    const course = courses[courseIndex];
    courseTitleElement.textContent = course.title;
    renderChapters(course.chapters);
    renderNotes(course.notes);
  }
  
  // Event Listener for the "+" button to add a new note
  addNoteButton.addEventListener("click", () => {
    const newNoteTitle = prompt("Enter the note title:");
    const newNoteDescription = prompt("Enter the note description:");
  
    if (newNoteTitle && newNoteDescription) {
      // Add the new note to the current course
      courses[currentCourseIndex].notes.push({
        title: newNoteTitle,
        description: newNoteDescription,
      });
  
      // Re-render the notes
      renderNotes(courses[currentCourseIndex].notes);
    }
  });
  
  // Simulate clicking a course from a Courses Page
  function simulateCourseChange() {
    const coursesPage = document.createElement("div");
    coursesPage.style.position = "fixed";
    coursesPage.style.bottom = "10px";
    coursesPage.style.left = "10px";
  
    courses.forEach((course, index) => {
      const courseButton = document.createElement("button");
      courseButton.textContent = course.title;
      courseButton.className = "btn btn-primary m-1";
  
      courseButton.addEventListener("click", () => {
        renderCourse(index);
      });
  
      coursesPage.appendChild(courseButton);
    });
  
    document.body.appendChild(coursesPage);
  }
  
  // Initial Render
  renderCourse(currentCourseIndex);
  simulateCourseChange();
  