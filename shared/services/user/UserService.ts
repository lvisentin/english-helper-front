import axios from 'axios';
import { LoginResponse } from './UserService.model';

class UserService {
  private _authToken: string | null = null;
  private API_URL = process.env.API_URL;

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

  setUserToken(token: string) {
    localStorage.setItem('authToken', token);
  }
}

export const userService = new UserService();
