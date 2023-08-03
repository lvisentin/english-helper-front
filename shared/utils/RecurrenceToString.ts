import { SubscriptionRecurrence } from '../services/subscription/SubscriptionService.model';

export const recurrenceToString = (
  recurrence: SubscriptionRecurrence
): string => {
  return recurrence === 'yearly' ? 'Anual' : 'Mensal';
};
