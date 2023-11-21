export interface User {
  name: string;
  email: string;
  role: string;
  google: boolean;
  uid: string;
  img?: string;
}
export interface UpdateUserForm {
  name: string;
  email: string;
}
export interface UpdatePasswordForm{
  password: string;
  confirmPassword?:string;
}
