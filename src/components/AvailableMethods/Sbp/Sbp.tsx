import { useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { useOutletContext, useParams } from 'react-router';

import { useInvoiceProcess } from '@/query/hooks/useInvoiceProcess';
import type { InvoiceInfoDto, InvoiceProcessDto } from '@/types/response/invoice.response';
import { QUERY_MOBILE } from '@/utils/helpers/constants';
import { StateEnum } from '@/utils/helpers/enums';

import { SbpNSPK } from './SbpNSPK/SbpNSPK';
import { SbpQR } from './SbpQR/SbpQR';

export const Sbp = () => {
  const { invoiceId, method } = useParams<ParamsType>();

  const invoiceData = useOutletContext<InvoiceInfoDto>();

  const isMobile = useMediaQuery({ query: QUERY_MOBILE });

  const { data, mutate, isPending } = useInvoiceProcess(String(invoiceId));

  useEffect(() => {
    if (invoiceId && method && invoiceData.state === StateEnum.SELECT_METHOD) {
      mutate({
        service_id: method,
      });
    }
  }, []);

  if (isPending) return <>Loading...</>;

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
