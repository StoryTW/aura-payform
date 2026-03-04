import styles from './IconsPay.module.scss';

import srcIconMastercard from '/img/pay-icons/icon-mastercard.svg';
import srcIconMir from '/img/pay-icons/icon-mir.svg';
import srcIconSbp from '/img/pay-icons/icon-sbp-white.svg';
import srcIconVisa from '/img/pay-icons/icon-visa.svg';

interface IIconsPay {
  type: 'card' | 'sbp';
}

export const IconsPay = ({ type }: IIconsPay) => {
  if (type === 'card') {
    return (
      <div className={styles.iconsWrapper}>
        <img src={srcIconMir} alt='mir' className={styles.iconCard} />
        <img src={srcIconVisa} alt='visa' className={styles.iconCard} />
        <img src={srcIconMastercard} alt='ms' className={styles.iconCard} />
      </div>
    );
  }

  if (type === 'sbp') {
    return <img src={srcIconSbp} alt='sbp' className={styles.iconSbp} />;
  }

  return null;
};
