import axios from '@/shared/configs/axios/instances/default';
import { AxiosResponse } from 'axios';
import { userService } from '../user/UserService';
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
          `Bearer ${userService.getAuthToken()}`,
      },
    });
  }
}

export const assistantService = new AssistantService();
