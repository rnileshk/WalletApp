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
    <div className="min-h-screen w-full px-4 py-6 text-white">
      <h1 className="mb-6 text-center text-2xl font-bold text-[#f5c542]">
        Wallet Dashboard
      </h1>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {balances.map(({ c, val }) => (
          <div
            key={c}
            className="rounded-2xl border border-[#2a2a2a] p-4 shadow-lg hover:shadow-[#f5c54233] transition"
          >
            <div className="text-sm text-gray-400">{c}</div>
            <div className="text-xl font-semibold text-[black]">
              {format(val, c)}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-[#2a2a2a] p-4 shadow-lg">
          <div className="mb-2 text-sm font-medium text-gray-300">
            Quick Add Funds (INR)
          </div>
          <div className="flex gap-2">
            <input
              value={quickAdd}
              onChange={(e) => setQuickAdd(e.target.value)}
              placeholder="Amount in INR"
              className="flex-1 rounded-lg border border-gray-600 px-3 py-2 text-sm text-white placeholder-gray-400 focus:border-[#f5c542] focus:ring-1 focus:ring-[#f5c542] outline-none"
              inputMode="numeric"
            />
            <button
              onClick={() => {
                const amt = Number(quickAdd);
                if (!Number.isFinite(amt) || amt <= 0) return;
                addFunds(amt);
                setQuickAdd('');
              }}
              className="rounded-lg px-4 py-2 text-sm font-semibold text-black shadow-md hover:opacity-90"
            >
              Add
            </button>
          </div>
        </div>

        <Link
          to="/withdraw"
          className="rounded-2xl border border-[#2a2a2a] p-4 shadow-lg hover:shadow-[#f5c54233] transition"
        >
          <div className="text-lg font-semibold text-[#f5c542]">
            Withdraw Funds
          </div>
          <div className="text-sm text-gray-400">Transfer to bank</div>
        </Link>

        <Link
          to="/exchange"
          className="rounded-2xl border border-[#2a2a2a] p-4 shadow-lg hover:shadow-[#f5c54233] transition"
        >
          <div className="text-lg font-semibold text-[#f5c542]">
            Exchange Currency
          </div>
          <div className="text-sm text-gray-400">INR ↔ USD/EUR/GBP</div>
        </Link>
      </div>

      <div className="mt-10">
        <h2 className="mb-3 text-lg font-semibold text-[#f5c542]">
          Recent Transactions
        </h2>
        <div className="overflow-hidden rounded-2xl border border-[#2a2a2a]">
          <table className="min-w-full text-sm">
            <thead className="text-[black]">
              <tr>
                <th className="px-3 py-2 text-left">Date</th>
                <th className="px-3 py-2 text-left">Type</th>
                <th className="px-3 py-2 text-left">Status</th>
                <th className="px-3 py-2 text-right">Amount (INR)</th>
              </tr>
            </thead>
            <tbody>
              {recent.length === 0 && (
                <tr>
                  <td className="px-3 py-4 text-center text-[black]" colSpan={4}>
                    No transactions yet.
                  </td>
                </tr>
              )}
              {recent.map((t, i) => (
                <tr
                  key={t.id}
                  className={i % 2 === 0 ? "bg-[#fff]" : ""}
                >
                  <td className="px-3 py-2">{new Date(t.date).toLocaleString()}</td>
                  <td className="px-3 py-2">{t.type}</td>
                  <td className="px-3 py-2">{t.status}</td>
                  <td className="px-3 py-2 text-right text-[#f5c542]">
                    {t.amountInINR.toFixed(2)}
                  </td>
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