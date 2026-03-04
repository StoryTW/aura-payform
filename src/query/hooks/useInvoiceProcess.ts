import { useMutation } from '@tanstack/react-query';

import { InvoiceService } from '@/service/invoice/invoice.service';
import type { InvoiceProcessRequest } from '@/types/request/invoice.request';
import type { InvoiceProcessDto } from '@/types/response/invoice.response';

export const KEY_INVOICE_PROCESS = 'KEY_INVOICE_PROCESS';

export const useInvoiceProcess = (
  invoiceId: string,
  options?: MutationOptions<InvoiceProcessDto, ApiError, InvoiceProcessRequest>,
) =>
  useMutation({
    mutationKey: [KEY_INVOICE_PROCESS],
    mutationFn: (data) =>
      InvoiceService.process(invoiceId, {
        service_id: data.service_id,
        card_data: {
          card_number: data?.card_data?.card_number as string,
          expiry_month: data?.card_data?.expiry_month as string,
          expiry_year: data?.card_data?.expiry_year as string,
          cvv: data?.card_data?.cvv as string,
          card_holder: data?.card_data?.card_holder as string,
        },
      }),
    ...options,
  });
