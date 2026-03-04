import { useTranslation } from 'react-i18next';
import { useOutletContext } from 'react-router';

import { Button } from '@/base-ui/Button/Button';
import { IconsPay } from '@/components/IconsPay/IconsPay';
import { TermsOfService } from '@/components/TermsOfService/TermsOfService';
import type { InvoiceInfoDto, InvoiceProcessDto } from '@/types/response/invoice.response';

import styles from './SbpNSPK.module.scss';

interface SbpNSPK {
  data: InvoiceProcessDto;
}

export const SbpNSPK = ({ data }: SbpNSPK) => {
  const { t } = useTranslation();

  const invoiceData = useOutletContext<InvoiceInfoDto>();

  const paymentLink =
    data?.payment?.payment_data?.payment_link || invoiceData.payment?.payment_data?.payment_link;

  const handleNavigateToNSPK = () => {
    if (paymentLink) {
      window.location.href = paymentLink;
    }
  };

  return (
    <div className={styles.sbpNspk}>
      <div className={styles.title}>{t('sbpForm.paymentViaSbp')}</div>

      <div className={styles.description}>Возникли проблемы при оплате?</div>

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
