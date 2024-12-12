import styled from '@emotion/styled';
import { AnimatePresence } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../data/stores/StoreContext';
import { NotificationItem } from '../UI/NotificationItem';
import { NotificationsContainer } from '../UI/NotificationsContainer';

const Icon = styled.span`
  font-size: 1.25rem;
`;

const getIcon = (type: 'success' | 'error' | 'info') => {
  switch (type) {
    case 'success':
      return '✅';
    case 'error':
      return '❌';
    case 'info':
      return 'ℹ️';
  }
};

export const Notifications = observer(() => {
  const { notificationStore } = useStore();

  return (
    <NotificationsContainer>
      <AnimatePresence>
        {notificationStore.notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            type={notification.type}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 100 }}
            onClick={() =>
              notificationStore.removeNotification(notification.id)
            }
          >
            <Icon>{getIcon(notification.type)}</Icon>
            {notification.message}
          </NotificationItem>
        ))}
      </AnimatePresence>
    </NotificationsContainer>
  );
});
