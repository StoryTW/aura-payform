import { useTranslation } from 'react-i18next';
import { useOutletContext } from 'react-router';
import { QRCodeCanvas } from 'qrcode.react';

import { Alert } from '@/base-ui/Alert/Alert';
import { TermsOfService } from '@/components/TermsOfService/TermsOfService';
import type { InvoiceContextType, InvoiceProcessDto } from '@/types/response/invoice.response';

import styles from './SbpQR.module.scss';

interface ISbpQR {
  data: InvoiceProcessDto;
}

export const SbpQR = ({ data }: ISbpQR) => {
  const { t } = useTranslation();

  const { data: invoiceData } = useOutletContext<InvoiceContextType>();

  const paymentLink =
    data?.payment?.payment_data?.payment_link || invoiceData?.payment?.payment_data?.payment_link;

  return (
    <div className={styles.sbpQr}>
      <div className={styles.wrapper}>
        <div className={styles.title}>{t('sbpForm.paymentViaSbp')}</div>

        {Boolean(paymentLink) && (
          <div className={styles.qrWrapper}>
            <QRCodeCanvas value={String(paymentLink)} size={220} />
          </div>
        )}

        <div className={styles.textInfo}>{t('sbpForm.scanQrCode')}</div>

        <div className={styles.textDescription}>{t('sbpForm.openBankApp')}</div>

        <Alert variant='warning' text={t('alert.refreshPage')} fullWidth />
      </div>

      <TermsOfService />
    </div>
  );
};
