import { useRef } from 'react';
import { Controller, type SubmitHandler, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/base-ui/Button/Button';
import { InputBase } from '@/base-ui/InputBase/InputBase';
import { ValidationHint } from '@/base-ui/ValidationHint/ValidationHint';
import {
  type CardFormType,
  cardFormValidationSchema,
  getDigits,
} from '@/utils/helpers/validations';

import styles from './CardForm.module.scss';

const onChangeCardNumber = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 16);

  return digits.replace(/(.{4})/g, '$1 ').trim();
};

const onChangeExpiry = (value: string) => {
  const digits = value.replace(/\D/g, '').slice(0, 4);

  if (digits.length <= 3) return digits;

  return `${digits.slice(0, 2)}/${digits.slice(2)}`;
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
  const expiryRef = useRef<HTMLInputElement>(null);
  const cvvRef = useRef<HTMLInputElement>(null);

  const { t } = useTranslation();

  const {
    handleSubmit,
    setValue,
    formState: { errors, isValid },
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

  // const validationError = (errors.cardNumber?.message ||
  //   errors.expiry?.message ||
  //   errors.cvv?.message ||
  //   errors.cardName?.message) as string;

  const validationErrors = Object.values(errors)
    .map((error) => error?.message)
    .filter(Boolean) as string[];

  const onSubmit: SubmitHandler<CardFormType> = (data) => {
    console.log('valid card:', data);
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
              placeholder='1234 5678 9012 3456'
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
            validationErrors.length > 0 && (
              <div>
                Ошибка валидации:
                <ul style={{ margin: 0, padding: '0px 16px' }}>
                  {validationErrors.map((error, index) => (
                    <li key={index}>{error}</li>
                  ))}
                </ul>
              </div>
            )
          }
        />

        <Button
          variant='dark'
          size='l'
          type='submit'
          disabled={!isValid}
          fullWidth
          iconRight={
            <div className={styles.btnIcons}>
              <img src='/public/img/pay-icons/icon-mir.svg' alt='mir' width={48} height={24} />
              <img src='/public/img/pay-icons/icon-visa.svg' alt='visa' width={48} height={24} />
              <img
                src='/public/img/pay-icons/icon-mastercard.svg'
                alt='ms'
                width={48}
                height={24}
              />
            </div>
          }
        >
          {t('cardForm.payCard')}
        </Button>
      </form>
    </div>
  );
};
