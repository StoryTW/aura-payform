import { useEffect, useState } from 'react';

import dayjs from '@/utils/helpers/dayjs';

export const useCountdown = (expiresAt?: string) => {
  const calculate = () => {
    if (!expiresAt) return null;

    const now = dayjs();
    const end = dayjs(expiresAt);

    const diff = end.diff(now);

    if (diff <= 0) return null;

    const d = dayjs.duration(diff);

    return {
      minutes: d.minutes(),
      seconds: d.seconds(),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculate);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculate());
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  return timeLeft;
};
