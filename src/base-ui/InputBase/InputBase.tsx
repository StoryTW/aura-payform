import type { InputHTMLAttributes, Ref } from 'react';
import clsx from 'clsx';

import styles from './InputBase.module.scss';

export interface IInput extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label: string;
  error?: string;
  classNameWrapper?: string;
  ref?: Ref<HTMLInputElement>;
}

export const InputBase = ({
  error,
  id,
  type,
  disabled,
  label,
  className,
  classNameWrapper,
  ref,
  ...props
}: IInput) => {
  return (
    <div className={clsx(styles.root, classNameWrapper)}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        ref={ref}
        id={id}
        type={type}
        className={clsx(styles.input, className, {
          [styles.error]: error,
        })}
        disabled={disabled}
        {...props}
      />
    </div>
  );
};
