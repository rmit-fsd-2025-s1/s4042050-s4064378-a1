import { Tutor } from "../types/Tutor";
import { TUTOR_LOCAL_STORAGE_KEY } from "./constant";

export const getTutorByEmail = (email: string): Tutor | null => {
  const data = localStorage.getItem(TUTOR_LOCAL_STORAGE_KEY);

  if (!data) return null;

  const tutors = JSON.parse(data);
  if (Array.isArray(tutors)) {
    return tutors.find(
      (d) => d.email.toLowerCase() === email.toLocaleLowerCase()
    );
  }
  return null;
};
