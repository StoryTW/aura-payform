import { Outlet, useOutletContext } from 'react-router';

import { InvoiceInfoView } from '@/components/InvoiceInfoView/InvoiceInfoView';
import { ViewWrapper } from '@/components/ViewWrapper/ViewWrapper';
import { Footer } from '@/layout/Footer/Footer';
import { Header } from '@/layout/Header/Header';
import type { InvoiceInfoDto } from '@/types/response/invoice.response';

import styles from './PaymentLayout.module.scss';

export const PaymentLayout = () => {
  const invoiceData = useOutletContext<InvoiceInfoDto>();

  return (
    <>
      <Header />

      <main className={styles.main}>
        <ViewWrapper className={styles.paymentView}>
          <Outlet context={invoiceData} />
        </ViewWrapper>

        <InvoiceInfoView invoiceData={invoiceData} />
      </main>

      <Footer />
    </>
  );
};
