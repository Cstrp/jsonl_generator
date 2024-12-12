export const generateJSONLFile = (content: string[]) => {
  try {
    const blob = new Blob([content.join('\n')], { type: 'application/jsonl' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${Date.now()}.jsonl`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  } catch (error) {
    console.error('Error generating file:', error);
  }
};
