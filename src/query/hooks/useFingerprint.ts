import { useMutation } from '@tanstack/react-query';

import { InvoiceService } from '@/service/invoice/invoice.service';
import type { InvoiceFingerprintRequest } from '@/types/request/invoice.request';

export const KEY_INVOICE_FINGERPRINT = 'KEY_INVOICE_FINGERPRINT';

export const useFingerprint = (
  invoiceId: string,
  options?: MutationOptions<any, ApiError, InvoiceFingerprintRequest>,
) =>
  useMutation({
    mutationKey: [KEY_INVOICE_FINGERPRINT],
    mutationFn: (data) => InvoiceService.fingerprint(invoiceId, {
      browser_data: data.browser_data,
    }),
    ...options,
  });
