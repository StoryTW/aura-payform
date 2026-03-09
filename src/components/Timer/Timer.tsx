import { useEffect } from 'react';
import { useOutletContext } from 'react-router';

import { useQueryClient } from '@tanstack/react-query';

import { KEY_INVOICE_INFO } from '@/query/hooks/useInvoiceInfo';
import type { InvoiceContextType } from '@/types/response/invoice.response';
import { formatCountdown } from '@/utils/helpers/formatCoutdown';
import { useCountdown } from '@/utils/hooks/useCountdown';

import styles from './Timer.module.scss';

export const Timer = () => {
  const invoice = useOutletContext<InvoiceContextType>();

  const timer = useCountdown(invoice?.data?.expires_at);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (!timer) {
      queryClient.invalidateQueries({
        queryKey: [KEY_INVOICE_INFO],
      });
    }

    return;
  }, [timer]);

  return (
    <div className={styles.timer}>
      {formatCountdown(timer)}
    </div>
  );
};
