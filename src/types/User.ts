export type UserLoginRequest = {
  username?: string;
  password?: string;
};

export type Role = {
  authority: string;
  roleId: number;
};

export type LoggedInUser = {
  exp: number;
  iat: string;
  role: Role[];
  sub: string;
};
