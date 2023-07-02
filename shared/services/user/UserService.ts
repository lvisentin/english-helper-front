import axios from 'axios';
import { LoginResponse } from './UserService.model';

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

    this._authToken = localStorage.getItem('authToken');
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

  setUserToken(token: string) {
    localStorage.setItem('authToken', token);
  }
}

export const userService = new UserService();
