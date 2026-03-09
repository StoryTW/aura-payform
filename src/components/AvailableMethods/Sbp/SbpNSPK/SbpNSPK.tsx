import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useOutletContext } from 'react-router';

import { Button } from '@/base-ui/Button/Button';
import { IconsPay } from '@/components/IconsPay/IconsPay';
import { TermsOfService } from '@/components/TermsOfService/TermsOfService';
import type { InvoiceContextType, InvoiceProcessDto } from '@/types/response/invoice.response';
import { STORAGE_REDIRECT_KEY } from '@/utils/helpers/constants';

import styles from './SbpNSPK.module.scss';

interface SbpNSPK {
  data: InvoiceProcessDto;
}

export const SbpNSPK = ({ data }: SbpNSPK) => {
  const { t } = useTranslation();

  const { data: invoiceData } = useOutletContext<InvoiceContextType>();

  const paymentLink
    = data?.payment?.payment_data?.payment_link || invoiceData?.payment?.payment_data?.payment_link;

  const handleNavigateToNSPK = () => {
    if (paymentLink) {
      sessionStorage.setItem(STORAGE_REDIRECT_KEY, '1');

      window.location.href = paymentLink;
    }
  };

  useEffect(() => {
    if (!paymentLink) return;

    const alreadyRedirected = sessionStorage.getItem(STORAGE_REDIRECT_KEY);

    if (alreadyRedirected) return;

    const timer = setTimeout(() => {
      sessionStorage.setItem(STORAGE_REDIRECT_KEY, '1');

      window.location.href = paymentLink;
    }, 2000);

    return () => clearTimeout(timer);
  }, [paymentLink]);

  return (
    <div className={styles.sbpNspk}>
      <div className={styles.title}>{t('sbpForm.paymentViaSbp')}</div>

      <div className={styles.redirectText}>{t('sbpForm.redirect')}</div>

      <div className={styles.description}>{t('sbpForm.havingProblemsWithPayment')}</div>

      <Button
        variant='dark'
        size='l'
        onClick={handleNavigateToNSPK}
        fullWidth
        iconRight={<IconsPay type='sbp' />}
        className={styles.btn}
      >
        {t('sbpForm.redirectToPay')}
      </Button>

      <TermsOfService />
    </div>
  );
};
