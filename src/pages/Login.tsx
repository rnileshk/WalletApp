import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login: React.FC = () => {
  const { login } = useAuth();
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [err, setErr] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await login(mobile.trim(), otp.trim());
    if (ok) navigate('/');
    else setErr('Invalid mobile or OTP (hint: OTP is 1234).');
  };

  const handleSendOtp = () => {
    if (mobile.length === 10) {
      alert("OTP Sent! (Use 1234 to login)");
    } else {
      alert("Enter valid 10-digit mobile number.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-black via-[#111] to-black px-4">
      <div className="w-full max-w-xs rounded-lg border border-[#2a2a2a] bg-[#1a1a1a] p-6 shadow-xl">
        <h1 className="text-center text-xl font-bold text-[#f5c542]">
          Wallet App Login
        </h1>
        <p className="mt-1 text-center text-xs text-[#fff]">
          Secure access to your account
        </p>

        <form onSubmit={handleSubmit} className="mt-5 flex flex-col items-center space-y-5">
          
          <div className="w-56">
            <label className="mb-1 block text-xs font-medium text-[#fff]">
              Mobile Number
            </label>
            <div className="flex items-center space-x-2">
              <input
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="10-digit number"
                className="flex-1 rounded-md px-2 py-1.5 text-sm font-medium text-white placeholder-gray-400 focus:border-[#f5c542] focus:ring-1 focus:ring-[#f5c542] h-5"
                inputMode="numeric"
                maxLength={10}
              />
              <button
                type="button"
                onClick={handleSendOtp}
                className="rounded-md bg-gradient-to-r from-[#f5c542] to-[#d4a017] px-3 py-1.5 text-xs font-semibold text-black shadow-md hover:opacity-90"
              >
                Send OTP
              </button>
            </div>
          </div>

          <div className="w-32">
            <label className="mb-1 block text-xs font-medium text-[#fff]">
              OTP
            </label>
            <input
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="1234"
              className="w-full rounded-md px-2 py-1.5 text-base font-semibold tracking-widest text-white placeholder-gray-400 focus:border-[#f5c542] focus:ring-1 focus:ring-[#f5c542] text-center"
              inputMode="numeric"
              maxLength={4}
            />
          </div>

          {err && (
            <p className="text-center text-xs font-medium text-red-500">
              {err}
            </p>
          )}

          <div className="flex justify-center pt-1">
            <button
              type="submit"
              className="w-32 rounded-md bg-gradient-to-r from-[#f5c542] to-[#d4a017] py-1.5 text-sm font-semibold text-black shadow-md hover:opacity-90"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;