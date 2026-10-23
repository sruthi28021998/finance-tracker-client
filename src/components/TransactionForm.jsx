import { useState } from 'react';
import toast from 'react-hot-toast';
import { CATEGORIES } from '../utils/format';

const today = () => new Date().toISOString().slice(0, 10);

export default function TransactionForm({ onAdd }) {
  const [form, setForm] = useState({ type: 'expense', category: 'Food', amount: '', note: '', date: today() });
  const [saving, setSaving] = useState(false);

  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value });
  const changeType = (e) => {
    const type = e.target.value;
    setForm({ ...form, type, category: CATEGORIES[type][0] });
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!(Number(form.amount) > 0)) return toast.error('Enter an amount greater than 0');
    setSaving(true);
    const ok = await onAdd({ ...form, amount: Number(form.amount) });
    setSaving(false);
    if (ok) setForm({ ...form, amount: '', note: '' });
  };

  return (
    <form onSubmit={submit} className="panel space-y-3">
      <h2 className="font-bold">Add transaction</h2>
      <div className="grid grid-cols-2 gap-3">
        <select className="input" value={form.type} onChange={changeType}>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
        <select className="input" value={form.category} onChange={set('category')}>
          {CATEGORIES[form.type].map((c) => <option key={c}>{c}</option>)}
        </select>
        <input className="input" type="number" min="0" step="0.01" placeholder="Amount" value={form.amount} onChange={set('amount')} />
        <input className="input" type="date" value={form.date} onChange={set('date')} />
      </div>
      <input className="input" placeholder="Note (optional)" value={form.note} onChange={set('note')} />
      <button className="btn w-full" disabled={saving}>{saving ? 'Saving...' : 'Add transaction'}</button>
    </form>
  );
}