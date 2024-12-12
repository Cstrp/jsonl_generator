import { makeAutoObservable } from 'mobx';

export type NotificationType = 'success' | 'error' | 'info';

interface Notification {
  id: string;
  message: string;
  type: NotificationType;
}

export class NotificationStore {
  notifications: Notification[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addNotification = (message: string, type: NotificationType) => {
    const id = crypto.randomUUID();
    this.notifications.push({ id, message, type });

    setTimeout(() => {
      this.removeNotification(id);
    }, 5000);

    return id;
  };

  removeNotification = (id: string) => {
    this.notifications = this.notifications.filter((n) => n.id !== id);
  };

  clearAll = () => {
    this.notifications = [];
  };
}
