import React, { useMemo, useState } from 'react';
import type { Currency } from '../types';
import { RATES, convert, format } from '../utils/currency';
import { useWallet } from '../context/WalletContext';

const currencies: Currency[] = ['INR', 'USD', 'EUR', 'GBP'];

const Exchange: React.FC = () => {
  const { exchange } = useWallet();
  const [from, setFrom] = useState<Currency>('INR');
  const [to, setTo] = useState<Currency>('USD');
  const [amount, setAmount] = useState('');

  const preview = useMemo(() => {
    const a = Number(amount);
    if (!Number.isFinite(a) || a <= 0) return '';
    const out = convert(a, from, to);
    return `${format(a, from)} ≈ ${format(out, to)}`;
  }, [amount, from, to]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const a = Number(amount);
    if (!Number.isFinite(a) || a <= 0) return;
    // For canonical INR store, convert input to INR and log
    const amtINR = from === 'INR' ? a : a / RATES[from];
    exchange(from, to, amtINR);
    setAmount('');
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-6">
      <h1 className="mb-4 text-2xl font-semibold">Exchange Currency</h1>
      <form onSubmit={submit} className="space-y-3 rounded-2xl border p-4">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="mb-1 block text-sm">From</label>
            <select value={from} onChange={(e) => setFrom(e.target.value as Currency)} className="w-full rounded-lg border px-3 py-2">
              {currencies.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-sm">To</label>
            <select value={to} onChange={(e) => setTo(e.target.value as Currency)} className="w-full rounded-lg border px-3 py-2">
              {currencies.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <div>
          <label className="mb-1 block text-sm">Amount</label>
          <input value={amount} onChange={(e) => setAmount(e.target.value)} inputMode="numeric" className="w-full rounded-lg border px-3 py-2" />
        </div>
        {preview && <div className="text-sm text-gray-700">{preview}</div>}
        <button type="submit" className="rounded-lg bg-black px-4 py-2 text-white">Exchange</button>
      </form>
      <p className="mt-3 text-sm text-gray-600">Note: Wallet stores canonical INR. Exchange logs a transaction for history.</p>
    </div>
  );
};

export default Exchange;