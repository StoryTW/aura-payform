import type { ReactNode } from 'react';

import styles from './ValidationHint.module.scss';

import srcIconError from '/img/icon-error.svg';

interface IValidationHint {
  error: ReactNode;
}

export const ValidationHint = ({ error }: IValidationHint) => {
  return (
    <>
      {Boolean(error) && (
        <div className={styles.root}>
          <div className={styles.wrapper}>
            <img src={srcIconError} alt='icon-error' width={16} height={16} />

            <div className={styles.text}>{error}</div>
          </div>
        </div>
      )}
    </>
  );
};
