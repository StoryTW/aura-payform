import { Outlet, useOutletContext } from 'react-router';

import { InvoiceInfoView } from '@/components/InvoiceInfoView/InvoiceInfoView';
import { ViewWrapper } from '@/components/ViewWrapper/ViewWrapper';
import type { InvoiceContextType } from '@/types/response/invoice.response';

import styles from './PaymentLayout.module.scss';

export const PaymentLayout = () => {
  const { data: invoiceData, isSuccess } = useOutletContext<InvoiceContextType>();

  return (
    <>
      <main className={styles.main}>
        <ViewWrapper className={styles.paymentView}>
          <Outlet context={invoiceData} />
        </ViewWrapper>

        {isSuccess && <InvoiceInfoView invoiceData={invoiceData} />}
      </main>
    </>
  );
};
