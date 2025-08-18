import React, { createContext, useContext, useEffect, useMemo, useReducer } from 'react';
import type { Transaction, WalletState } from '../types';
import { storage } from '../utils/storage';

const initialState: WalletState = {
  balanceINR: 1000,
  transactions: [],
};

type Action =
  | { type: 'ADD_FUNDS'; amountINR: number }
  | { type: 'WITHDRAW_FUNDS'; amountINR: number; meta?: Record<string, any> }
  | { type: 'EXCHANGE'; from: string; to: string; amountINR: number }
  | { type: 'LOAD'; state: WalletState };

function createTransaction(p: Omit<Transaction, 'id' | 'date' | 'status'> & { status?: Transaction['status'] }): Transaction {
  return {
    id: crypto.randomUUID(),
    date: new Date().toISOString(),
    status: p.status ?? 'SUCCESS',
    ...p,
  } as Transaction;
}

function reducer(state: WalletState, action: Action): WalletState {
  switch (action.type) {
    case 'LOAD':
      return action.state;
    case 'ADD_FUNDS': {
      const t = createTransaction({ type: 'ADD', amountInINR: action.amountINR });
      return { ...state, balanceINR: state.balanceINR + action.amountINR, transactions: [t, ...state.transactions].slice(0, 1000) };
    }
    case 'WITHDRAW_FUNDS': {
      const ok = state.balanceINR >= action.amountINR;
      const t = createTransaction({ type: 'WITHDRAW', amountInINR: action.amountINR, status: ok ? 'SUCCESS' : 'FAILED', meta: action.meta });
      return {
        ...state,
        balanceINR: ok ? state.balanceINR - action.amountINR : state.balanceINR,
        transactions: [t, ...state.transactions].slice(0, 1000),
      };
    }
    case 'EXCHANGE': {
      // Exchange is a no-op for INRs stored canonically, but we still log it
      const t = createTransaction({ type: 'EXCHANGE', amountInINR: action.amountINR, meta: { from: action.from, to: action.to } });
      return { ...state, transactions: [t, ...state.transactions].slice(0, 1000) };
    }
    default:
      return state;
  }
}

interface WalletContextValue extends WalletState {
  addFunds: (amountINR: number) => void;
  withdraw: (amountINR: number, meta?: Record<string, any>) => void;
  exchange: (from: string, to: string, amountINR: number) => void;
}

const WalletContext = createContext<WalletContextValue | null>(null);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // load from LS once
  useEffect(() => {
    const saved = storage.getWallet<WalletState>(initialState);
    dispatch({ type: 'LOAD', state: saved });
  }, []);

  // persist on change
  useEffect(() => {
    storage.setWallet(state);
  }, [state]);

  const value = useMemo(
    () => ({
      ...state,
      addFunds: (amountINR: number) => dispatch({ type: 'ADD_FUNDS', amountINR }),
      withdraw: (amountINR: number, meta?: Record<string, any>) => dispatch({ type: 'WITHDRAW_FUNDS', amountINR, meta }),
      exchange: (from: string, to: string, amountINR: number) => dispatch({ type: 'EXCHANGE', from, to, amountINR }),
    }),
    [state]
  );

  return <WalletContext.Provider value={value}>{children}</WalletContext.Provider>;
};

export const useWallet = () => {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error('useWallet must be used within WalletProvider');
  return ctx;
};