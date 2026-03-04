import { useCallback, useState } from 'react';

export const useClipboard = (timeout = 1500) => {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleCopy = useCallback(
    (text: string) => {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          setIsCopied(true);
          setTimeout(() => setIsCopied(false), timeout);
        })
        .catch(() => {
          setIsCopied(false);
        });
    },
    [timeout],
  );

  return { isCopied, handleCopy };
};
