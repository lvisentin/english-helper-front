import axios from '@/shared/configs/axios/instances/default';
import { AxiosResponse } from 'axios';
import { userService } from '../user/UserService';
import {
  GetSpeakingByIdResponse,
  GetSpeakingsResponse,
} from './SpeakingService.model';
class SpeakingService {
  private VERCEL_API_URL = process.env.VERCEL_API_URL;

  getSpeakings(): Promise<AxiosResponse<GetSpeakingsResponse>> {
    return axios.get<GetSpeakingsResponse>(`${this.VERCEL_API_URL}/feedbacks`, {
      params: {
        type: 'audio',
      },
    });
  }

  getSpeakingById(
    speakingId: string
  ): Promise<AxiosResponse<GetSpeakingByIdResponse>> {
    return axios.get<GetSpeakingByIdResponse>(
      `${this.VERCEL_API_URL}/feedbacks/${speakingId}`
    );
  }

  newSpeaking(formData: FormData): Promise<any> {
    return fetch(`${this.VERCEL_API_URL}/feedbacks`, {
      body: formData,
      method: 'post',
      headers: {
        Authorization: `Bearer ${userService.getAuthToken()}`,
      },
    });
  }
}

export const speakingService = new SpeakingService();
