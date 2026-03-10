import { api } from '@/api/axios.config';
import type { InvoiceFingerprintRequest, InvoiceProcessRequest } from '@/types/request/invoice.request';
import type { InvoiceInfoDto, InvoiceProcessDto } from '@/types/response/invoice.response';

export const InvoiceService = {
  invoiceInfo(invoiceId: string) {
    return api.get<InvoiceInfoDto>(`pay-form/invoice/${invoiceId}`);
  },

  process(invoiceId: string, payload: InvoiceProcessRequest) {
    return api.post<InvoiceProcessDto>(`pay-form/invoice/${invoiceId}/process`, payload);
  },

  fingerprint(invoiceId: string, payload: InvoiceFingerprintRequest) {
    return api.post<any>(`pay-form/invoice/${invoiceId}/fingerprint`, payload);
  },
};
