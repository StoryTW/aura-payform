import { useTranslation } from 'react-i18next';

import styles from './SbpForm.module.scss';

export const SbpForm = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.root}>
      <div className={styles.wrapper}>
        <h1 className={styles.title}>{t('sbpForm.paymentViaSbp')}</h1>

        {/* <img src='' width={262} height={262} /> */}
      </div>
    </div>
  );
};
