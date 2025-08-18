export type Currency = 'INR' | 'USD' | 'EUR' | 'GBP';

export type TxType = 'ADD' | 'WITHDRAW' | 'EXCHANGE';
export type TxStatus = 'SUCCESS' | 'FAILED';

export interface Transaction {
  id: string;
  date: string; // ISO string
  type: TxType;
  status: TxStatus;
  amountInINR: number; // store canonical in INR
  meta?: Record<string, any>; // e.g., bankName, from→to currency, notes
}

export interface WalletState {
  balanceINR: number;
  transactions: Transaction[];
}
