import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';

import { animateHelper } from '@/utils/helpers/animation.helper';

import styles from './ValidationHint.module.scss';

import srcIconError from '/img/icon-error.svg';

interface IValidationHint {
  error: ReactNode;
}

export const ValidationHint = ({ error }: IValidationHint) => {
  return (
    <AnimatePresence mode='wait'>
      {Boolean(error) && (
        <motion.div
          className={styles.root}
          variants={animateHelper('validationHint')}
          initial='hide'
          animate='show'
          exit='hide'
          transition={{ duration: 0.2 }}
        >
          <div className={styles.wrapper}>
            <img src={srcIconError} alt='icon-error' width={16} height={16} />

            <div className={styles.text}>{error}</div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
