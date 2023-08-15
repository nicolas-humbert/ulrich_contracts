export type UserLoginRequest = {
  email?: string;
  password?: string;
};

export type LoginResponseUser = {
  email: string;
  password: string;
  isAdmin: boolean;
  token: string;
};

export type User = {
  email: string;
  isAdmin: boolean;
  token: string;
};
