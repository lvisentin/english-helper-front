import axios, { AxiosResponse } from 'axios';
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
      `${this.VERCEL_API_URL}/auth/user`,
      {
        headers: {
          Authorization: `Bearer ${userService.getAuthToken()}`,
        },
      }
    );
  }

  getAuthToken() {
    if (typeof window !== 'undefined') return localStorage.getItem('authToken');
    return null;
  }

  signIn(email: string, password: string) {
    return axios.post<LoginResponse>(
      `${this.VERCEL_API_URL}/auth/login`,
      {
        email,
        password,
      },
      {
        headers: {
          Authorization: `Bearer ${userService.getAuthToken()}`,
        },
      }
    );
  }

  signUp(
    name: string,
    email: string,
    password: string,
    phone_number: string,
    referral_code: string
  ) {
    return axios.post<SignUpResponse>(
      `${this.VERCEL_API_URL}/auth/register`,
      {
        name,
        email,
        phone_number,
        password,
        referral_code,
      },
      {
        headers: {
          Authorization: `Bearer ${userService.getAuthToken()}`,
        },
      }
    );
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
    return axios.get(`${this.VERCEL_API_URL}/user/status`, {
      headers: {
        Authorization: `Bearer ${userService.getAuthToken()}`,
      },
    });
  }

  setUserData(userData: UserWithoutSensitiveInfo) {
    localStorage.setItem('userData', JSON.stringify(userData));
  }

  sendResetPasswordEmail(email: string) {
    return axios.post(
      `${this.VERCEL_API_URL}/auth/send-reset-password`,
      {
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${userService.getAuthToken()}`,
        },
      }
    );
  }

  resetPassword(token: string, password: string, confirmPassword: string) {
    return axios.post(
      `${this.VERCEL_API_URL}/auth/reset-password`,
      {
        token,
        password,
        confirmPassword,
      },
      {
        headers: {
          Authorization: `Bearer ${userService.getAuthToken()}`,
        },
      }
    );
  }
}

export const userService = new UserService();
