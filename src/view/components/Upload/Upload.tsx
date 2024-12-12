import styled from '@emotion/styled';
import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useStore } from '../../../stores/StoreContext';
import { FilePreview } from '../FilePreview/FilePreview';

const PreviewButton = styled.button`
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

export const Upload = observer(() => {
  const { fileStore } = useStore();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      try {
        const file = acceptedFiles[0];
        if (file) {
          const fileId = await fileStore.addFile(file);
          const fileData = fileStore.getFile(fileId);

          if (fileData?.parsedData) {
            // Dispatch a custom event with the parsed data
            const event = new CustomEvent('fileDataParsed', {
              detail: fileData.parsedData,
            });
            window.dispatchEvent(event);
          }

          fileStore.openPreview();
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    },
    [fileStore],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/json': ['.json', '.jsonl'],
    },
    multiple: false,
  });

  return (
    <>
      <div className="dropzone" {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the file here...</p>
        ) : (
          <p>Drag & drop a file here, or click to select</p>
        )}
      </div>

      {fileStore.hasFiles && (
        <PreviewButton onClick={fileStore.openPreview}>
          View File Preview
        </PreviewButton>
      )}

      <FilePreview />
    </>
  );
});
