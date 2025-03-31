import { Tutor } from "../types/Tutor";

const LOCAL_STORAGE_KEY = "tutors";

export const loadTutors = (): Tutor[] => {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return [];

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

export const saveApplicantsToLocalStorage = (updatedList: Tutor[]) => {};
