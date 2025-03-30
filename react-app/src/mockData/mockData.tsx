import { Role, User } from "../types/User";
import { Tutor } from "../types/Tutor";

export const mockUsers: User[] = [
  {
    email: "test@example.com",
    password: "password123",
    role: "lecturer" as unknown as Role,
  },
];





export const mockTutors: Tutor[] = [

  //Update the tutor content in the array only
  {
    id: "a1",
    name: "John Doe",
    email: "john.doe@example.com",
    course: "COSC2758",
    skills: ["JavaScript", "React", "CSS"],
    availability: "full-time",
    credentials: "BSc in Computer Science",
    selected: false,
  },
  {
    id: "a2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    course: "COSC2938",
    skills: ["TypeScript", "Node.js", "Express"],
    availability: "part-time",
    credentials: "MSc in Software Engineering",
    selected: false,
  },
  {
    id: "a3",
    name: "Arun Kumar",
    email: "arun.k@example.com",
    course: "COSC2758",
    skills: ["Python", "Django"],
    availability: "full-time",
    credentials: "BSc in Data Science",
    selected: false,
  },
];

