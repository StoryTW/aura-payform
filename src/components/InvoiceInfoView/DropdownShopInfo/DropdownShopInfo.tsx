import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'motion/react';

import { animateHelper } from '@/utils/helpers/animation.helper';
import useToggle from '@/utils/hooks/useToggle';

import styles from './DropdownShopInfo.module.scss';

interface IDropdownShopInfo {
  shopName: string;
  comment: string;
}

export const DropdownShopInfo = ({ shopName, comment }: IDropdownShopInfo) => {
  const { t } = useTranslation();

  const [isShow, handleToggle] = useToggle(false);

  return (
    <div>
      <AnimatePresence mode='wait'>
        {isShow && (
          <motion.div
            variants={animateHelper('dropdown')}
            initial='hide'
            animate='show'
            exit='hide'
            transition={{ duration: 0.3 }}
          >
            <div className={styles.shopName}>{shopName}</div>

            <div className={styles.comment}>{comment}</div>
          </motion.div>
        )}
      </AnimatePresence>

      <button type='button' onClick={handleToggle} className={styles.btn}>
        {isShow ? t('common.hideDetails') : t('common.showDetails')}
      </button>
    </div>
  );
};
