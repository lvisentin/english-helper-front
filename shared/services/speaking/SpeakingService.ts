import axios from '@/shared/configs/axios/instances/default';
import { AxiosResponse } from 'axios';
import {
  GetSpeakingByIdResponse,
  GetSpeakingsResponse,
  NewSpeakingResponse,
} from './SpeakingService.model';
class SpeakingService {
  private API_URL = process.env.API_URL;

  getSpeakings(): Promise<AxiosResponse<GetSpeakingsResponse>> {
    return axios.get<GetSpeakingsResponse>(`${this.API_URL}/feedbacks`, {
      params: {
        type: 'audio',
      },
    });
  }

  getSpeakingById(
    speakingId: string
  ): Promise<AxiosResponse<GetSpeakingByIdResponse>> {
    return axios.get<GetSpeakingByIdResponse>(
      `${this.API_URL}/feedbacks/${speakingId}`
    );
  }

  newSpeaking(
    context: string,
    title: string,
    audio?: Blob,
    input?: string,
    file_url?: string
  ): Promise<NewSpeakingResponse> {
    return axios.post(`${this.API_URL}/feedbacks`, {
      title,
      input,
      context,
      file_url,
      audio,
    });
  }
}

export const speakingService = new SpeakingService();
