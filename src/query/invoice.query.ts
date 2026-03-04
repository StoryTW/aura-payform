import { queryOptions } from '@tanstack/react-query';

import { KEY_INVOICE_INFO } from '@/query/hooks/useInvoiceInfo';
import { InvoiceService } from '@/service/invoice/invoice.service';

export const invoiceQuery = (invoiceId: string) =>
  queryOptions({
    queryKey: [KEY_INVOICE_INFO, invoiceId],
    queryFn: () => InvoiceService.invoiceInfo(invoiceId),
    enabled: !!invoiceId,
  });
