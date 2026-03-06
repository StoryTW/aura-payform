import { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useOutletContext, useParams } from 'react-router';
import { useQueryClient } from '@tanstack/react-query';

import { KEY_INVOICE_INFO } from '@/query/hooks/useInvoiceInfo';
import { useInvoiceProcess } from '@/query/hooks/useInvoiceProcess';
import type { InvoiceContextType, InvoiceProcessDto } from '@/types/response/invoice.response';
import { QUERY_MOBILE } from '@/utils/helpers/constants';
import { StateEnum } from '@/utils/helpers/enums';

import { SbpLoader } from './SbpLoader/SbpLoader';
import { SbpNSPK } from './SbpNSPK/SbpNSPK';
import { SbpQR } from './SbpQR/SbpQR';

export const Sbp = () => {
  const { invoiceId, method } = useParams<ParamsType>();

  const { data: invoiceData } = useOutletContext<InvoiceContextType>();

  const isMobile = useMediaQuery({ query: QUERY_MOBILE });

  const queryClient = useQueryClient();

  const { data, mutate, isPending } = useInvoiceProcess(String(invoiceId), {
    onSuccess: (data) => {
      if (data.payment.payment_data.payment_link) {
        queryClient.invalidateQueries({
          queryKey: [KEY_INVOICE_INFO],
        });
      }
    },
  });

  useEffect(() => {
    if (invoiceId && method && invoiceData?.state === StateEnum.SELECT_METHOD) {
      mutate({
        service_id: method,
      });
    }
  }, []);

  if (isPending) return <SbpLoader />;

  return (
    <>
      {isMobile ? (
        <SbpNSPK data={data as InvoiceProcessDto} />
      ) : (
        <SbpQR data={data as InvoiceProcessDto} />
      )}
    </>
  );
};
