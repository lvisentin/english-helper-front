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
