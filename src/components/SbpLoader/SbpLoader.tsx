import { useMediaQuery } from 'react-responsive';

import { Skeleton } from '@/base-ui/Skeleton/Skeleton';
import { TermsOfService } from '@/components/TermsOfService/TermsOfService';
import { QUERY_MOBILE } from '@/utils/helpers/constants';

import styles from './SbpLoader.module.scss';

export const SbpLoader = () => {
  const isMobile = useMediaQuery({ query: QUERY_MOBILE });

  if (isMobile) {
    return (
      <div className={styles.loader}>
        <div className={styles.wrapper}>
          <Skeleton variant='text' height={29} width={226} className={styles.marginBottom32} />

          <Skeleton variant='text' height={21} width={165} className={styles.marginBottom32} />

          <Skeleton variant='text' height={21} width={280} className={styles.marginBottom4} />

          <Skeleton variant='text' height={53} width={340} className={styles.marginBottom24} />
        </div>

        <TermsOfService />
      </div>
    );
  }

  return (
    <div className={styles.loader}>
      <div className={styles.wrapper}>
        <Skeleton variant='text' height={29} width={226} className={styles.marginBottom24} />

        <Skeleton variant='text' height={280} width={280} className={styles.marginBottom24} />

        <Skeleton variant='text' height={24} width={240} className={styles.marginBottom4} />

        <Skeleton variant='text' height={24} width={320} className={styles.marginBottom24} />
      </div>

      <TermsOfService />
    </div>
  );
};
