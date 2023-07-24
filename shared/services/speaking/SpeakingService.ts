import axios from '@/shared/configs/axios/instances/default';
import { AxiosResponse } from 'axios';
import {
  GetSpeakingByIdResponse,
  GetSpeakingsResponse,
  NewSpeakingResponse,
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

  newSpeaking(formData: FormData): Promise<NewSpeakingResponse> {
    return axios.post(
      `${this.VERCEL_API_URL}/feedbacks`,
      {
        formData,
      },
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
  }
}

export const speakingService = new SpeakingService();
