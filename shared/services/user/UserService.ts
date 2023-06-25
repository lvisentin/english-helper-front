class UserService {
  private _authToken: string | null = null;

  getAuthToken() {
    if (this._authToken) {
      return this._authToken;
    }

    this._authToken = localStorage.getItem('authToken');
  }
}

export const userService = new UserService();
