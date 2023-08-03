import axios, { AxiosResponse } from 'axios';
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
      headers: { Authorization: `Bearer ${userService.getAuthToken()}` },
    });
  }

  getSpeakingById(
    speakingId: string
  ): Promise<AxiosResponse<GetSpeakingByIdResponse>> {
    return axios.get<GetSpeakingByIdResponse>(
      `${this.VERCEL_API_URL}/feedbacks/${speakingId}`,
      {
        headers: {
          Authorization: `Bearer ${userService.getAuthToken()}`,
        },
      }
    );
  }

  async translateSpeaking(speakingId: string) {
    return await fetch(
      `${this.VERCEL_API_URL}/feedbacks/${speakingId}/translate`,
      {
        method: 'GET',
        headers: {
          'Content-type': 'application/json',
          Authorization: `Bearer ${userService.getAuthToken()}`,
        },
      }
    );
  }

  async newSpeakingRealTime(context: string, input: string, title: string) {
    return await fetch(`${this.VERCEL_API_URL}/feedbacks`, {
      method: 'POST',
      body: JSON.stringify({ context, title, input }),
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userService.getAuthToken()}`,
      },
    });
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
