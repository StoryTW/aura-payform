import type { ButtonHTMLAttributes, ReactNode } from 'react';
import clsx from 'clsx';

import { Spinner } from '@/base-ui/Spinner/Spinner';

import styles from './Button.module.scss';

export type ButtonVariants = 'dark' | 'blue';

export type ButtonSize = 's' | 'l';

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonVariants;
  size: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  iconLeft?: ReactNode;
  iconRight?: ReactNode;
}

export const Button = ({
  variant = 'dark',
  size = 's',
  isLoading,
  className,
  children,
  disabled,
  fullWidth = false,
  type = 'button',
  iconLeft,
  iconRight,
  ...props
}: IButton) => {
  return (
    <button
      className={clsx(styles.button, styles[variant], styles[size], className, {
        [styles.fullWidth]: fullWidth,
        [styles.isLoading]: isLoading,
      })}
      type={type}
      disabled={disabled || isLoading}
      {...props}
    >
      {iconLeft && <>{iconLeft}</>}
      {isLoading ? <Spinner /> : children}
      {iconRight && <>{iconRight}</>}
    </button>
  );
};
