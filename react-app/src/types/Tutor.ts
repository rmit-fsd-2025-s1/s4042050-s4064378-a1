import { User } from "./User";

export interface Tutor extends User {
  id:string
  name:string,
  course:string,
  availability: "full-time" | "part-time";
  skills: string[];
  credentials: {
    degree: string;
    institution: string;
    year: number;
  }[];
  comment?: string;
  selected?: boolean;
  rank?: number;
  appliedRoles?: TutorRole[];
}

export interface Course {
  id: string;
  code: string; // Format: COSCxxxx
  name: string;
  semester: string;
}

export interface TutorRole {
  id: string;
  courseId: string;
  courseCode: string;
  courseName: string;
  semester: string;
  role: "tutor" | "lab-assistant";
  status: "accepted" | "rejected" | "pending";
}
