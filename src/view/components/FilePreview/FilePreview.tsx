import styled from '@emotion/styled';
import { AnimatePresence } from 'framer-motion';
import { observer } from 'mobx-react-lite';
import { useStore } from '../../../stores/StoreContext';
import { CloseButton } from '../UI/CloseButton';
import { ModalContent } from '../UI/ModalContent';
import { ModalOverlay } from '../UI/ModalOverlay';

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
