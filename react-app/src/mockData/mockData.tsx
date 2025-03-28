import { Role, User } from "../types/User";

export const mockUsers: User[] = [
  {
    email: "test@example.com",
    password: "password123",
    role: "lecturer" as unknown as Role,
  },
];
