class UserService {
  private _authToken: string | null = null;

  getAuthToken() {
    if (this._authToken) {
      return this._authToken;
    }

    if (typeof window !== 'undefined') {
      this._authToken = localStorage.getItem('authToken');
    }

    return this._authToken;
  }
}

export const userService = new UserService();
