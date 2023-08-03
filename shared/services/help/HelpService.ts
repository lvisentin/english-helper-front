import axios from 'axios';
import { userService } from '../user/UserService';

class HelpService {
  private VERCEL_WEBHOOK_URL = process.env.VERCEL_WEBHOOK_URL;
  private messageTitle = '';
  private messageDescription = '';
  private messageColor = 16776960;

  sendMessage(userName: string, content: string, email: string, id: string) {
    const request = {
      username: userName,
      content: content,
      embeds: [
        {
          title: this.messageTitle,
          description: this.messageDescription,
          color: this.messageColor,
          fields: [
            {
              name: 'email',
              value: email,
            },
            {
              name: 'id',
              value: id,
            },
          ],
        },
      ],
    };

    return axios.post(`${this.VERCEL_WEBHOOK_URL}`, request, {
      headers: {
        Authorization: `Bearer ${userService.getAuthToken()}`,
      },
    });
  }
}

export const helpService = new HelpService();
