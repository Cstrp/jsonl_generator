import styled from '@emotion/styled';
import { motion } from 'framer-motion';
import React from 'react';

interface PreviewProps {
  prompt: string;
  inputs: { req: string; res: string }[];
}

const PreviewWrapper = styled(motion.div)`
  margin-top: 2rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const PreviewContent = styled.pre`
  white-space: pre-wrap;
  word-wrap: break-word;
  background: #272822;
  color: #f8f8f2;
  padding: 1rem;
  border-radius: 4px;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
  transition: all 0.2s ease;
`;

const EmptyMessage = styled.p`
  opacity: 0.7;
  transition: opacity 0.3s ease;
`;

export const Preview: React.FC<PreviewProps> = React.memo(
  ({ prompt, inputs }) => {
    if (!prompt && inputs.length === 0) {
      return (
        <PreviewWrapper>
          <EmptyMessage>Start typing to see the preview...</EmptyMessage>
        </PreviewWrapper>
      );
    }

    const previewContent = inputs.map((input) => ({
      messages: [
        { role: 'system', content: prompt },
        { role: 'user', content: input.req },
        { role: 'assistant', content: input.res },
      ],
    }));

    return (
      <PreviewWrapper
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.5,
          ease: 'easeOut',
        }}
      >
        <h2>Preview</h2>
        <PreviewContent>
          {previewContent
            .map((item) => JSON.stringify(item, null, 2))
            .join('\n')}
        </PreviewContent>
      </PreviewWrapper>
    );
  },
);

Preview.displayName = 'Preview';
