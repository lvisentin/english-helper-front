import axios, { AxiosResponse } from 'axios';
import { userService } from '../user/UserService';
import {
  GetWritingByIdResponse,
  GetWritingsResponse,
  NewWritingResponse,
} from './WritingService.model';
class WritingService {
  private VERCEL_API_URL = process.env.VERCEL_API_URL;
  private authToken = userService.getAuthToken();

  getWritings(): Promise<AxiosResponse<GetWritingsResponse>> {
    return axios.get(`${this.VERCEL_API_URL}/feedbacks`, {
      params: {
        type: 'text',
      },
      headers: {
        Authorization: `Bearer ${userService.getAuthToken()}`,
      },
    });
  }

  getWritingById(
    speakingId: string
  ): Promise<AxiosResponse<GetWritingByIdResponse>> {
    return axios.get<GetWritingByIdResponse>(
      `${this.VERCEL_API_URL}/feedbacks/${speakingId}`,
      {
        headers: {
          Authorization: `Bearer ${userService.getAuthToken()}`,
        },
      }
    );
  }

  async translateWriting(speakingId: string) {
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

  async newWritingRealTime(context: string, input: string, title: string) {
    return await fetch(`${this.VERCEL_API_URL}/feedbacks`, {
      method: 'POST',
      body: JSON.stringify({ context, title, input }),
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${userService.getAuthToken()}`,
      },
    });
  }

  newWriting(
    context: string,
    input: string,
    title: string
  ): Promise<NewWritingResponse> {
    return axios.post(
      `${this.VERCEL_API_URL}/feedbacks`,
      {
        title,
        input,
        context,
      },
      {
        headers: {
          Authorization: `Bearer ${userService.getAuthToken()}`,
        },
      }
    );
  }
}

export const writingService = new WritingService();
