import axios from '@/shared/configs/axios/instances/default';
import {
  SubscribeResponse,
  SubscriptionPlan,
  UserSubscription,
} from './SubscriptionService.model';

class SubscriptionService {
  private API_URL = process.env.VERCEL_API_URL;

  getAllPlans() {
    return axios.get<SubscriptionPlan[]>(`${this.API_URL}/plans`);
  }

  getSubscriptionStatus() {
    return axios.get<UserSubscription>(`${this.API_URL}/user/subscription`);
  }

  subscribe(stripeProductId: string) {
    return axios.post<SubscribeResponse>(`${this.API_URL}/user/subscribe`, {
      productId: stripeProductId,
    });
  }
}

export const subscriptionService = new SubscriptionService();
