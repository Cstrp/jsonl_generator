import styled from '@emotion/styled';
import { AnimatePresence } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import { FC, useState } from 'react';
import { useStore } from '../../../data/stores/StoreContext';
import { copyTextToClipboard } from '../../../data/utils/copyToClipBoard';
import { Button } from '../UI/Button';
import { CloseButton } from '../UI/CloseButton';
import { ModalContent } from '../UI/ModalContent';
import { ModalOverlay } from '../UI/ModalOverlay';

const PreviewContent = styled.pre`
  background: var(--primary);
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  font-family: 'Fira Code', monospace;
  font-size: 0.875rem;
  line-height: 1.5;
  color: var(--foreground);
  margin-top: 1rem;
`;

const Title = styled.h3`
  font-size: 1.25rem;
  color: var(--foreground);
  margin-bottom: 1rem;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const CopyButton = styled(Button)`
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  margin: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

interface JSONLPreviewProps {
  formData: {
    prompt: string;
    inputs: { req: string; res: string }[];
  };
}

export const JSONLPreview: FC<JSONLPreviewProps> = observer(({ formData }) => {
  const { notificationStore } = useStore();
  const [isOpen, setIsOpen] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const generatePreviewContent = () => {
    return formData.inputs.map((input) => ({
      messages: [
        { role: 'system', content: formData.prompt },
        { role: 'user', content: input.req },
        { role: 'assistant', content: input.res },
      ],
    }));
  };

  const handleCopy = async () => {
    try {
      const content = generatePreviewContent()
        .map((item) => JSON.stringify(item))
        .join('\n');

      await copyTextToClipboard(content);
      setIsCopied(true);
      notificationStore.addNotification('Content successfully copied!', 'info');

      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (error) {
      notificationStore.addNotification(
        'An error occurred while copying.',
        'error',
      );
      console.error('Copy error:', error);
    }
  };

  return (
    <div className="mt-5">
      <Button onClick={() => setIsOpen(true)} type="button">
        <span>👁️</span> Preview output
      </Button>

      <AnimatePresence>
        {isOpen && (
          <ModalOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <ModalContent
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton onClick={() => setIsOpen(false)}>×</CloseButton>

              <HeaderContainer>
                <Title>Preview output</Title>
              </HeaderContainer>

              <PreviewContent>
                {generatePreviewContent()
                  .map((item) => JSON.stringify(item))
                  .join('\n')}
              </PreviewContent>

              <CopyButton onClick={handleCopy} type="button">
                <span>{isCopied ? '✅' : '📋'}</span>
                {isCopied ? 'Copied!' : 'Copy to clipboard'}
              </CopyButton>
            </ModalContent>
          </ModalOverlay>
        )}
      </AnimatePresence>
    </div>
  );
});
