import type { HTMLAttributes } from 'react';

import clsx from 'clsx';

import styles from './Spinner.module.scss';

export const Spinner = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => {
  return <div className={clsx(styles.spinner, className)} {...props} />;
};
