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
}

export const assistantService = new AssistantService();
