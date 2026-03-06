import { useTranslation } from 'react-i18next';

import { Alert } from '@/base-ui/Alert/Alert';
import { CardForm } from '@/components/AvailableMethods/Card/CardForm/CardForm';
import { ButtonBack } from '@/components/ButtonBack/ButtonBack';
import { TermsOfService } from '@/components/TermsOfService/TermsOfService';

import styles from './Card.module.scss';

export const Card = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.card}>
      <div>
        <ButtonBack />

        <div className={styles.title}>{t('cardForm.payCardTitle')}</div>

        <CardForm />

        <Alert variant='warning' text={t('alert.cardDetailsProtected')} />
      </div>

      <TermsOfService />
    </div>
  );
};
