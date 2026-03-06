import { Skeleton } from '@/base-ui/Skeleton/Skeleton';
import { TermsOfService } from '@/components/TermsOfService/TermsOfService';

import styles from './SbpLoader.module.scss';

export const SbpLoader = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.wrapper}>
        <Skeleton variant='text' height={29} width={226} className={styles.titleSkeleton} />

        <Skeleton variant='text' height={220} width={220} className={styles.qrWrapperSkeleton} />

        <Skeleton variant='text' height={24} width={280} className={styles.textInfoSkeleton} />

        <Skeleton
          variant='text'
          height={24}
          width={340}
          className={styles.textDescriptionSkeleton}
        />
      </div>

      <TermsOfService />
    </div>
  );
};
