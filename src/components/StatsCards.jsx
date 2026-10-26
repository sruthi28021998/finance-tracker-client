import { money } from '../utils/format';

export default function StatsCards({ transactions }) {
  const income = transactions.filter((t) => t.type === 'income').reduce((s, t) => s + t.amount, 0);
  const expense = transactions.filter((t) => t.type === 'expense').reduce((s, t) => s + t.amount, 0);
  const balance = income - expense;

  const cards = [
    { label: 'Income', value: income, color: 'text-income' },
    { label: 'Expenses', value: expense, color: 'text-expense' },
    { label: 'Balance', value: balance, color: balance >= 0 ? 'text-ink' : 'text-expense' },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {cards.map((c) => (
        <div key={c.label} className="panel">
          <p className="text-sm text-slate-500">{c.label}</p>
          <p className={`mt-1 text-2xl font-bold ${c.color}`}>{money(c.value)}</p>
        </div>
      ))}
    </div>
  );
}