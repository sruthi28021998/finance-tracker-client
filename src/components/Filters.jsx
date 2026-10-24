import { ALL_CATEGORIES } from '../utils/format';

export default function Filters({ filters, setFilters }) {
  const set = (k) => (e) => setFilters({ ...filters, [k]: e.target.value });
  const clear = () => setFilters({ type: '', category: '', from: '', to: '' });

  return (
    <div className="panel grid grid-cols-2 gap-3 md:grid-cols-5">
      <select className="input" value={filters.type} onChange={set('type')}>
        <option value="">All types</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>
      <select className="input" value={filters.category} onChange={set('category')}>
        <option value="">All categories</option>
        {ALL_CATEGORIES.map((c) => <option key={c}>{c}</option>)}
      </select>
      <input className="input" type="date" value={filters.from} onChange={set('from')} aria-label="From date" />
      <input className="input" type="date" value={filters.to} onChange={set('to')} aria-label="To date" />
      <button type="button" onClick={clear} className="rounded-md border border-slate-300 px-3 py-2 text-sm hover:bg-slate-50">
        Clear filters
      </button>
    </div>
  );
}