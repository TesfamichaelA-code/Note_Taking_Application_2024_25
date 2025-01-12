export interface User {
    _id: string;
    name: string;
    email: string;
    role: 'student' | 'teacher' | 'admin';
    studentId?: string;
    createdAt: string;
    updatedAt: string;
}

export interface Course {
    _id: string;
    title: string;
    description?: string;
    teacher: User;
    students: User[];
    createdAt: string;
    updatedAt: string;
}

export interface Note {
    _id: string;
    title: string;
    content: string;
    course?: Course;
    user: User;
    createdAt: string;
    updatedAt: string;
}

export interface Flashcard {
    _id: string;
    question: string;
    answer: string;
    course?: Course;
    user: User;
    createdAt: string;
    updatedAt: string;
}

export interface Resource {
    _id: string;
    title: string;
    description?: string;
    url: string;
    course?: Course;
    user: User;
    createdAt: string;
    updatedAt: string;
}