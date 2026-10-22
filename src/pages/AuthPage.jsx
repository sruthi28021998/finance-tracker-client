import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import { errMsg } from '../utils/format';

export default function AuthPage({ mode }) {
  const isLogin = mode === 'login';
  const { user, login, register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);

  if (user) return <Navigate to="/" replace />;

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    if (!isLogin && !form.name.trim()) return toast.error('Enter your name');
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return toast.error('Enter a valid email');
    if (form.password.length < 6) return toast.error('Password needs at least 6 characters');
    setLoading(true);
    try {
      if (isLogin) await login(form.email, form.password);
      else await register(form.name, form.email, form.password);
      navigate('/');
    } catch (err) {
      toast.error(errMsg(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <form onSubmit={submit} className="panel w-full max-w-sm space-y-4 p-6">
        <h1 className="text-2xl font-bold">{isLogin ? 'Log in' : 'Create your account'}</h1>
        {!isLogin && <input className="input" placeholder="Name" value={form.name} onChange={set('name')} />}
        <input className="input" type="email" placeholder="Email" value={form.email} onChange={set('email')} />
        <input className="input" type="password" placeholder="Password" value={form.password} onChange={set('password')} />
        <button className="btn w-full" disabled={loading}>
          {loading ? 'Please wait...' : isLogin ? 'Log in' : 'Sign up'}
        </button>
        <p className="text-center text-sm text-slate-500">
          {isLogin ? 'No account yet?' : 'Already registered?'}{' '}
          <Link className="font-medium text-income" to={isLogin ? '/register' : '/login'}>
            {isLogin ? 'Sign up' : 'Log in'}
          </Link>
        </p>
      </form>
    </div>
  );
}