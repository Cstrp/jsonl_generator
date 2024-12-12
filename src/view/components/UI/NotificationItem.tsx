import emotionStyled from '@emotion/styled';
import { motion } from 'framer-motion';

export const NotificationItem = emotionStyled(motion.div)<{
  type: 'success' | 'error' | 'info';
}>`
  padding: 1rem;
  border-radius: 8px;
  background: ${({ type }) => {
    switch (type) {
      case 'success':
        return 'var(--success-bg, #10b981)';
      case 'error':
        return 'var(--error-bg, #ef4444)';
      case 'info':
        return 'var(--info-bg, #3b82f6)';
    }
  }};
  color: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.875rem;
  cursor: pointer;

  &:hover {
    filter: brightness(1.1);
  }
`;
