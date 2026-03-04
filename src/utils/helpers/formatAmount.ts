export const formatAmount = (
  price: number,
  currency = 'RUB',
  minimumFraction = 0,
  symbol = '.',
) => {
  return new Intl.NumberFormat('ru-RU', {
    style: 'currency',
    currency,
    minimumFractionDigits: minimumFraction,
    maximumFractionDigits: minimumFraction,
  })
    .format(price)
    .replace(',', symbol);
};
