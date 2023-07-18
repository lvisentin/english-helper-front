export interface Feedback {
  input: String;
  output: String;
  portugueseOutput: String;
  context: String;
  title: String;
  status: String;
  audioUrl: String;
  duration: Number;
  wordsCount: Number;
  tokenUsage: any;
  _id?: string;
}
