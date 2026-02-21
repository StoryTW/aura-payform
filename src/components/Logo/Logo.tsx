import { AURA_LANDING_LINK } from '@/utils/helpers/constants';

import styles from './Logo.module.scss';

import logo from '/img/logo.svg';

export const Logo = () => {
  return (
    <a href={AURA_LANDING_LINK} target='_blank' className={styles.link} rel='noopener noreferrer'>
      <img src={logo} width={85} height={22} alt='aura-logo' />
    </a>
  );
};
