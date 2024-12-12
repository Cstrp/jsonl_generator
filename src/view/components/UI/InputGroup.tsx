import emotionStyled from '@emotion/styled';

export const InputGroup = emotionStyled.div`
  background: var(--primary);
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 1rem;
  border: 1px solid var(--border);
  transition: all 0.2s ease;

  &:hover {
    box-shadow: 0 4px 6px var(--shadow);
    transform: translateY(-2px);
  }
`;
