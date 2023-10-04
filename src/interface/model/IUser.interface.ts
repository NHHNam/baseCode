export interface IUser {
  _id: string;
  user_userName: string;
  user_fullName: string;
  user_email: string;
  user_password: string;
  user_role: string;
  user_phoneNumber: string;
  user_isBlocking: boolean;
}

export interface IUserAuth extends IUser {
  user_confirmPassword?: string;
}
