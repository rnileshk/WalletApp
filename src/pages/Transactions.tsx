import React, { useMemo, useState } from 'react';
import { useWallet } from '../context/WalletContext';
import type { TxType, TxStatus } from '../types';

const Transactions: React.FC = () => {
  const { transactions } = useWallet();
  const [type, setType] = useState<'' | TxType>('');
  const [status, setStatus] = useState<'' | TxStatus>('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const filtered = useMemo(() => {
    return transactions.filter((t) => {
      if (type && t.type !== type) return false;
      if (status && t.status !== status) return false;
      if (from && new Date(t.date) < new Date(from)) return false;
      if (to && new Date(t.date) > new Date(to + 'T23:59:59')) return false;
      return true;
    });
  }, [transactions, type, status, from, to]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <h1 className="mb-4 text-2xl font-semibold">Transactions</h1>
      <div className="mb-4 grid gap-3 rounded-2xl border p-4 sm:grid-cols-2 lg:grid-cols-4">
        <select value={type} onChange={(e) => setType(e.target.value as any)} className="rounded-lg border px-3 py-2">
          <option value="">All Types</option>
          <option value="ADD">Add</option>
          <option value="WITHDRAW">Withdraw</option>
          <option value="EXCHANGE">Exchange</option>
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value as any)} className="rounded-lg border px-3 py-2">
          <option value="">All Status</option>
          <option value="SUCCESS">Success</option>
          <option value="FAILED">Failed</option>
        </select>
        <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} className="rounded-lg border px-3 py-2" />
        <input type="date" value={to} onChange={(e) => setTo(e.target.value)} className="rounded-lg border px-3 py-2" />
      </div>

      <div className="overflow-hidden rounded-2xl border">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-3 py-2 text-left">Date</th>
              <th className="px-3 py-2 text-left">Type</th>
              <th className="px-3 py-2 text-left">Status</th>
              <th className="px-3 py-2 text-left">Meta</th>
              <th className="px-3 py-2 text-right">Amount (INR)</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 && (
              <tr><td className="px-3 py-4" colSpan={5}>No transactions found.</td></tr>
            )}
            {filtered.map((t) => (
              <tr key={t.id} className="border-t">
                <td className="px-3 py-2">{new Date(t.date).toLocaleString()}</td>
                <td className="px-3 py-2">{t.type}</td>
                <td className="px-3 py-2">{t.status}</td>
                <td className="px-3 py-2">{t.meta ? JSON.stringify(t.meta) : '-'}</td>
                <td className="px-3 py-2 text-right">{t.amountInINR.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* TODO: Add Export to CSV/Excel/PDF using xlsx/jspdf */}
      <div className="mt-3 text-sm text-gray-600">Exports coming next: CSV/Excel/PDF.</div>
    </div>
  );
};

export default Transactions;
