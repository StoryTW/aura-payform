import { useRef } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/base-ui/Button/Button';
import { InputBase } from '@/base-ui/InputBase/InputBase';
import { ValidationHint } from '@/base-ui/ValidationHint/ValidationHint';
import { IconsPay } from '@/components/IconsPay/IconsPay';
import { useInvoiceProcess } from '@/query/hooks/useInvoiceProcess';
import { PaymentDataStateEnum } from '@/utils/helpers/enums';
import {
  type CardFormType,
  cardFormValidationSchema,
  getDigits,
} from '@/utils/helpers/validations';
import { useBrowserData } from '@/utils/hooks/useBrowserData';

import styles from './CardForm.module.scss';

const onChangeCardNumber = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 16);

  return digits.replace(/(.{4})/g, '$1 ').trim();
};

const onChangeExpiry = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 4);

  if (digits.length === 0) return '';

  if (digits.length <= 2) return digits;

  return digits.slice(0, 2) + '/' + digits.slice(2);
};

const onChnageCVV = (value: string) => {
  return value.replace(/\D/g, '').slice(0, 3);
};

const onChangeCardName = (value: string) => {
  return value
    .replace(/[^A-Za-z\s'-]/g, '')
    .toUpperCase()
    .replace(/\s{2,}/g, ' ');
};

export const CardForm = () => {
  const { invoiceId, method } = useParams<ParamsType>();

  const expiryRef = useRef<HTMLInputElement>(null);
  const cvvRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const { t } = useTranslation();

  const browserData = useBrowserData();

  const {
    handleSubmit,
    setValue,
    formState: { errors, isValid, isSubmitting },
    control,
  } = useForm<CardFormType>({
    resolver: zodResolver(cardFormValidationSchema(t)),
    mode: 'onChange',
    defaultValues: {
      cardNumber: '',
      expiry: '',
      cvv: '',
      cardName: '',
    },
  });

  const {
    mutate,
    isPending,
    error: errorProcess,
    isError: isErrorProcess,
  } = useInvoiceProcess(String(invoiceId), {
    onSuccess: (data) => {
      const redirectLink = data?.payment?.payment_data?.redirect_link;
      const isNeed3ds = data?.payment?.payment_data?.state === PaymentDataStateEnum.NEED_3DS;
      const isCompleted = data?.payment?.payment_data?.state === PaymentDataStateEnum.COMPLETED;
      const isError = data?.payment?.payment_data?.state === PaymentDataStateEnum.ERROR;

      if (redirectLink && isNeed3ds) {
        window.location.href = String(data?.payment?.payment_data?.redirect_link);

        return;
      }

      if (isCompleted || isError) {
        navigate('status', { replace: true });

        return;
      }

      return;
    },
  });

  const validationErrors = Object.values(errors)
    .map((error) => error?.message)
    .filter(Boolean) as string[];

  const isDisabledButton = !isValid || isPending || isSubmitting;

  const onSubmit: SubmitHandler<CardFormType> = (data) => {
    const cardNumberClean = data.cardNumber.replace(/\s/g, '');
    const [expiryMonthStr, expiryYear] = data.expiry.split('/');

    const expiryMonth = parseInt(expiryMonthStr, 10);

    const cardData = {
      card_number: cardNumberClean,
      cvv: data.cvv,
      expiry_month: String(expiryMonth),
      expiry_year: expiryYear,
      card_holder: data.cardName,
    };

    if (invoiceId && method) {
      mutate({
        service_id: method,
        card_data: { ...cardData },
        browser_data: { ...browserData },
      });
    }
  };

  return (
    <div className={styles.root}>
      <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name='cardNumber'
          control={control}
          render={({ field }) => (
            <InputBase
              {...field}
              id='cardNumber'
              label={t('cardForm.cardNumber')}
              placeholder='1234 1234 1234 1234'
              autoComplete='cc-number'
              inputMode='numeric'
              maxLength={19}
              classNameWrapper={styles.input}
              onChange={(e) => {
                const formatted = onChangeCardNumber(e.target.value);

                field.onChange(formatted);

                // autofocus на expiry
                if (getDigits(formatted).length === 16) {
                  expiryRef.current?.focus();
                }
              }}
              onPaste={(e) => {
                e.preventDefault();

                const pasted = e.clipboardData.getData('text');

                const formatted = onChangeCardNumber(pasted);

                setValue('cardNumber', formatted, {
                  shouldValidate: true,
                });

                if (getDigits(formatted).length === 16) {
                  expiryRef.current?.focus();
                }
              }}
              error={errors.cardNumber?.message}
            />
          )}
        />

        <div className={styles.expireAndCvvWrapper}>
          <Controller
            name='expiry'
            control={control}
            render={({ field }) => (
              <InputBase
                {...field}
                ref={expiryRef}
                id='expiry'
                label={t('cardForm.expireDate')}
                inputMode='numeric'
                autoComplete='cc-exp'
                maxLength={5}
                placeholder={t('cardForm.MMYY')}
                onChange={(e) => {
                  const formatted = onChangeExpiry(e.target.value);

                  field.onChange(formatted);

                  if (formatted.length === 5) {
                    cvvRef.current?.focus();
                  }
                }}
                onPaste={(e) => {
                  e.preventDefault();

                  const formatted = onChangeExpiry(e.clipboardData.getData('text'));

                  setValue('expiry', formatted, {
                    shouldValidate: true,
                  });

                  if (formatted.length === 5) {
                    cvvRef.current?.focus();
                  }
                }}
                error={errors.expiry?.message}
              />
            )}
          />

          <Controller
            name='cvv'
            control={control}
            render={({ field }) => (
              <InputBase
                {...field}
                ref={cvvRef}
                id='cvv'
                label='CVV / CVC'
                type='password'
                inputMode='numeric'
                autoComplete='cc-csc'
                maxLength={3}
                placeholder='123'
                onChange={(e) => field.onChange(onChnageCVV(e.target.value))}
                onPaste={(e) => {
                  e.preventDefault();

                  setValue('cvv', onChnageCVV(e.clipboardData.getData('text')), {
                    shouldValidate: true,
                  });
                }}
                error={errors.cvv?.message}
              />
            )}
          />
        </div>

        <Controller
          name='cardName'
          control={control}
          render={({ field }) => (
            <InputBase
              {...field}
              id='cardName'
              label={t('cardForm.cardHolder')}
              placeholder={t('cardForm.cardHolderName')}
              autoComplete='cc-name'
              autoCapitalize='characters'
              classNameWrapper={styles.input}
              onChange={(e) => field.onChange(onChangeCardName(e.target.value))}
              onPaste={(e) => {
                e.preventDefault();

                const pasted = e.clipboardData.getData('text');

                field.onChange(onChangeCardName(pasted));
              }}
            />
          )}
        />

        <ValidationHint
          error={
            (validationErrors.length > 0 && (
              <div>
                Ошибки:
                <ul style={{ margin: 0, padding: '0px 16px' }}>
                  {validationErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            ))
            || (isErrorProcess && `Ошибка: ${errorProcess?.message}`)
          }
        />

        <Button
          variant='dark'
          size='l'
          type='submit'
          isLoading={isPending}
          disabled={isDisabledButton}
          fullWidth
          iconRight={<IconsPay type='card' />}
        >
          {t('cardForm.payCard')}
        </Button>
      </form>
    </div>
  );
};
