import styled from '@emotion/styled';
import { AnimatePresence, motion } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../stores/StoreContext';

const ModalOverlay = styled(motion.div)`
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
  backdrop-filter: blur(4px);
`;

const ModalContent = styled(motion.div)`
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

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: var(--text-secondary);
  transition: color 0.2s ease;

  &:hover {
    color: var(--accent);
  }
`;

const FileInfo = styled.div`
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid var(--border);
`;

const ContentPreview = styled.pre`
  background: var(--primary);
  padding: 1rem;
  border-radius: 8px;
  overflow-x: auto;
  max-height: 500px;
  font-size: 0.875rem;
  margin-top: 1rem;
`;

export const FilePreview = observer(() => {
  const { fileStore } = useStore();
  const currentFile = fileStore.getCurrentFile();

  if (!currentFile || !fileStore.isPreviewOpen) return null;

  return (
    <AnimatePresence>
      <ModalOverlay
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={fileStore.closePreview}
      >
        <ModalContent
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <CloseButton onClick={fileStore.closePreview}>×</CloseButton>
          <FileInfo>
            <h4>{currentFile.name}</h4>
            <p>Size: {(currentFile.size / 1024).toFixed(2)} KB</p>
            <p>Uploaded: {currentFile.uploadedAt.toLocaleString()}</p>
          </FileInfo>
          <ContentPreview>{currentFile.content}</ContentPreview>
        </ModalContent>
      </ModalOverlay>
    </AnimatePresence>
  );
});
