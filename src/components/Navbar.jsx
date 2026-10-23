import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <span className="text-lg font-bold">Finance Tracker</span>
        <div className="flex items-center gap-3">
          <span className="hidden text-sm text-slate-500 sm:inline">{user?.email}</span>
          <button onClick={logout} className="rounded-md border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50">
            Log out
          </button>
        </div>
      </div>
    </header>
  );
}