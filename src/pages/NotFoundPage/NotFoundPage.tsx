import { useTranslation } from 'react-i18next';

import styles from './NotFoundPage.module.scss';

import srcIcon404 from '/img/icon-404.svg';

export const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.notFound}>
      <img src={srcIcon404} alt='icon-404' width={120} height={120} />
      <h1 className={styles.title}>404</h1>
      <div className={styles.description}>{t('notFound.pageNotFound')}</div>
    </div>
  );
};
