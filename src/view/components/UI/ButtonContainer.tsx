import emotionStyled from '@emotion/styled';

export const ButtonContainer = emotionStyled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;

  justify-content: flex-start;

  @media (max-width: 1024px) {
    justify-content: center;
  }
`;
