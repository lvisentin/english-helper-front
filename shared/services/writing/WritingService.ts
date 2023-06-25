import axios from 'axios';
import { userService } from '../user/UserService';
import {
  GetWritingsResponse,
  NewWritingResponse,
} from './WritingService.model';
class WritingService {
  private API_URL = process.env.API_URL;
  private authToken = userService.getAuthToken();

  getWritings(): Promise<GetWritingsResponse> {
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

  newWriting(
    context: string,
    input: string,
    title: string,
    file_url?: string
  ): Promise<NewWritingResponse> {
    return axios.post(`${this.API_URL}/feedbacks`, {
      params: {
        title,
        input,
        context,
        file_url,
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authToken}`,
      },
    });
  }
}

export const writingService = new WritingService();
