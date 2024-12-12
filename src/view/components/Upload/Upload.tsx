import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useStore } from '../../../data/stores/StoreContext';
import { FilePreview } from '../FilePreview/FilePreview';
import { PreviewButton } from '../UI/PreviewButton';

export const Upload = observer(() => {
  const { fileStore, notificationStore } = useStore();

  const onDrop = useCallback(
    async (acceptedFiles: File[], rejectedFiles: any[]) => {
      if (rejectedFiles.length > 0) {
        notificationStore.addNotification(
          'Invalid file type. Please upload only .jsonl files',
          'error',
        );
        return;
      }

      try {
        const file = acceptedFiles[0];

        if (!file) {
          return;
        }

        if (!file.name.match(/\.(jsonl)$/i)) {
          notificationStore.addNotification(
            'Invalid file type. Please upload only .jsonl files',
            'error',
          );
          return;
        }

        const fileId = await fileStore.addFile(file);
        const fileData = fileStore.getFile(fileId);

        if (fileData?.parsedData) {
          const event = new CustomEvent('fileDataParsed', {
            detail: fileData.parsedData,
          });
          window.dispatchEvent(event);
          notificationStore.addNotification(
            'File uploaded and parsed successfully!',
            'success',
          );
        } else {
          throw new Error('Failed to parse file content');
        }

        fileStore.openPreview();
      } catch (error) {
        console.error('Error uploading file:', error);
        notificationStore.addNotification(
          'Error: File must be a valid JSONL format with proper structure',
          'error',
        );
      }
    },
    [fileStore, notificationStore],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/json': ['.jsonl'],
    },
    multiple: false,
    validator: (file) => {
      if (!file.name.match(/\.(jsonl)$/i)) {
        return {
          code: 'invalid-file-type',
          message: 'Invalid file type',
        };
      }
      return null;
    },
  });

  return (
    <>
      <div className="dropzone" {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the file here...</p>
        ) : (
          <p>Drag & drop a .json or .jsonl file here, or click to select</p>
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
