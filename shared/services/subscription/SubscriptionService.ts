import axios from 'axios';
import { userService } from '../user/UserService';
import {
  SubscribeResponse,
  SubscriptionPlan,
  UserSubscription,
} from './SubscriptionService.model';

class SubscriptionService {
  private API_URL = process.env.VERCEL_API_URL;

  getAllPlans() {
    return axios.get<SubscriptionPlan[]>(`${this.API_URL}/plans`, {
      headers: {
        Authorization: `Bearer ${userService.getAuthToken()}`,
      },
    });
  }

  getSubscriptionStatus() {
    return axios.get<UserSubscription>(`${this.API_URL}/user/subscription`, {
      headers: {
        Authorization: `Bearer ${userService.getAuthToken()}`,
      },
    });
  }

  subscribe(stripeProductId: string) {
    return axios.post<SubscribeResponse>(
      `${this.API_URL}/user/subscribe`,
      {
        productId: stripeProductId,
      },
      {
        headers: {
          Authorization: `Bearer ${userService.getAuthToken()}`,
        },
      }
    );
  }

  changeSubscription(stripeProductId: string) {
    return axios.post<SubscribeResponse>(
      `${this.API_URL}/user/subscription/change`,
      {
        productId: stripeProductId,
      },
      {
        headers: {
          Authorization: `Bearer ${userService.getAuthToken()}`,
        },
      }
    );
  }
}

export const subscriptionService = new SubscriptionService();
