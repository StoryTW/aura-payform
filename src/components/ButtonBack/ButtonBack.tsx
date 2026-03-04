import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import IconChevron from '@/assets/images/icon-chevron-left.svg?react';

import styles from './ButtonBack.module.scss';

export const ButtonBack = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(-1);
  };

  return (
    <button type='button' tabIndex={-1} className={styles.btn} onClick={handleNavigate}>
      <IconChevron />
      {t('common.back')}
    </button>
  );
};
