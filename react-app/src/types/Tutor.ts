import { User } from "./User";

export interface Tutor extends User {
  id: string;
  // name:string, // use first name and last name from User parent object
  course: string;
  availability: "full-time" | "part-time";
  skills: string[];
  credentials: {
    degree: string;
    institution: string;
    year: number;
  }[];
  comment?: string;
  selected?: boolean; // should be removed goes into appliedroles-> status
  rank?: number; // should goes into applied roles
  appliedRoles?: TutorRole[];
}

export interface Course {
  id: string;
  code: string; // Format: COSCxxxx
  name: string;
  semester: string;
}

export interface TutorRole {
  // id: string; I feel we don't need this
  courseId: string;
  role: "tutor" | "lab-assistant";
  status: "accepted" | "rejected" | "pending";
  rank?: number;
}
