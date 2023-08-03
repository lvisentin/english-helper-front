import { Feedback } from '@/shared/models/feedbacks/feedback.model';

export interface GetWritingsResponse {
  feedbacks: Feedback[];
}

export interface NewWritingResponse {
  message: string;
}

export interface GetWritingByIdResponse {
  feedback: Feedback;
}
