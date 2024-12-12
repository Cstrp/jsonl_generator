export const generateJSONLFile = (content: string[]) => {
  const jsonlContent = content.join('\n');
  const blob = new Blob([jsonlContent], { type: 'application/json' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  const filename = Date.now().toString();

  link.href = url;
  link.download = `${filename}.jsonl`;
  document.body.appendChild(link);

  link.click();

  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
