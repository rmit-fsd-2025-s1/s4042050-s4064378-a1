import { Role, User } from "../types/User";
import { Tutor } from "../types/Tutor";

export const mockUsers: User[] = [
  {
    email: "test@example.com",
    firstName: "Tom",
    lastName: "Abc",
    password: "password123",
    role: "lecturer",
  },
];

export const mockTutors: Tutor[] = [
  {
    id: "tutor-1",
    name: "John Doe",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    password: "abc",
    role: "lecturer",
    course: "COSC2758",
    skills: ["JavaScript", "React", "CSS"],
    availability: "full-time",
    credentials: [
      { degree: "BSc in Computer Science", institution: "ABC University", year: 2001 }
    ],
    selected: false,
  },
  {
    id: "tutor-2",
    name: "Jane Smith",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    password: "abc",
    role: "lecturer",
    course: "COSC2938",
    skills: ["TypeScript", "Node.js", "Express"],
    availability: "part-time",
    credentials: [
      { degree: "MSc in Software Engineering", institution: "XYZ Institute", year: 2001 }
    ],
    selected: false,
  },
  {
    id: "tutor-3",
    name: "Arun Kumar",
    firstName: "Arun",
    lastName: "Kumar",
    email: "arun.k@example.com",
    password: "abcd",
    role: "tutor",
    course: "COSC2758",
    skills: ["Python", "Django"],
    availability: "full-time",
    credentials: [
      { degree: "BSc in Data Science", institution: "DataTech Uni", year: 2001 }
    ],
    selected: false,
  }
];
