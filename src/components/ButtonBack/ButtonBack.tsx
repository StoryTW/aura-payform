import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import IconChevron from '@/assets/images/icon-chevron-left.svg?react';

import styles from './ButtonBack.module.scss';

export const ButtonBack = () => {
  const { invoiceId } = useParams<ParamsType>();

  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/${invoiceId}`);
  };

  return (
    <button type='button' tabIndex={-1} className={styles.btn} onClick={handleNavigate}>
      <IconChevron />
      {t('common.back')}
    </button>
  );
};
