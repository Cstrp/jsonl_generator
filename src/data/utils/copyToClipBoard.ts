export const copyTextToClipboard = async (
  text: string,
): Promise<void | boolean> => {
  try {
    if (text && window.isSecureContext) {
      if ('clipboard' in navigator) {
        return await navigator.clipboard.writeText(text);
      } else {
        return document.execCommand('copy', true, text);
      }
    }

    return false;
  } catch (error) {
    console.log(error);
    return false;
  }
};