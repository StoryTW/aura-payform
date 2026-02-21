import { useTranslation } from 'react-i18next';

import { AURA_TERMS_OF_SERVICE_LINK } from '@/utils/helpers/constants';

import styles from './TermsOfService.module.scss';

import srcIconMastercard from '/img/pay-icons/icon-mastercard.svg';
import srcIconMir from '/img/pay-icons/icon-mir.svg';
import srcIconPci from '/img/pay-icons/icon-pci.svg';
import srcIconSbp from '/img/pay-icons/icon-sbp.svg';
import srcIconVisa from '/img/pay-icons/icon-visa.svg';

const ICONS = [
  {
    name: 'mir',
    src: srcIconMir,
  },
  {
    name: 'visa',
    src: srcIconVisa,
  },
  {
    name: 'mastercard',
    src: srcIconMastercard,
  },
  {
    name: 'sbp',
    src: srcIconSbp,
  },
  {
    name: 'pci-dss',
    src: srcIconPci,
  },
];

export const TermsOfService = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.root}>
      <span className={styles.text}>
        {t('by making a payment you agree to the')}{' '}
        <a href={AURA_TERMS_OF_SERVICE_LINK} target='_blank' rel='noopener noreferrer'>
          {t('termsOfService')}
        </a>
      </span>

      <div className={styles.icons}>
        {ICONS.map((icon) => {
          return <img src={icon.src} alt={icon.name} />;
        })}
      </div>
    </div>
  );
};
