export interface LoginResponse {
  token: string;
  userWithoutSensitiveInfo: UserWithoutSensitiveInfo;
}

export interface UserWithoutSensitiveInfo {
  _id: string;
  email: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  plan: string;
}

export interface SignUpResponse {
  message: string;
  token: string;
}

export interface CreatedUser {
  user: UserWithoutSensitiveInfo;
}

export interface User {
  _id: string;
  email: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  plan: string;
  referralCode: string;
}

export interface GetCurrentUserResponse {
  user: User;
}
