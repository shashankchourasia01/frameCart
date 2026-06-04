import { useState } from 'react';
import { useAdminAuth } from '../../hooks/useAdminAuth';

export function AdminLoginPage() {
  const { login } = useAdminAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await login(email, password);
    setLoading(false);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-50 px-4">
      <form
        onSubmit={(e) => void handleSubmit(e)}
        className="w-full max-w-md rounded-xl bg-white p-8 shadow-xl"
      >
        <h1 className="font-display text-2xl text-brand-maroon">Admin Login</h1>
        <p className="mt-2 text-sm text-brand-charcoal-light">FrameCraft management</p>
        <label className="mt-6 block text-sm font-medium">Email</label>
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mt-1 w-full rounded-input border p-3"
        />
        <label className="mt-4 block text-sm font-medium">Password</label>
        <input
          type="password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 w-full rounded-input border p-3"
        />
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-btn bg-brand-maroon py-3 text-white disabled:opacity-50"
        >
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}
