import axios from 'axios';

class WritingService {
  private API_URL = process.env.API_URL;
  private authToken =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQ3ODc5MTg2ODBlY2Y4NmUwYTUwZjUxIiwiZW1haWwiOiJsdmlzZS5iYXRpc3RhQGdtYWlsLmNvbSIsImlhdCI6MTY4NzM5MDc2NiwiZXhwIjoxNjg3OTk1NTY2fQ.pNnhsKcIfvqHkNQW5-AaGS4wc7m3A8jWlrkCsnP4RZY';

  getWritings() {
    return axios.get(`${this.API_URL}/feedbacks`, {
      params: {
        type: 'text',
      },
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.authToken}`,
      },
    });
  }
}

export const writingService = new WritingService();
