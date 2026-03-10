import { useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router';

import { useQueryClient } from '@tanstack/react-query';

import { KEY_INVOICE_INFO } from '@/query/hooks/useInvoiceInfo';
import type { InvoiceContextType } from '@/types/response/invoice.response';
import { formatCountdown } from '@/utils/helpers/formatCoutdown';
import { useCountdown } from '@/utils/hooks/useCountdown';

import styles from './Timer.module.scss';

export const Timer = () => {
  const invoice = useOutletContext<InvoiceContextType>();

  const queryClient = useQueryClient();

  const triggeredRef = useRef(false);

  const timer = useCountdown(invoice?.data?.expires_at);

  useEffect(() => {
    if (!timer && !triggeredRef.current) {
      triggeredRef.current = true;

      const timeout = setTimeout(() => {
        queryClient.invalidateQueries({ queryKey: [KEY_INVOICE_INFO] });
      }, 1500);

      return () => clearTimeout(timeout);
    }
  }, [timer]);

  return (
    <div className={styles.timer}>
      {formatCountdown(timer)}
    </div>
  );
};
