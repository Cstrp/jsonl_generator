import { FileStore } from './FileStore';
import { NotificationStore } from './NotificationStore';

export class RootStore {
  fileStore: FileStore;
  notificationStore: NotificationStore;

  constructor() {
    this.fileStore = new FileStore();
    this.notificationStore = new NotificationStore();
  }
}
