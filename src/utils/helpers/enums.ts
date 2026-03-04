export const ServiceEnum = {
  CARD: 'card',
  SBP: 'sbp',
} as const;

export type ServiceEnumType = (typeof ServiceEnum)[keyof typeof ServiceEnum];

export const StateEnum = {
  SELECT_METHOD: 'select_method',
  WAIT_PAY: 'wait_pay',
  PAID: 'paid',
  EXPIRED: 'expired',
} as const;

export type StateEnumType = (typeof StateEnum)[keyof typeof StateEnum];

// need_3ds - редиректим на redirect_link, completed - успешная оплата, error - неуспешная оплата
export const PaymentDataStateEnum = {
  NEED_3DS: 'need_3ds',
  COMPLETED: 'completed',
  ERROR: 'error',
} as const;

export type PaymentDataStateEnumType =
  (typeof PaymentDataStateEnum)[keyof typeof PaymentDataStateEnum];
