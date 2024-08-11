import { Subscription } from './types';

class SubscriptionManager {
  private subscriptions: Subscription[] = [];

  addSubscription(subscription: Subscription) {
    this.subscriptions.push(subscription);
  }

  removeSubscription(chatId: number) {
    this.subscriptions = this.subscriptions.filter(sub => sub.chatId !== chatId);
  }

  getSubscriptions(): Subscription[] {
    return this.subscriptions;
  }
}

export const subscriptionManager = new SubscriptionManager();