import { useAuth } from '../context/AuthContext';

export default function Dashboard() {
  const { user, logout } = useAuth();
  return (
    <div className="mx-auto max-w-3xl space-y-4 p-6">
      <h1 className="text-2xl font-bold">Hello, {user?.name}</h1>
      <button onClick={logout} className="btn">Log out</button>
    </div>
  );
}