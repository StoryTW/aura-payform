import { Outlet, useParams } from 'react-router';

import { GlobalLoader } from '@/components/GlobalLoader/GlobalLoader';
import { Footer } from '@/layout/Footer/Footer';
import { Header } from '@/layout/Header/Header';
import { useInvoiceInfo } from '@/query/hooks/useInvoiceInfo';

export const InvoiceDataLayout = () => {
  const { invoiceId } = useParams<ParamsType>();

  const invoice = useInvoiceInfo(String(invoiceId));

  return (
    <>
      <Header />

      {invoice.isLoading && <GlobalLoader />}

      {invoice.isSuccess && <Outlet context={invoice} />}

      <Footer />
    </>
  );
};
