import { Tutor } from "../types/Tutor";
import { TUTOR_LOCAL_STORAGE_KEY } from "./constant";

// const LOCAL_STORAGE_KEY = "tutors";

export const loadTutors = (): Tutor[] => {
  try {
    const raw = localStorage.getItem(TUTOR_LOCAL_STORAGE_KEY);

    if (!raw) return [];
    console.log("Load users called");

    const data = JSON.parse(raw);

    if (!Array.isArray(data)) {
      console.warn("Invalid data structure for tutors");
      return [];
    }

    return data as Tutor[];
  } catch (error) {
    console.error("Failed to load tutors from localStorage:", error);
    return [];
  }
};

export const saveTutors = (applicants: Tutor[]): void => {
  try {
    const serialized = JSON.stringify(applicants);
    localStorage.setItem(TUTOR_LOCAL_STORAGE_KEY, serialized);
    console.log("Tutor saved to localStorage.");
  } catch (error) {
    console.error("Error saving Tutor to localStorage:", error);
  }
};
