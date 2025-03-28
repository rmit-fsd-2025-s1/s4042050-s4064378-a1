export interface Role {
  role: "tutor" | "lecturer";
}

export interface User {
  email: string;
  password: string;
  role: Role;
}
