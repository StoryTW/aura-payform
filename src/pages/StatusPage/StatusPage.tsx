import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';

import { Alert } from '@/base-ui/Alert/Alert';
import { Button } from '@/base-ui/Button/Button';
import { DescriptionInfo } from '@/components/InvoiceInfoView/DescriptionInfo/DescriptionInfo';
import { QUERY_MOBILE } from '@/utils/helpers/constants';
import { formatAmount } from '@/utils/helpers/formatAmount';

import { LoaderView } from './LoaderView/LoaderView';

import styles from './StatusPage.module.scss';

import srcIconArrow from '/img/icon-arrow-right.svg';
import srcIconRepeat from '/img/icon-repeat.svg';
import srcIconError from '/img/status-icons/icon-status-error.svg';
import srcIconSuccess from '/img/status-icons/icon-status-success.svg';

const status = true;
// const status = false;

export function Component() {
  const { t } = useTranslation();

  const isMobile = useMediaQuery({ query: QUERY_MOBILE });

  const handleReturnToTheStore = () => {
    console.log('return to the store');
  };

  const handleTryAgain = () => {
    console.log('try again');
  };

  if (!status) return <LoaderView />;

  return (
    <div>
      <img
        src={status ? srcIconSuccess : srcIconError}
        alt='icon-status'
        width={80}
        height={80}
        className={styles.img}
      />

      <div className={styles.title}>
        {status ? t('status.paymentSuccess') : t('status.paymentError')}
      </div>

      <div className={styles.description}>{status ? t('status.thanks') : t('status.thanks')}</div>

      <div className={styles.amount}>{formatAmount(1234)}</div>

      <DescriptionInfo id={'5b1d601c-23b5-40db-8f4f-b78f4c37ca05'} noBorder />

      <div className={styles.shopName}>Тестовый магазин</div>

      <div className={styles.comment}>Тестовый комментарий</div>

      <Alert
        variant={status ? 'success' : 'error'}
        text={
          status ? (
            t('alert.orderInfoSent')
          ) : (
            <div className={styles.reasons}>
              {t('alert.possibleReasons')}
              <ul style={{ margin: 0, padding: '0px 16px' }}>
                <li>{t('alert.insufficientFunds')}</li>
                <li>{t('alert.incorrectDetails')}</li>
                <li>{t('alert.blocked')}</li>
                <li>{t('alert.limit')}</li>
              </ul>
            </div>
          )
        }
        className={styles.alert}
      />

      {!status && (
        <Button
          variant='dark'
          size={isMobile ? 's' : 'l'}
          fullWidth
          iconLeft={<img src={srcIconRepeat} width={24} height={24} alt='repeat' />}
          className={styles.btnTryAgain}
          onClick={handleTryAgain}
        >
          {t('status.tryAgain')}
        </Button>
      )}

      <Button
        variant='blue'
        size={isMobile ? 's' : 'l'}
        fullWidth
        iconRight={<img src={srcIconArrow} width={24} height={24} alt='arrow' />}
        onClick={handleReturnToTheStore}
      >
        {t('status.returnToTheStoreWebsite')}
      </Button>
    </div>
  );
}
