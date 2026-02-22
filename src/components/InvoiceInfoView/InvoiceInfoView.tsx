import { useTranslation } from 'react-i18next';

import styles from './InvoiceInfoView.module.scss';

export const InvoiceInfoView = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.view}>
      <div className={styles.title}>{t('common.paymentDetails')}</div>
    </div>
  );
};
