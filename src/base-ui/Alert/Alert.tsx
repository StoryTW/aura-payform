import type { HTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

import IconInfo from '@/assets/images/icon-info.svg?react';

import styles from './Alert.module.scss';

type AlertVariantsType = 'success' | 'error' | 'warning';

interface IAlert extends HTMLAttributes<HTMLDivElement> {
  variant: AlertVariantsType;
  text: ReactNode;
  fullWidth?: boolean;
}

export const Alert = ({ variant, text, className, fullWidth = false, ...props }: IAlert) => {
  return (
    <div
      className={clsx(styles.root, styles[variant], className, {
        [styles.fullWidth]: fullWidth,
      })}
      {...props}
    >
      <div className={styles.wrapper}>
        <div className={clsx(styles.icon, styles[variant])}>
          <IconInfo />
        </div>

        <div className={clsx(styles.text, styles[variant])}>{text}</div>
      </div>
    </div>
  );
};
