export const RATES: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  IDR: 15500,
  JPY: 155,
  AUD: 1.48,
};
export function convert(usdAmount: number, currency: keyof typeof RATES) {
  return usdAmount * RATES[currency];
}
export const CURRENCIES = Object.keys(RATES) as (keyof typeof RATES)[];
