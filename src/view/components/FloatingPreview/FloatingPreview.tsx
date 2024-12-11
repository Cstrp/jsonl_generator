import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useState } from 'react';
import { Preview } from '../../pages/Preview/Preview';

const PreviewOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const PreviewModal = styled(motion.div)`
  width: 95%;
  max-width: 1200px;
  height: 95vh;
  margin: auto;
  overflow: hidden;
  background: var(--card-bg);
  border-radius: 16px;
  padding: 2rem;
  position: relative;
  display: flex;
  flex-direction: column;
  box-shadow: 0 8px 32px var(--shadow);
`;

const PreviewContent = styled(motion.div)`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  border-radius: 8px;
  background: var(--background);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  opacity: 0.7;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`;

const FloatingPreviewTrigger = styled.button`
  position: absolute;
  right: 0;
  top: 0;
  color: black;
  border: none;
  cursor: pointer;
  background: none;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.02);
  }
`;

interface FloatingPreviewProps {
  prompt: string;
  inputs: { req: string; res: string }[];
}

export const FloatingPreview: React.FC<FloatingPreviewProps> = ({
  prompt,
  inputs,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <PreviewOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsVisible(false)}
          >
            <PreviewModal
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton onClick={() => setIsVisible(false)}>×</CloseButton>
              <PreviewContent>
                <Preview prompt={prompt} inputs={inputs} />
              </PreviewContent>
            </PreviewModal>
          </PreviewOverlay>
        )}
      </AnimatePresence>

      <FloatingPreviewTrigger onClick={() => setIsVisible(true)}>
        👁️ Preview
      </FloatingPreviewTrigger>
    </>
  );
};
