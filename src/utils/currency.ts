import type { Currency } from '../types';

export const RATES: Record<Currency, number> = {
  INR: 1,
  USD: 0.012,
  EUR: 0.011,
  GBP: 0.009,
};

export function convert(amount: number, from: Currency, to: Currency) {
  // Convert via INR as base
  const inINR = amount / RATES[from];
  return inINR * RATES[to];
}

export function format(amount: number, currency: Currency) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency }).format(amount);
}