import { useTheme } from '@/data/context/ThemeContext';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import React from 'react';

const ToggleButton = styled(motion.button)`
  width: 100%;
  position: fixed;
  top: 2rem;
  right: 2rem;
  border: none;
  width: 40px;
  height: 40px;
  background: none;
  color: var(--button-text);
  cursor: pointer;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    transform: scale(1.1);
  }
`;

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <ToggleButton
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <div>Change theme</div>
      {theme === 'light' ? '🌙' : '☀️'}
    </ToggleButton>
  );
};
