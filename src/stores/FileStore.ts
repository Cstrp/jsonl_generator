import { makeAutoObservable } from 'mobx';

interface FileData {
  id: string;
  name: string;
  content: string;
  size: number;
  type: string;
  uploadedAt: Date;
}

export class FileStore {
  files: Map<string, FileData> = new Map();
  currentFileId: string | null = null;
  isPreviewOpen: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  addFile = async (file: File) => {
    try {
      const content = await this.readFileContent(file);
      const fileData: FileData = {
        id: crypto.randomUUID(),
        name: file.name,
        content,
        size: file.size,
        type: file.type,
        uploadedAt: new Date(),
      };

      this.files.set(fileData.id, fileData);
      this.currentFileId = fileData.id;
      return fileData.id;
    } catch (error) {
      console.error('Error adding file:', error);
      throw error;
    }
  };

  private readFileContent = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          resolve(event.target.result as string);
        } else {
          reject(new Error('Failed to read file content'));
        }
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsText(file);
    });
  };

  getFile = (id: string) => {
    return this.files.get(id);
  };

  getCurrentFile = () => {
    return this.currentFileId ? this.files.get(this.currentFileId) : null;
  };

  removeFile = (id: string) => {
    this.files.delete(id);
    if (this.currentFileId === id) {
      this.currentFileId = null;
    }
  };

  clearFiles = () => {
    this.files.clear();
    this.currentFileId = null;
  };

  get filesList() {
    return Array.from(this.files.values());
  }

  get hasFiles() {
    return this.files.size > 0;
  }

  togglePreview = () => {
    this.isPreviewOpen = !this.isPreviewOpen;
  };

  closePreview = () => {
    this.isPreviewOpen = false;
  };

  openPreview = () => {
    this.isPreviewOpen = true;
  };
}
