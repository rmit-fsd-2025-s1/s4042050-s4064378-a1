import { User } from "../types/User";

export const addUser = (user: User) => {
  try {
    localStorage.setItem(user.email.toLowerCase(), JSON.stringify(user));
  } catch (error) {
    console.log(error);
  }
};
