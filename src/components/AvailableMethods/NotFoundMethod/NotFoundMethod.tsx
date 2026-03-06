import { useTranslation } from 'react-i18next';

import { ButtonBack } from '@/components/ButtonBack/ButtonBack';
import { TermsOfService } from '@/components/TermsOfService/TermsOfService';

import styles from './NotFoundMethod.module.scss';

export const NotFoundMethod = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <ButtonBack />

        <div className={styles.title}>{t('common.methodNotFound')}</div>

        <div className={styles.description}>{t('common.backAndSelectAnotherMethod')}</div>
      </div>

      <TermsOfService />
    </div>
  );
};
