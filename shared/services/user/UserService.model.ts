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
