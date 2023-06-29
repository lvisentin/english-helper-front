import { Feedback } from '@/shared/models/feedbacks/feedback.model';

export interface GetSpeakingsResponse {
  data: {
    feedbacks: Feedback[];
  };
}

export interface NewSpeakingResponse {
  message: string;
}
