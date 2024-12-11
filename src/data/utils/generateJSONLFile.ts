export const generateJSONLFile = (content: string[], filename: string) => {
  const jsonlContent = content.join('\n');
  const blob = new Blob([jsonlContent], { type: 'application/json' });
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.href = url;
  link.download = `${filename}.jsonl`;
  document.body.appendChild(link); // Добавляем элемент в body
  link.click();
  document.body.removeChild(link); // Удаляем элемент после использования
  window.URL.revokeObjectURL(url);
};
