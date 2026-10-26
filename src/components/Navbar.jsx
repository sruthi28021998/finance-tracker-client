import { useAuth } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-2 px-3 py-3 sm:px-4">
        <span className="text-base font-bold sm:text-lg">Finance Tracker</span>
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="hidden max-w-[200px] truncate text-sm text-slate-500 md:inline">{user?.email}</span>
          <button onClick={logout} className="rounded-md border border-slate-300 px-3 py-1.5 text-sm hover:bg-slate-50">
            Log out
          </button>
        </div>
      </div>
    </header>
  );
}