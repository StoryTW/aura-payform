import { useQuery } from '@tanstack/react-query';

import { invoiceQuery } from '@/query/invoice.query';
// import { InvoiceService } from '@/service/invoice/invoice.service';
// import type { InvoiceInfoDto } from '@/types/response/invoice.response';

export const KEY_INVOICE_INFO = 'KEY_INVOICE_INFO';

export const useInvoiceInfo = (
  invoiceId: string,
  // options?: QueryOptions<InvoiceInfoDto, ApiError>,
) =>
  useQuery({
    ...invoiceQuery(invoiceId),
    // ...options,
  });

// queryKey: [KEY_INVOICE_INFO, invoiceId],
// queryFn: () => InvoiceService.invoiceInfo(invoiceId),
// enabled: !!invoiceId,
