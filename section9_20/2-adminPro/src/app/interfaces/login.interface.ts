import { User } from "../models";

export interface LoginForm {
  email: string;
  password: string;
}
// Generated by https://quicktype.io

export interface LoginResponse {
  ok:    boolean;
  token: string;
  user:  User;
}


