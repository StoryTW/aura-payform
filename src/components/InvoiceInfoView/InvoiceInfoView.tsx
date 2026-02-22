import { useTranslation } from 'react-i18next';

import { ViewWrapper } from '../ViewWrapper/ViewWrapper';

import styles from './InvoiceInfoView.module.scss';

export const InvoiceInfoView = () => {
  const { t } = useTranslation();

  return (
    <ViewWrapper>
      <div className={styles.title}>{t('common.paymentDetails')}</div>
    </ViewWrapper>
  );
};
