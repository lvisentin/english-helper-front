import axios from '@/shared/configs/axios/instances/default';
import { AxiosResponse } from 'axios';
import { userService } from '../user/UserService';
import {
  GetWritingsResponse,
  NewWritingResponse,
} from './WritingService.model';
class WritingService {
  private API_URL = process.env.API_URL;
  private authToken = userService.getAuthToken();

  getWritings(): Promise<AxiosResponse<GetWritingsResponse>> {
    return axios.get(`${this.API_URL}/feedbacks`, {
      params: {
        type: 'text',
      },
    });
  }

  newWriting(
    context: string,
    input: string,
    title: string
  ): Promise<NewWritingResponse> {
    console.log('input', input);
    return axios.post(`${this.API_URL}/feedbacks`, {
      title,
      input,
      context,
    });
  }
}

export const writingService = new WritingService();
