export interface SubscriptionPlan {
  _id: string;
  name: string;
  maxAudioTotalDuration: number;
  maxAudioDuration: number;
  maxTotalWords: number;
  recurrence: SubscriptionRecurrence;
  stripeProductId: string;
  updatedAt: string;
  oldPrice: number;
  price: number;
}

export type SubscriptionRecurrence = 'yearly' | 'monthly';

export interface UserSubscription {
  subscriptionStatus: string;
  trialStatus: string;
  plan: SubscriptionPlan;
  leftDays: number;
  trialEndsAt: string;
}

export interface SubscribeResponse {
  url: string;
}

export enum SubscriptionStatus {
  inactive = 'inactive',
  active = 'active',
}

export enum PlanRecurrence {
  monthly = 'monthly',
  yearly = 'yearly',
}
