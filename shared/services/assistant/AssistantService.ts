import axios from '@/shared/configs/axios/instances/default';
import { AxiosResponse } from 'axios';
import { AskAssistantResponse } from './AssistantService.model';

class AssistantService {
  private API_URL = process.env.VERCEL_API_URL;

  ask(input: string): Promise<AxiosResponse<AskAssistantResponse>> {
    return axios.post<AskAssistantResponse>(`${this.API_URL}/assistant/ask`, {
      input,
    });
  }

  async askRealTime(input: string) {
    return await fetch(`${this.API_URL}/assistant/ask`, {
      method: 'POST',
      body: JSON.stringify({ input: input }),
      headers: {
        'Content-type': 'application/json',
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjRiZmJhMTU2MWM4ZTBkZjM3YTY0ZDExIiwiZW1haWwiOiJ0ZXN0ZUB0ZXN0ZS5jb20iLCJpYXQiOjE2OTA5Mjc0MTEsImV4cCI6MTY5MTUzMjIxMX0.97ZuHf_3_9fi_McJQWMoYGeXtgrpyDfkvZcr0sUH5wA',
      },
    });
  }
}

export const assistantService = new AssistantService();
