import { makeAutoObservable } from 'mobx';

interface FileData {
  id: string;
  name: string;
  content: string;
  size: number;
  type: string;
  uploadedAt: Date;
  parsedData?: {
    prompt: string;
    inputs: { req: string; res: string }[];
  };
}

export class FileStore {
  files: Map<string, FileData> = new Map();
  currentFileId: string | null = null;
  isPreviewOpen: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  parseJSONLContent(content: string): {
    prompt: string;
    inputs: { req: string; res: string }[];
  } {
    try {
      const lines = content.split('\n').filter((line) => line.trim());
      const jsonObjects = lines.map((line) => JSON.parse(line));

      const firstObject = jsonObjects[0];
      const prompt =
        firstObject.messages.find(
          (msg: { role: string }) => msg.role === 'system',
        )?.content || '';

      const inputs = jsonObjects.flatMap((data) => {
        const messages = data.messages;
        if (!Array.isArray(messages)) return [];

        const userMessage = messages.find((msg) => msg.role === 'user');
        const assistantMessage = messages.find(
          (msg) => msg.role === 'assistant',
        );

        if (userMessage && assistantMessage) {
          return [
            {
              req: userMessage.content,
              res: assistantMessage.content,
            },
          ];
        }
        return [];
      });

      return { prompt, inputs };
    } catch (error) {
      console.error('Error parsing JSONL content:', error);
      return { prompt: '', inputs: [] };
    }
  }

  addFile = async (file: File) => {
    try {
      const content = await this.readFileContent(file);
      const parsedData = this.parseJSONLContent(content);

      const fileData: FileData = {
        id: crypto.randomUUID(),
        name: file.name,
        content,
        size: file.size,
        type: file.type,
        uploadedAt: new Date(),
        parsedData,
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
          let content = event.target.result as string;
          if (content.charCodeAt(0) === 0xfeff) {
            content = content.slice(1);
          }
          resolve(content);
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
