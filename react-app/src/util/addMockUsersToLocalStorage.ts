import { mockUsers } from "../mockData/mockData";
import { USER_LOCAL_STORAGE_KEY } from "./constant";

export const addMockUsersToLocalStorage = () => {
  localStorage.setItem(USER_LOCAL_STORAGE_KEY, JSON.stringify(mockUsers));
};
