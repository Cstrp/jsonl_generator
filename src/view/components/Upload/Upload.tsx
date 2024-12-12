import { observer } from 'mobx-react-lite';
import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useStore } from '../../../stores/StoreContext';
import { FilePreview } from '../FilePreview/FilePreview';
import { PreviewButton } from '../UI/PreviewButton';

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
