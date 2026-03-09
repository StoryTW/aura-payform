import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';
import { useNavigate, useOutletContext, useParams } from 'react-router';

import { Button } from '@/base-ui/Button/Button';
import { DescriptionInfo } from '@/components/InvoiceInfoView/DescriptionInfo/DescriptionInfo';
import { LoaderView } from '@/pages/StatusPage/LoaderView/LoaderView';
import { useInvoiceStatusStore } from '@/store/useInvoiceStatusStore';
import type { InvoiceInfoDto } from '@/types/response/invoice.response';
import { QUERY_MOBILE } from '@/utils/helpers/constants';
import { StateEnum } from '@/utils/helpers/enums';
import { formatAmount } from '@/utils/helpers/formatAmount';

import styles from './StatusPage.module.scss';

import srcIconArrow from '/img/icon-arrow-right.svg';
import srcIconError from '/img/status-icons/icon-status-error.svg';
import srcIconSuccess from '/img/status-icons/icon-status-success.svg';

const statusConfig = {
  [StateEnum.PAID]: {
    icon: srcIconSuccess,
    titleKey: 'status.paymentSuccess',
    descriptionKey: 'status.thanks',
    alertVariant: 'success',
  },
  [StateEnum.EXPIRED]: {
    icon: srcIconError,
    titleKey: 'status.error',
    descriptionKey: 'status.invoiceExpired',
    alertVariant: 'error',
  },
};

export function Component() {
  const { invoiceId } = useParams<ParamsType>();

  const navigate = useNavigate();

  const { t } = useTranslation();

  const isMobile = useMediaQuery({ query: QUERY_MOBILE });

  const invoiceData = useOutletContext<InvoiceInfoDto>();

  const { status, initSubscription } = useInvoiceStatusStore();

  const isWaitPay = invoiceData.state === StateEnum.WAIT_PAY || status === StateEnum.WAIT_PAY;
  const isPaid = invoiceData.state === StateEnum.PAID || status === StateEnum.PAID;
  const isSelectMethod = invoiceData.state === StateEnum.SELECT_METHOD || status === StateEnum.SELECT_METHOD;

  const keyStatus = invoiceData.state || status;
  const config = statusConfig[keyStatus as keyof typeof statusConfig];

  const handleReturnToTheStore = () => {
    if (invoiceData.state === StateEnum.PAID && invoiceData.success_url) {
      window.location.href = invoiceData.success_url;

      return;
    }

    if (invoiceData.state === StateEnum.EXPIRED && invoiceData.fail_url) {
      window.location.href = invoiceData.fail_url;

      return;
    }

    return;
  };

  useEffect(() => {
    if (isSelectMethod) {
      navigate(`/${invoiceId}`, { replace: true });
    }

    if (isPaid) {
      const timer = setTimeout(() => {
        window.location.href = String(invoiceData.success_url);
      }, 5000);

      return () => {
        clearTimeout(timer);
      };
    }

    return;
  }, [invoiceData.state, status]);

  useEffect(() => {
    if (!invoiceId) return;

    if (isWaitPay) {
      const unsubscribe = initSubscription(invoiceId);

      return () => {
        unsubscribe();
      };
    }
  }, [invoiceId, initSubscription]);

  if (isWaitPay) return <LoaderView />;

  return (
    <div>
      <img src={config?.icon} alt='icon-status' width={80} height={80} className={styles.img} />

      <div className={styles.title}>{t(config?.titleKey)}</div>

      <div className={styles.description}>{t(config?.descriptionKey)}</div>

      <div className={styles.amount}>{formatAmount(invoiceData.amount)}</div>

      <div className={styles.commission}>
        {t('common.commission')}
        {' '}
        {formatAmount(invoiceData.commission)}
      </div>

      <DescriptionInfo id={invoiceData.id} noBorder />

      <div className={styles.shopName}>{invoiceData.shop_name}</div>

      <div className={styles.comment}>{invoiceData.comment}</div>

      {/* <Alert
        variant={config?.alertVariant as AlertVariantsType}
        text={
          status
            ? (
              t('alert.orderInfoSent')
            )
            : (
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
      /> */}

      <Button
        variant='blue'
        size={isMobile
          ? 's'
          : 'l'}
        fullWidth
        iconRight={<img src={srcIconArrow} width={24} height={24} alt='arrow' />}
        onClick={handleReturnToTheStore}
      >
        {t('status.returnToTheStoreWebsite')}
      </Button>
    </div>
  );
}
