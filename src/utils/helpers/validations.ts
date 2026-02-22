import valid from 'card-validator';
import { z } from 'zod';

export const getDigits = (value: string) => value.replace(/\D/g, '');

export const cardFormValidationSchema = z.object({
  cardNumber: z
    .string()
    .refine((v) => getDigits(v).length === 16, 'Введите 16 цифр')
    .refine((v) => valid.number(getDigits(v)).isValid, 'Неверный номер карты'),

  expiry: z.string().regex(/^\d{2}\/\d{2}$/, 'Неверный срок'),

  cvv: z.string().regex(/^\d{3}$/, 'CVV должен содержать 3 цифры'),

  cardName: z
    .string()
    .optional()
    .or(z.literal(''))
    .refine((v) => !v || /^[A-Za-z\s'-]+$/.test(v), 'Use Latin characters only'),
});

export type CardFormType = z.infer<typeof cardFormValidationSchema>;
