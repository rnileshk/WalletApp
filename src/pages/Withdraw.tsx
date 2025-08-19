import React, { useState } from 'react';
import { useWallet } from '../context/WalletContext';

const Withdraw: React.FC = () => {
  const { withdraw } = useWallet();
  const [bankName, setBankName] = useState('');
  const [account, setAccount] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [amount, setAmount] = useState('');
  const [msg, setMsg] = useState('');

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const amt = Number(amount);
    if (!Number.isFinite(amt) || amt <= 0) return setMsg('Enter a valid amount');
    withdraw(amt, { bankName, account, ifsc });
    setMsg('Withdrawal submitted. If balance was enough, it succeeded.');
    setAmount('');
  };

  return (
    <div className="mx-auto max-w-xl px-4 py-6">
      <h1 className="mb-4 text-2xl font-semibold">Withdraw Funds</h1>
      <form onSubmit={onSubmit} className="space-y-4 rounded-2xl p-4">
        
        <div>
          <label className="mb-1 block text-sm">Bank Name</label>
          <input 
            value={bankName} 
            onChange={(e) => setBankName(e.target.value)} 
            className="w-full rounded-lg border px-3 h-14"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm">Account Number</label>
          <input 
            value={account} 
            onChange={(e) => setAccount(e.target.value)} 
            className="w-full rounded-lg border px-3 h-14"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm">IFSC Code</label>
          <input 
            value={ifsc} 
            onChange={(e) => setIfsc(e.target.value)} 
            className="w-full rounded-lg border px-3 h-14"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm">Amount (INR)</label>
          <input 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            inputMode="numeric" 
            className="w-full rounded-lg border px-3 h-14"
          />
        </div>

        {msg && <div className="text-sm text-gray-600">{msg}</div>}

        <button 
          type="submit" 
          className="w-full rounded-lg bg-black text-white h-14 text-lg font-medium"
        >
          Withdraw
        </button>
      </form>
    </div>
  );
};

export default Withdraw;
