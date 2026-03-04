import type { ServiceEnumType } from '@/utils/helpers/enums';

export interface InvoiceProcessRequest {
  service_id: ServiceEnumType;

  // Нужно только при service_id = card
  card_data?: {
    card_number: string;
    expiry_month: string;
    expiry_year: string;
    cvv: string;
    card_holder: string;
  };
}
