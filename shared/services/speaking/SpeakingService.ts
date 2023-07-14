import axios, { AxiosResponse } from 'axios';
import { userService } from '../user/UserService';
import {
  GetSpeakingsResponse,
  NewSpeakingResponse,
} from './SpeakingService.model';
class SpeakingService {
  private API_URL = process.env.API_URL;
  private authToken = userService.getAuthToken();

  getSpeakings(): Promise<AxiosResponse<GetSpeakingsResponse>> {
    return axios.get<GetSpeakingsResponse>(`${this.API_URL}/feedbacks`, {
      params: {
        type: 'text',
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authToken}`,
      },
    });
  }

  newSpeaking(
    context: string,
    input: string,
    title: string,
    file_url?: string
  ): Promise<NewSpeakingResponse> {
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

export const speakingService = new SpeakingService();
