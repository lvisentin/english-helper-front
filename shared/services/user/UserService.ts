import axios from '@/shared/configs/axios/instances/default';
import { AxiosResponse } from 'axios';
import {
  GetCurrentUserResponse,
  LoginResponse,
  SignUpResponse,
  UserWithoutSensitiveInfo,
} from './UserService.model';

class UserService {
  private _authToken: string | null = null;
  private VERCEL_API_URL = process.env.VERCEL_API_URL;

  getCurrentUser(): Promise<AxiosResponse<GetCurrentUserResponse>> {
    return axios.get<GetCurrentUserResponse>(
      `${this.VERCEL_API_URL}/auth/user`
    );
  }

  getAuthToken() {
    if (this._authToken) {
      return this._authToken;
    }

    if (typeof window !== 'undefined') {
      this._authToken = localStorage.getItem('authToken');
    }

    return this._authToken;
  }

  signIn(email: string, password: string) {
    console.log(this.VERCEL_API_URL);
    console.log(`${this.VERCEL_API_URL}/auth/login`);
    return axios.post<LoginResponse>(`${this.VERCEL_API_URL}/auth/login`, {
      email,
      password,
    });
  }

  signUp(
    name: string,
    email: string,
    password: string,
    phone_number: string,
    referral_code: string
  ) {
    return axios.post<SignUpResponse>(`${this.VERCEL_API_URL}/auth/register`, {
      name,
      email,
      phone_number,
      password,
      referral_code,
    });
  }

  signOut() {
    // WIP
    // return new Promise(() => localStorage.removeItem('authToken'));
  }

  setUserToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  getUserData() {
    const convertedUser = localStorage.getItem('userData');
    if (!convertedUser) {
      return;
    }
    return JSON.parse(convertedUser);
  }

  getUserStats() {
    return axios.get(`${this.VERCEL_API_URL}/user/status`);
  }

  setUserData(userData: UserWithoutSensitiveInfo) {
    localStorage.setItem('userData', JSON.stringify(userData));
  }
}

export const userService = new UserService();
