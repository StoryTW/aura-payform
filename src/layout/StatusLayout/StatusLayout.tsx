import { Outlet, useOutletContext } from 'react-router';

import { ViewWrapper } from '@/components/ViewWrapper/ViewWrapper';
import type { InvoiceContextType } from '@/types/response/invoice.response';

import styles from './StatusLayout.module.scss';

export const StatusLayout = () => {
  const { data: invoiceData } = useOutletContext<InvoiceContextType>();

  return (
    <>
      <main className={styles.main}>
        <ViewWrapper>
          <Outlet context={invoiceData} />
        </ViewWrapper>
      </main>
    </>
  );
};
