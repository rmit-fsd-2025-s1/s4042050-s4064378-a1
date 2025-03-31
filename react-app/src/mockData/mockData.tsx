import { Role, User } from "../types/User";
import { Tutor } from "../types/Tutor";

export const mockUsers: User[] = [
  {
    email: "test@example.com",
    firstName: "tom",
    lastName: "abc",
    password: "password123",
    role: "lecturer" as unknown as Role,
  },
];

export const mockTutors: Tutor[] = [
  //Update the tutor content in the array only
  {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    // course: "COSC2758",
    skills: ["JavaScript", "React", "CSS"],
    availability: "full-time",
    credentials: [
      { degree: "BSc in Computer Science", institution: "abc", year: 2001 },
    ],
    selected: false,
    password: "abc",
    role: "lecturer",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    // course: "COSC2938",
    skills: ["TypeScript", "Node.js", "Express"],
    availability: "part-time",
    credentials: [
      { degree: "MSc in Software Engineering", institution: "abc", year: 2001 },
    ],
    selected: false,
    password: "abc",
    role: "lecturer",
  },
  {
    firstName: "Arun",
    lastName: "Kumar",
    email: "arun.k@example.com",
    // course: "COSC2758",
    skills: ["Python", "Django"],
    availability: "full-time",
    credentials: [
      { degree: "BSc in Data Science", institution: "abc", year: 2001 },
    ],
    selected: false,
    password: "abcd",
    role: "tutor",
  },
];
