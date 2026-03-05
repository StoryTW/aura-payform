import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useOutletContext } from 'react-router';

import { Button } from '@/base-ui/Button/Button';
import { IconsPay } from '@/components/IconsPay/IconsPay';
import { TermsOfService } from '@/components/TermsOfService/TermsOfService';
import type { InvoiceInfoDto } from '@/types/response/invoice.response';
import { ServiceEnum, type ServiceEnumType, StateEnum } from '@/utils/helpers/enums';

import styles from './SelectPaymentMethodPage.module.scss';

export const SelectPaymentMethodPage = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();

  const invoiceData = useOutletContext<InvoiceInfoDto>();

  const availableMethods = [
    {
      id: ServiceEnum.CARD,
      label: t('cardForm.payCard'),
      icon: 'card' as const,
    },
    {
      id: ServiceEnum.SBP,
      label: t('sbpForm.paySbp'),
      icon: 'sbp' as const,
    },
  ].filter(({ id }) => invoiceData?.methods?.some((method) => method.service_id === id));

  const handleNavigate = (service: ServiceEnumType) => {
    if (service === ServiceEnum.CARD) {
      navigate(service);
      return;
    }

    return navigate(service, { replace: true });
  };

  useEffect(() => {
    if (invoiceData.state === StateEnum.PAID || invoiceData.state === StateEnum.EXPIRED) {
      navigate('status', { replace: true });
    }
  }, []);

  return (
    <div className={styles.page}>
      <div>
        <div className={styles.title}>{t('common.selectPaymentMethod')}</div>

        <div className={styles.methods}>
          {availableMethods.map((method, index) => (
            <div key={method.id}>
              <Button
                variant='dark'
                size='l'
                fullWidth
                onClick={() => handleNavigate(method.id)}
                iconRight={<IconsPay type={method.icon} />}
              >
                {method.label}
              </Button>

              {index < availableMethods.length - 1 && (
                <div className={styles.gapText}>{t('common.or')}</div>
              )}
            </div>
          ))}
        </div>
      </div>

      <TermsOfService />
    </div>
  );
};
