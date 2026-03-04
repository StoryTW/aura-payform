import { useTranslation } from 'react-i18next';
import clsx from 'clsx';

import IconClipboardCheck from '@/assets/images/icon-clipboard-check.svg?react';
import IconClipboardCopy from '@/assets/images/icon-clipboard-copy.svg?react';
import { useClipboard } from '@/utils/hooks/useClipboard';

import styles from './DescriptionInfo.module.scss';

interface IDescriptionInfo {
  id: string;
}

export const DescriptionInfo = ({ id }: IDescriptionInfo) => {
  const { t } = useTranslation();

  const { isCopied, handleCopy } = useClipboard();

  return (
    <div className={styles.description}>
      {`${t('common.order')} ${id}`}

      <button
        type='button'
        onClick={() => handleCopy(String(id))}
        className={clsx(styles.btnCopy, {
          [styles.copied]: isCopied,
        })}
      >
        <IconClipboardCopy className={clsx(styles.icon, styles.copy)} />
        <IconClipboardCheck className={clsx(styles.icon, styles.check)} />
      </button>
    </div>
  );
};
