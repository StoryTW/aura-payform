import type { HTMLAttributes } from 'react';
import clsx from 'clsx';

import styles from './Skeleton.module.scss';

type SkeletonVariantType = 'text' | 'circle';

interface ISkeleton extends HTMLAttributes<HTMLDivElement> {
  width: number | string;
  height: number | string;
  variant?: SkeletonVariantType;
}

export const Skeleton = ({
  className,
  width,
  height,
  variant = 'text',
  style,
  ...props
}: ISkeleton) => {
  return (
    <div
      style={{
        width: width,
        height: height,
        ...style,
      }}
      className={clsx(styles.skeleton, styles[variant], className)}
      {...props}
    />
  );
};
