import emotionStyled from '@emotion/styled';
import { motion } from 'framer-motion';

export const ModalContent = emotionStyled(motion.div)`
  width: 90%;
  max-width: 800px;
  background: var(--card-bg);
  border-radius: 16px;
  padding: 2rem;
  position: relative;
  max-height: 90vh;
  overflow-y: auto;
  border: 1px solid var(--border);
  box-shadow: 0 8px 32px var(--shadow);
`;
