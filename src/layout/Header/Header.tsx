import { AURA_LANDING_LINK } from '@/utils/helpers/constants';

import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.root}>
      <div className={styles.wrapper}>
        <a href={AURA_LANDING_LINK} target='_blank' className={styles.link}>
          <img src='/img/logo.svg' width={85} height={22} alt='aura-logo' />
        </a>

        <div className={styles.content}>content</div>
      </div>
    </header>
  );
};
