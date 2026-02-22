import type { HTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

import styles from './ViewWrapper.module.scss';

interface IViewWrapper extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const ViewWrapper = ({ children, className, ...props }: IViewWrapper) => {
  return (
    <div className={clsx(styles.view, className)} {...props}>
      {children}
    </div>
  );
};
