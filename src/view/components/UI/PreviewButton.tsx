import emotionStyled from '@emotion/styled';

export const PreviewButton = emotionStyled.button`
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background: var(--accent);
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.875rem;
  transition: all 0.2s ease;

  &:hover {
    background: var(--accent-hover);
    transform: translateY(-2px);
  }
`;
