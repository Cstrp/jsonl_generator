import emotionStyled from '@emotion/styled';

export const NotificationsContainer = emotionStyled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1100;
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
`;
