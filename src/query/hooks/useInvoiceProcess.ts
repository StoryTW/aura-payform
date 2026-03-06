import { useMutation } from '@tanstack/react-query';

import { InvoiceService } from '@/service/invoice/invoice.service';
import type { InvoiceProcessRequest } from '@/types/request/invoice.request';
import type { InvoiceProcessDto } from '@/types/response/invoice.response';
import { ServiceEnum } from '@/utils/helpers/enums';

export const KEY_INVOICE_PROCESS = 'KEY_INVOICE_PROCESS';

export const useInvoiceProcess = (
  invoiceId: string,
  options?: MutationOptions<InvoiceProcessDto, ApiError, InvoiceProcessRequest>,
) =>
  useMutation({
    mutationKey: [KEY_INVOICE_PROCESS],
    mutationFn: (data) => {
      const payload: InvoiceProcessRequest = {
        service_id: data.service_id,
      };

      if (data.service_id === ServiceEnum.CARD) {
        payload.card_data = data.card_data;
        payload.browser_data = data.browser_data;
      }

      return InvoiceService.process(invoiceId, payload);
    },
    ...options,
  });
