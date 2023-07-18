import axios from '@/shared/configs/axios/instances/default';
import { LoginResponse, SignUpResponse } from './UserService.model';

export interface CurrentUser {
  isLoggedIn: boolean;
}

class UserService {
  private _authToken: string | null = null;
  private API_URL = process.env.API_URL;

  getCurrentUser(): CurrentUser {
    if (!this.getAuthToken()) {
      return {
        isLoggedIn: false,
      };
    }
    return {
      isLoggedIn: true,
    };
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
    return axios.post<LoginResponse>(
      `${this.API_URL}/auth/login`,
      {
        email,
        password,
      },
      {
        headers: {
          'Content-Type': 'application/json',
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
      `${this.API_URL}/auth/register`,
      {
        name,
        email,
        phone_number,
        password,
        referral_code,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }

  signOut() {
    // WIP
    return new Promise(() => localStorage.removeItem('authToken'));
  }

  setUserToken(token: string) {
    localStorage.setItem('authToken', token);
  }
}

export const userService = new UserService();
