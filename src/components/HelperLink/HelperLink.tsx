import { useTranslation } from 'react-i18next';

import IconQuestion from '@/assets/images/icon-question.svg?react';
import { AURA_HELP_LINK } from '@/utils/helpers/constants';

import styles from './HelperLink.module.scss';

export const HelperLink = () => {
  const { t } = useTranslation();

  return (
    <a className={styles.link} href={AURA_HELP_LINK} target='_blank' rel='noopener noreferrer'>
      <IconQuestion />

      {t('header.help')}
    </a>
  );
};
