import Email from "email-templates";

interface User {
  id: number;
  username: string;
  email: Email; 
  password: string;
}

export type UserPublic = Omit<User, "password">
