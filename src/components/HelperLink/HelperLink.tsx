import { useTranslation } from 'react-i18next';

import IconQuestion from '@/assets/images/icon-question.svg?react';

import styles from './HelperLink.module.scss';

export const HelperLink = () => {
  const { t } = useTranslation();

  return (
    <a
      className={styles.link}
      href='https://aurapay.tech/'
      target='_blank'
      rel='noopener noreferrer'
    >
      <IconQuestion />

      {t('header.help')}
    </a>
  );
};
