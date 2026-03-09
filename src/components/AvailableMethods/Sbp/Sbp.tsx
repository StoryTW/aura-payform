import { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useNavigate, useOutletContext, useParams } from 'react-router';

import { useQueryClient } from '@tanstack/react-query';

import { SbpError } from '@/components/SbpError/SbpError';
import { SbpLoader } from '@/components/SbpLoader/SbpLoader';
import { KEY_INVOICE_INFO } from '@/query/hooks/useInvoiceInfo';
import { useInvoiceProcess } from '@/query/hooks/useInvoiceProcess';
import { useInvoiceStatusStore } from '@/store/useInvoiceStatusStore';
import type { InvoiceContextType, InvoiceProcessDto } from '@/types/response/invoice.response';
import { QUERY_MOBILE } from '@/utils/helpers/constants';
import { StateEnum } from '@/utils/helpers/enums';

import { SbpNSPK } from './SbpNSPK/SbpNSPK';
import { SbpQR } from './SbpQR/SbpQR';

export const Sbp = () => {
  const { invoiceId, method } = useParams<ParamsType>();

  const navigate = useNavigate();

  const { data: invoiceData } = useOutletContext<InvoiceContextType>();

  const isMobile = useMediaQuery({ query: QUERY_MOBILE });

  const queryClient = useQueryClient();

  const { status, initSubscription } = useInvoiceStatusStore();

  const {
    data, mutate, isPending, isSuccess, isError, error,
  } = useInvoiceProcess(
    String(invoiceId),
    {
      onSuccess: (data) => {
        if (data.payment.payment_data.payment_link) {
          queryClient.invalidateQueries({
            queryKey: [KEY_INVOICE_INFO],
          });
        }
      },
    },
  );

  const isPaidOrExpired
    = status === StateEnum.PAID
      || status === StateEnum.EXPIRED
      || invoiceData?.state === StateEnum.PAID
      || invoiceData?.state === StateEnum.EXPIRED;

  useEffect(() => {
    if (invoiceId && method && invoiceData?.state === StateEnum.SELECT_METHOD) {
      mutate({
        service_id: method,
      });
    }
  }, []);

  useEffect(() => {
    if (!invoiceId) return;
    if (!isSuccess) return;

    const unsubscribe = initSubscription(invoiceId);

    return () => {
      unsubscribe();
    };
  }, [invoiceId, initSubscription, isSuccess]);

  useEffect(() => {
    if (isPaidOrExpired) {
      navigate('status', { replace: true });
    }
  }, [status, invoiceData?.state]);

  if (isPending) return <SbpLoader />;

  if (isError) return <SbpError message={error.message} />;

  return (
    <>
      {isMobile
        ? (
          <SbpNSPK data={data as InvoiceProcessDto} />
        )
        : (
          <SbpQR data={data as InvoiceProcessDto} />
        )}
    </>
  );
};
