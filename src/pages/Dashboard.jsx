import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { errMsg } from '../utils/format';
import Navbar from '../components/Navbar';
import TransactionForm from '../components/TransactionForm';
import TransactionList from '../components/TransactionList';

export default function Dashboard() {
  const { user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    try {
      const { data } = await api.get('/transactions');
      setTransactions(data);
    } catch (err) {
      toast.error(errMsg(err));
    } finally {
      setLoading(false);
    }
  }, []);

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

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl space-y-4 px-4 py-6">
        <h1 className="text-2xl font-bold">Hello, {user?.name}</h1>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <TransactionForm onAdd={addTransaction} />
          <div className="lg:col-span-2">
            {loading ? (
              <p className="panel text-sm text-slate-500">Loading transactions...</p>
            ) : (
              <TransactionList transactions={transactions} onDelete={deleteTransaction} />
            )}
          </div>
        </div>
      </main>
    </>
  );
}