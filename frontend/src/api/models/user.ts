import Email from "email-templates";

export interface User {
  id: number;
  username: string;
  email: Email; 
  password: string;
}

export type UserLogin = Omit<User, "id" | "username">
