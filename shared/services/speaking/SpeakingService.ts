import axios from '@/shared/configs/axios/instances/default';
import { AxiosResponse } from 'axios';
import {
  GetSpeakingsResponse,
  NewSpeakingResponse,
} from './SpeakingService.model';
class SpeakingService {
  private API_URL = process.env.API_URL;

  getSpeakings(): Promise<AxiosResponse<GetSpeakingsResponse>> {
    return axios.get<GetSpeakingsResponse>(`${this.API_URL}/feedbacks`, {
      params: {
        type: 'text',
      },
    });
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
