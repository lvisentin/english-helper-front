import { Feedback } from '@/shared/models/feedbacks/feedback.model';

export interface GetSpeakingsResponse {
  feedbacks: Feedback[];
}

export interface NewSpeakingResponse {
  message: string;
}

export interface GetSpeakingByIdResponse {
  feedback: Feedback;
}
