import type { LoaderFunctionArgs } from 'react-router';

import { invoiceQuery } from '@/query/invoice.query';
import { queryClient } from '@/query/queryClient';
import type { InvoiceInfoDto } from '@/types/response/invoice.response';

export async function invoiceLoader({
  params,
}: LoaderFunctionArgs<ParamsType>): Promise<InvoiceInfoDto> {
  const invoiceId = params.invoiceId!;

  return queryClient.ensureQueryData(invoiceQuery(invoiceId));
}
