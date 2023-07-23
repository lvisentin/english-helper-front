export interface SubscriptionPlan {
  _id: string;
  name: string;
  maxAudioTotalDuration: number;
  maxAudioDuration: number;
  maxTotalWords: number;
  recurrence: string;
  stripeProductId: string;
  updatedAt: string;
}

export interface UserSubscription {
  subscriptionStatus: string;
  trialStatus: string;
  plan: SubscriptionPlan;
}
