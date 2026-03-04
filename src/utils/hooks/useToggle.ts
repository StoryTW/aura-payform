import { type Dispatch, type SetStateAction, useCallback, useState } from 'react';

export default function useToggle(
  defaultValue?: boolean,
): [boolean, () => void, Dispatch<SetStateAction<boolean>>] {
  const [value, setValue] = useState<boolean>(!!defaultValue);

  const toggle = useCallback(() => setValue((state) => !state), []);

  return [value, toggle, setValue];
}
