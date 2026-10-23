import { money, shortDate } from '../utils/format';

export default function TransactionList({ transactions, onDelete }) {
  if (!transactions.length) {
    return <p className="panel text-sm text-slate-500">No transactions yet. Add your first one.</p>;
  }

  return (
    <ul className="panel divide-y divide-slate-100 p-0">
      {transactions.map((t) => (
        <li key={t._id} className="flex items-center justify-between gap-3 px-4 py-3">
          <div className="min-w-0">
            <p className="truncate font-medium">{t.category}{t.note ? ` · ${t.note}` : ''}</p>
            <p className="text-xs text-slate-500">{shortDate(t.date)}</p>
          </div>
          <div className="flex items-center gap-3">
            <span className={`font-bold ${t.type === 'income' ? 'text-income' : 'text-expense'}`}>
              {t.type === 'income' ? '+' : '-'}{money(t.amount)}
            </span>
            <button onClick={() => onDelete(t._id)} aria-label="Delete transaction" className="text-slate-400 hover:text-expense">
              ✕
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}