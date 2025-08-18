const LS_AUTH_KEY = 'wa:isLoggedIn';
const LS_WALLET_KEY = 'wa:wallet';

export const storage = {
  getIsLoggedIn(): boolean {
    return localStorage.getItem(LS_AUTH_KEY) === '1';
  },
  setIsLoggedIn(v: boolean) {
    localStorage.setItem(LS_AUTH_KEY, v ? '1' : '0');
  },
  getWallet<T>(fallback: T): T {
    try {
      const raw = localStorage.getItem(LS_WALLET_KEY);
      return raw ? (JSON.parse(raw) as T) : fallback;
    } catch {
      return fallback;
    }
  },
  setWallet<T>(data: T) {
    localStorage.setItem(LS_WALLET_KEY, JSON.stringify(data));
  },
  clearAll() {
    localStorage.removeItem(LS_AUTH_KEY);
    localStorage.removeItem(LS_WALLET_KEY);
  },
};