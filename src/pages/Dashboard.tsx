import React, { useMemo, useState } from 'react';
import { useWallet } from '../context/WalletContext';
import { format, RATES } from '../utils/currency';
import type { Currency } from '../types';
import { Link } from 'react-router-dom';

const currencies: Currency[] = ['INR', 'USD', 'EUR', 'GBP'];

const Dashboard: React.FC = () => {
  const { balanceINR, transactions, addFunds } = useWallet();
  const [quickAdd, setQuickAdd] = useState('');

  const balances = useMemo(() => {
    return currencies.map((c) => ({ c, val: balanceINR * RATES[c] }));
  }, [balanceINR]);

  const recent = useMemo(() => transactions.slice(0, 5), [transactions]);

  return (
    <div className="w-full px-4 py-6">
      <h1 className="mb-4 text-2xl font-semibold">Wallet Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {balances.map(({ c, val }) => (
          <div key={c} className="rounded-2xl border p-4 shadow-sm">
            <div className="text-sm text-gray-500">{c}</div>
            <div className="text-xl font-semibold">{format(val, c)}</div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border p-4">
          <div className="mb-2 text-sm font-medium">Quick Add Funds (INR)</div>
          <div className="flex gap-2">
            <input
              value={quickAdd}
              onChange={(e) => setQuickAdd(e.target.value)}
              placeholder="Amount in INR"
              className="flex-1 rounded-lg border px-3 py-2 outline-none focus:ring"
              inputMode="numeric"
            />
            <button
              onClick={() => {
                const amt = Number(quickAdd);
                if (!Number.isFinite(amt) || amt <= 0) return;
                addFunds(amt);
                setQuickAdd('');
              }}
              className="rounded-lg bg-black px-4 py-2 text-white"
            >Add</button>
          </div>
        </div>

        <Link to="/withdraw" className="rounded-2xl border p-4 hover:shadow">
          <div className="text-lg font-semibold">Withdraw Funds</div>
          <div className="text-sm text-gray-600">Transfer to bank </div>
        </Link>

        <Link to="/exchange" className="rounded-2xl border p-4 hover:shadow">
          <div className="text-lg font-semibold">Exchange Currency</div>
          <div className="text-sm text-gray-600">INR ↔ USD/EUR/GBP</div>
        </Link>
      </div>

      <div className="mt-8">
        <h2 className="mb-2 text-lg font-semibold">Recent Transactions</h2>
        <div className="overflow-hidden rounded-2xl border">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-3 py-2 text-left">Date</th>
                <th className="px-3 py-2 text-left">Type</th>
                <th className="px-3 py-2 text-left">Status</th>
                <th className="px-3 py-2 text-right">Amount (INR)</th>
              </tr>
            </thead>
            <tbody>
              {recent.length === 0 && (
                <tr><td className="px-3 py-4" colSpan={4}>No transactions yet.</td></tr>
              )}
              {recent.map((t) => (
                <tr key={t.id} className="border-t">
                  <td className="px-3 py-2">{new Date(t.date).toLocaleString()}</td>
                  <td className="px-3 py-2">{t.type}</td>
                  <td className="px-3 py-2">{t.status}</td>
                  <td className="px-3 py-2 text-right">{t.amountInINR.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;