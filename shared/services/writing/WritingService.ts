import axios from 'axios';
import { userService } from '../user/UserService';
class WritingService {
  private API_URL = process.env.API_URL;
  private authToken = userService.getAuthToken();

  getWritings() {
    return axios.get(`${this.API_URL}/feedbacks`, {
      params: {
        type: 'text',
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authToken}`,
      },
    });
  }
}

export const writingService = new WritingService();
