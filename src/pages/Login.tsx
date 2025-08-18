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

  return (
    <div className="grid min-h-screen place-items-center bg-gray-50 px-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-[1rem] rounded-2xl bg-white p-6 shadow">
        <h1 className="text-center text-2xl font-semibold">Verify your mobile number</h1>
        <div className="mt-[1rem]">
          <label className="mb-1 block text-sm">Mobile Number</label>
          <input
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
            placeholder="10-digit number"
            className="w-full rounded-lg border px-3 text-base outline-none focus:ring"
            inputMode="numeric"
            maxLength={10}
          />
        </div>
        <div className="mt-[1rem]">
          <label className="mb-1 block text-sm">OTP</label>
          <input
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter 1234"
            className="w-full rounded-lg border px-3 text-base outline-none focus:ring"
            inputMode="numeric"
            maxLength={4}
          />
        </div>
        {err && <p className="mt-[1rem] text-sm text-red-600">{err}</p>}
        <button type="submit" className="mt-[1rem] w-full rounded-lg bg-black px-4 text-base text-white">Login</button>
      </form>
    </div>
  );
};

export default Login;