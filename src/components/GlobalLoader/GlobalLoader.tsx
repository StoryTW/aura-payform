import styles from './GlobalLoader.module.scss';

import srcIconLoader from '/img/icon-loader.svg';

export const GlobalLoader = () => {
  return (
    <div className={styles.loader}>
      <img src={srcIconLoader} alt='loader' width={80} height={80} />
    </div>
  );
};
