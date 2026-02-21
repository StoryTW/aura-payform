import { Outlet } from 'react-router';

import { InvoiceInfoView } from '@/components/InvoiceInfoView/InvoiceInfoView';
import { TermsOfService } from '@/components/TermsOfService/TermsOfService';
import { Footer } from '@/layout/Footer/Footer';
import { Header } from '@/layout/Header/Header';

import styles from './RootLayout.module.scss';

export const RootLayout = () => {
  return (
    <>
      <Header />

      <section className={styles.content}>
        <div className={styles.view}>
          <Outlet />

          <TermsOfService />
        </div>

        <InvoiceInfoView />
      </section>

      <Footer />
    </>
  );
};
