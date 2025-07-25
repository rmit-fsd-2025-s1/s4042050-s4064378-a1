import { User } from "../types/User";
import { Tutor } from "../types/Tutor";

//This is the hardcoded mock data
// Some of the mock data were genrated using chaGPT
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
  {
    firstName: "abc",
    lastName: "def",
    email: "abc@gmail.com",
    password: "123",
    role: "tutor",
  },
  {
    firstName: "Emily",
    lastName: "Brown",
    email: "emily.b@example.com",
    password: "pass123",
    role: "tutor",
  },
  {
    firstName: "Michael",
    lastName: "Lee",
    email: "michael.lee@example.com",
    password: "lee456",
    role: "tutor",
  },
  {
    firstName: "Sara",
    lastName: "Ahmed",
    email: "sara.ahmed@example.com",
    password: "sara789",
    role: "tutor",
  },
];

export const mockTutors: Tutor[] = [
  {
    ...mockUsers[1],
    id: "tutor-1",
    skills: ["JavaScript", "React", "CSS"],
    availability: "full-time",
    credentials: [
      {
        degree: "BSc in Computer Science",
        institution: "ABC University",
        year: 2001,
      },
    ],
    appliedRoles: [
      {
        courseId: "1",
        role: "tutor",
        status: "accepted",
        rank: 0,
      },
    ],
  },
  {
    id: "tutor-2",
    ...mockUsers[2],
    skills: ["TypeScript", "Node.js", "Express"],
    availability: "part-time",
    credentials: [
      {
        degree: "MSc in Software Engineering",
        institution: "XYZ Institute",
        year: 2001,
      },
    ],
    appliedRoles: [
      {
        courseId: "2",
        role: "tutor",
        status: "accepted",
        rank: 0,
      },
      {
        courseId: "1",
        role: "tutor",
        status: "accepted",
        rank: 0,
      },
    ],
  },
  {
    id: "tutor-3",
    ...mockUsers[3],
    skills: ["Python", "Django"],
    availability: "full-time",
    credentials: [
      {
        degree: "BSc in Data Science",
        institution: "DataTech Uni",
        year: 2001,
      },
    ],
    appliedRoles: [
      {
        courseId: "3",
        role: "tutor",
        status: "pending",
        rank: 0,
      },
      {
        courseId: "4",
        role: "tutor",
        status: "pending",
        rank: 0,
      },
    ],
  },
  {
    id: "tutor-4",
    ...mockUsers[5],
    skills: ["HTML", "CSS", "JavaScript"],
    availability: "part-time",
    credentials: [
      {
        degree: "BSc in Web Development",
        institution: "Tech University",
        year: 2020,
      },
    ],
    appliedRoles: [
      {
        courseId: "1",
        role: "tutor",
        status: "pending",
        rank: 0,
      },
    ],
  },
  {
    id: "tutor-5",
    ...mockUsers[6],
    skills: ["Java", "Spring", "SQL"],
    availability: "full-time",
    credentials: [
      {
        degree: "BEng in Software Engineering",
        institution: "Engineering College",
        year: 2018,
      },
    ],
    appliedRoles: [
      {
        courseId: "2",
        role: "tutor",
        status: "pending",
        rank: 0,
      },
    ],
  },
  {
    id: "tutor-6",
    ...mockUsers[7],
    skills: ["Python", "Pandas", "TensorFlow"],
    availability: "part-time",
    credentials: [
      {
        degree: "MSc in AI",
        institution: "AI Research Institute",
        year: 2022,
      },
    ],
    appliedRoles: [
      {
        courseId: "3",
        role: "tutor",
        status: "pending",
        rank: 0,
      },
    ],
  },
];

export const mockCourses = [
  {
    id: "1",
    code: "COSC1234",
    name: "Web development",
    semester: "Spring 2024",
  },
  {
    id: "2",
    code: "COSC2345",
    name: "Full stack development",
    semester: "Spring 2024",
  },
  {
    id: "3",
    code: "COSC3456",
    name: "Artificial intelligence",
    semester: "Spring 2024",
  },
  {
    id: "4",
    code: "COSC4567",
    name: "Machine learning",
    semester: "Spring 2024",
  },
];
