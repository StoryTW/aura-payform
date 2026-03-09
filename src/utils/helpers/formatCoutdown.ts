import type { useCountdown } from '@/utils/hooks/useCountdown';

const pad = (n: number) => String(n).padStart(2, '0');

export const formatCountdown = (t: ReturnType<typeof useCountdown>) => {
  if (!t) return '';

  return `Время на оплату ${pad(t.minutes)}:${pad(t.seconds)}`;
};
