import { mockCourses, mockTutors, mockUsers } from "../mockData/mockData";
import {
  COURSE_LOCAL_STORAGE_KEY,
  TUTOR_LOCAL_STORAGE_KEY,
  USER_LOCAL_STORAGE_KEY,
} from "./constant";

export const addMockDataToLocalStorage = () => {
  localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(mockUsers));
  localStorage.setItem(TUTOR_LOCAL_STORAGE_KEY, JSON.stringify(mockTutors));
  localStorage.setItem(COURSE_LOCAL_STORAGE_KEY, JSON.stringify(mockCourses));
};
