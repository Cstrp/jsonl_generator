import emotionStyled from '@emotion/styled';

export const Button = emotionStyled.button<{
  variant?: 'primary' | 'secondary' | 'danger';
}>`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${({ variant }) => {
    switch (variant) {
      case 'primary':
        return 'var(--accent)';
      case 'secondary':
        return 'var(--primary)';
      case 'danger':
        return 'var(--error)';
      default:
        return 'var(--accent)';
    }
  }};
  color: ${({ variant }) =>
    variant === 'secondary' ? 'var(--foreground)' : 'white'};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 6px var(--shadow);
    background: ${({ variant }) => {
      switch (variant) {
        case 'primary':
          return 'var(--accent-hover)';
        case 'secondary':
          return 'var(--secondary)';
        case 'danger':
          return 'var(--error)';
        default:
          return 'var(--accent-hover)';
      }
    }};
  }
`;
