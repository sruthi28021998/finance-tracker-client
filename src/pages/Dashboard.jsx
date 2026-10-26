import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { errMsg } from '../utils/format';
import Navbar from '../components/Navbar';
import StatsCards from '../components/StatsCards';
import Charts from '../components/Charts';
import Filters from '../components/Filters';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';

const EMPTY = { type: '', category: '', from: '', to: '' };
const toParams = (f) => Object.fromEntries(Object.entries(f).filter(([, v]) => v));

export default function Dashboard() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [filters, setFilters] = useState(EMPTY);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const load = useCallback(async () => {
    try {
      const { data } = await api.get('/transactions', { params: toParams(filters) });
      setTransactions(data);
    } catch (err) {
      toast.error(errMsg(err));
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => { load(); }, [load]);

  const addTransaction = async (payload) => {
    try {
      await api.post('/transactions', payload);
      toast.success('Transaction added');
      await load();
      return true;
    } catch (err) {
      toast.error(errMsg(err));
      return false;
    }
  };

  const deleteTransaction = async (id) => {
    const previous = transactions;
    setTransactions(previous.filter((t) => t._id !== id));
    try {
      await api.delete(`/transactions/${id}`);
      toast.success('Transaction deleted');
    } catch (err) {
      setTransactions(previous);
      toast.error(errMsg(err));
    }
  };

  const visible = showAll ? transactions : transactions.slice(0, 5);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl space-y-4 px-4 py-6">
        <h1 className="text-2xl font-bold">Hello, {user?.name}</h1>
        <StatsCards transactions={transactions} />
        <Charts transactions={transactions} />

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <TransactionForm onAdd={addTransaction} />
          <div className="space-y-4 lg:col-span-2">
            <Filters filters={filters} setFilters={setFilters} />
            <div className="flex items-center justify-between">
              <h2 className="font-bold">{showAll ? 'All transactions' : 'Recent transactions'}</h2>
              {transactions.length > 5 && (
                <button onClick={() => setShowAll(!showAll)} className="text-sm font-medium text-income">
                  {showAll ? 'Show recent' : `View all (${transactions.length})`}
                </button>
              )}
            </div>
            {loading ? (
              <div className="panel flex items-center gap-3 text-sm text-slate-500">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-ink" />
                Loading transactions...
              </div>
            ) : (
              <TransactionList transactions={visible} onDelete={deleteTransaction} />
            )}
          </div>
        </div>
      </main>
    </>
  );
}