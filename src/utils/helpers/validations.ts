import valid from 'card-validator';
import { type TFunction } from 'i18next';
import { z } from 'zod';

export const getDigits = (value: string) => value.replace(/\D/g, '');

export const cardFormValidationSchema = (t: TFunction) =>
  z.object({
    cardNumber: z
      .string()
      .refine((v) => getDigits(v).length === 16, {
        message: t('validation.cardNumberLength'),
      })
      .refine((v) => valid.number(getDigits(v)).isValid, {
        message: t('validation.cardNumberInvalid'),
      }),

    expiry: z
      .string()
      .regex(/^\d{2}\/\d{2}$/, {
        message: t('validation.expiryInvalid'),
      })
      .refine(
        (value) => {
          const [monthStr, yearStr] = value.split('/');

          const month = Number(monthStr);
          const year = Number(yearStr);

          // месяц 1–12
          if (month < 1 || month > 12) return false;

          const now = new Date();

          const currentMonth = now.getMonth() + 1;
          const currentYear = now.getFullYear() % 100;

          // карта в прошлом
          if (year < currentYear) return false;
          if (year === currentYear && month < currentMonth) return false;

          return true;
        },
        {
          message: t('validation.expiryInvalid'),
        },
      ),

    cvv: z.string().regex(/^\d{3}$/, {
      message: t('validation.cvvInvalid'),
    }),

    cardName: z
      .string()
      .optional()
      .or(z.literal(''))
      .refine((v) => !v || /^[A-Za-z\s'-]+$/.test(v), {
        message: t('validation.cardNameLatin'),
      }),
  });

export type CardFormType = z.infer<ReturnType<typeof cardFormValidationSchema>>;
