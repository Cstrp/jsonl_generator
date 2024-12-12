import emotionStyled from '@emotion/styled';

export const SectionTitle = emotionStyled.h3`
  font-size: 1.25rem;
  margin-bottom: 1rem;
  color: var(--foreground);
  background: linear-gradient(to right, var(--accent), var(--accent-hover));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;
