export interface ILogInInput {
  UserName: string;
  Password: string;
}
export interface ILogInInfo extends ILogInInput {}

export interface ISignUpInput {
  Name: string;
  Email: string;
  UserName: string;
  Password: string;
  ConfirmPassword: string;
}
export interface ISignUpInfo extends ISignUpInput {}
