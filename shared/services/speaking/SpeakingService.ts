import axios from 'axios';
import {
  GetSpeakingsResponse,
  NewSpeakingResponse,
} from './SpeakingService.model';
class SpeakingService {
  private API_URL = process.env.API_URL;
  // private authToken = userService.getAuthToken();
  private authToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQ3ODc5MTg2ODBlY2Y4NmUwYTUwZjUxIiwiZW1haWwiOiJsdmlzZS5iYXRpc3RhQGdtYWlsLmNvbSIsImlhdCI6MTY4NzM5MDc2NiwiZXhwIjoxNjg3OTk1NTY2fQ.pNnhsKcIfvqHkNQW5-AaGS4wc7m3A8jWlrkCsnP4RZY';

  getSpeakings(): Promise<GetSpeakingsResponse> {
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
