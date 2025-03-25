export interface User {
  username: string;
  email: string;
  password: string;
  role: "tutor" | "lecturer";
}
