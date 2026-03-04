import type {
  PaymentDataStateEnumType,
  ServiceEnumType,
  StateEnumType,
} from '@/utils/helpers/enums';

export interface InvoiceInfoDto {
  id: string;
  shop_name: string;
  comment: string;
  amount: number;
  commission: number;
  success_url: string | null;
  fail_url: string | null;
  service: ServiceEnumType | null;
  state: StateEnumType;
  methods: MethodDto[];
  payment: PaymentDto | null;
}

export interface MethodDto {
  service_id: ServiceEnumType;
  service_name: string;
  service_logo: string;
}

export interface InvoiceProcessDto {
  invoice_id: string;
  amount: number;
  commission: number;
  payment: PaymentDto;
}

export interface PaymentDto {
  service_id: ServiceEnumType;
  service_name: string;
  expires_in: string;
  amount_pay: number;
  payment_data: {
    payment_link?: string;
    redirect_link?: string;
    state?: PaymentDataStateEnumType;
  };
}
