import { Outlet, useOutletContext } from 'react-router';

import { ViewWrapper } from '@/components/ViewWrapper/ViewWrapper';
import { Footer } from '@/layout/Footer/Footer';
import { Header } from '@/layout/Header/Header';
import type { InvoiceInfoDto } from '@/types/response/invoice.response';

import styles from './StatusLayout.module.scss';

export const StatusLayout = () => {
  const invoiceData = useOutletContext<InvoiceInfoDto>();

  return (
    <>
      <Header />

      <main className={styles.main}>
        <ViewWrapper>
          <Outlet context={invoiceData} />
        </ViewWrapper>
      </main>

      <Footer />
    </>
  );
};
