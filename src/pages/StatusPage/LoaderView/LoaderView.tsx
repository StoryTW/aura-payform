import { useTranslation } from 'react-i18next';

import styles from './LoaderView.module.scss';

import srcIconLoader from '/img/icon-loader.svg';

export const LoaderView = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.loaderView}>
      <img src={srcIconLoader} alt='loader' width={128} height={128} className={styles.img} />

      <div className={styles.title}>{t('status.paymentIsProcessed')}</div>

      <div className={styles.description}>{t('status.dontClosePage')}</div>
    </div>
  );
};
