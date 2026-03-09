import { useTranslation } from 'react-i18next';
import { useMediaQuery } from 'react-responsive';

import { ViewWrapper } from '@/components/ViewWrapper/ViewWrapper';
import type { InvoiceInfoDto } from '@/types/response/invoice.response';
import { QUERY_TABLET } from '@/utils/helpers/constants';
import { formatAmount } from '@/utils/helpers/formatAmount';

import { DescriptionInfo } from './DescriptionInfo/DescriptionInfo';
import { DropdownShopInfo } from './DropdownShopInfo/DropdownShopInfo';

import styles from './InvoiceInfoView.module.scss';

interface IInvoiceInfoView {
  invoiceData: InvoiceInfoDto;
}

export const InvoiceInfoView = ({ invoiceData }: IInvoiceInfoView) => {
  const { t } = useTranslation();

  const isTablet = useMediaQuery({ query: QUERY_TABLET });

  return (
    <ViewWrapper>
      <div className={styles.title}>{t('common.paymentDetails')}</div>

      <div className={styles.amount}>{formatAmount(invoiceData.amount)}</div>

      <div className={styles.commission}>
        {t('common.commission')}
        {' '}
        {formatAmount(invoiceData.commission)}
      </div>

      <DescriptionInfo id={invoiceData.id} />

      {isTablet
        ? (
          <DropdownShopInfo shopName={invoiceData.shop_name} comment={invoiceData.comment} />
        )
        : (
          <>
            <div className={styles.shopName}>{invoiceData.shop_name}</div>

            <div className={styles.comment}>{invoiceData.comment}</div>
          </>
        )}
    </ViewWrapper>
  );
};
