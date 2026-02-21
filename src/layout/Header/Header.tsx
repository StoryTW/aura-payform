import { LanguageSelect } from '@/base-ui/LanguageSelect/LanguageSelect';
import { HelperLink } from '@/components/HelperLink/HelperLink';
import { Logo } from '@/components/Logo/Logo';

import styles from './Header.module.scss';

export const Header = () => {
  return (
    <header className={styles.root}>
      <div className={styles.wrapper}>
        <Logo />

        <div className={styles.content}>
          <LanguageSelect />

          <HelperLink />
        </div>
      </div>
    </header>
  );
};
