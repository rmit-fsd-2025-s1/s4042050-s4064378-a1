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
  {
    email: "john.doe@example.com",
    firstName: "John",
    lastName: "Doe",
    password: "abc",
    role: "tutor",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    password: "abc",
    role: "tutor",
  },
  {
    firstName: "Arun",
    lastName: "Kumar",
    email: "arun.k@example.com",
    password: "abcd",
    role: "tutor",
  },
];

export const mockTutors: Tutor[] = [
  {
    ...mockUsers[1],
    id: "tutor-1",
    // role: "lecturer", // should be tutor and defined in the user object
    course: "COSC2758",
    skills: ["JavaScript", "React", "CSS"],
    availability: "full-time",
    credentials: [
      {
        degree: "BSc in Computer Science",
        institution: "ABC University",
        year: 2001,
      },
    ],
    selected: false,
  },
  {
    id: "tutor-2",
    ...mockUsers[2],
    // firstName: "Jane",
    // lastName: "Smith",
    // email: "jane.smith@example.com",
    // password: "abc",
    role: "lecturer",
    course: "COSC2938",
    skills: ["TypeScript", "Node.js", "Express"],
    availability: "part-time",
    credentials: [
      {
        degree: "MSc in Software Engineering",
        institution: "XYZ Institute",
        year: 2001,
      },
    ],
    selected: false,
  },
  {
    id: "tutor-3",
    ...mockUsers[3],
    // name: "Arun Kumar",
    // firstName: "Arun",
    // lastName: "Kumar",
    // email: "arun.k@example.com",
    // password: "abcd",
    // role: "tutor",
    course: "COSC2758",
    skills: ["Python", "Django"],
    availability: "full-time",
    credentials: [
      {
        degree: "BSc in Data Science",
        institution: "DataTech Uni",
        year: 2001,
      },
    ],
    selected: false,
  },
];
