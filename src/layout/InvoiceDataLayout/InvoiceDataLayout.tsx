import { useEffect } from 'react';
import { Outlet, useParams } from 'react-router';

import { GlobalLoader } from '@/components/GlobalLoader/GlobalLoader';
import { Footer } from '@/layout/Footer/Footer';
import { Header } from '@/layout/Header/Header';
import { useFingerprint } from '@/query/hooks/useFingerprint';
import { useInvoiceInfo } from '@/query/hooks/useInvoiceInfo';
import { StateEnum } from '@/utils/helpers/enums';
import { useBrowserData } from '@/utils/hooks/useBrowserData';

export const InvoiceDataLayout = () => {
  const { invoiceId } = useParams<ParamsType>();

  const browserData = useBrowserData();

  const invoice = useInvoiceInfo(String(invoiceId));

  const { mutate } = useFingerprint(String(invoiceId));

  useEffect(() => {
    if (invoice.isSuccess && invoice.data.state === StateEnum.SELECT_METHOD) {
      mutate({
        browser_data: browserData,
      });
    }
  }, [invoice.isSuccess]);

  return (
    <>
      <Header />

      {(invoice.isLoading) && <GlobalLoader />}

      {(invoice.isSuccess) && <Outlet context={invoice} />}

      <Footer />
    </>
  );
};
