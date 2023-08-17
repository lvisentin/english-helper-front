export interface Feedback {
  input: String;
  output: String;
  portugueseOutput: String;
  context: String;
  title: String;
  status: FeedbackStatus;
  audioUrl: String;
  duration: Number;
  wordsCount: Number;
  tokenUsage: any;
  _id?: string;
}

export enum FeedbackStatus {
  PENDING = 'pending',
  FAILED = 'failed',
  COMPLETED = 'completed',
}
