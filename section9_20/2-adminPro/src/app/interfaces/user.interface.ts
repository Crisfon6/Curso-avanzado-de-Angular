import {User as UserModel} from '../models/user.model';

// export interface User {
//   name: string;
//   email: string;
//   role: string;
//   google: boolean;
//   uid: string;
//   img?: string;
// }
export interface UpdateUserForm {
  name?: string;
  email?: string;
  role?:string;
}
export interface UpdatePasswordForm {
  password: string;
  confirmPassword?: string;
}
export interface ListUsers {
  ok: boolean;
  users: UserModel[];
  total: number;
}
