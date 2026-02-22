import { useTranslation } from 'react-i18next';

import { Logo } from '@/components/Logo/Logo';
import { AURA_PERSONAL_DATA_LINK, AURA_PUBLIC_OFFER_LINK } from '@/utils/helpers/constants';

import styles from './Footer.module.scss';

const currentYear = new Date().getFullYear();

export const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <Logo />

          <div className={styles.copyright}>© aurapay.tech {currentYear}</div>
        </div>

        <a
          href={AURA_PUBLIC_OFFER_LINK}
          target='_blank'
          className={styles.link}
          rel='noopener noreferrer'
        >
          {t('footer.publicOffer')}
        </a>

        <a
          href={AURA_PERSONAL_DATA_LINK}
          target='_blank'
          className={styles.link}
          rel='noopener noreferrer'
        >
          {t('footer.processingOfPersonalData')}
        </a>
      </div>
    </footer>
  );
};
