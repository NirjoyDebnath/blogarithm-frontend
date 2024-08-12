export interface IUser {
  Id: string;
  UserName: string;
  Name: string;
  Email: string;
}

export interface IUpdateUserInput {
  Name: string;
  Email: string;
}
export interface IUpdatePasswordInput {
  CurrentPassword: string;
  NewPassword: string;
  NewPasswordAgain: string;
}


export interface IUpdatePasswordInfo {
  CurrentPassword: string;
  NewPassword: string;
}
