import type { FC, ReactNode } from 'react';
import { Outlet, useLoaderData } from 'react-router';

import type { InvoiceInfoDto } from '@/types/response/invoice.response';

export const InvoiceDataLayout: FC<{ children?: ReactNode }> = () => {
  const invoiceData = useLoaderData() as InvoiceInfoDto;

  return <Outlet context={invoiceData} />;
};
