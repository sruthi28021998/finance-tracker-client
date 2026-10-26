import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
} from 'recharts';

const COLORS = ['#0f8a6a', '#d1495b', '#edae49', '#00798c', '#30638e', '#8d6a9f', '#6b705c', '#e07a5f'];

export default function Charts({ transactions }) {
  const byCategory = Object.entries(
    transactions
      .filter((t) => t.type === 'expense')
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {})
  ).map(([name, value]) => ({ name, value }));

  const byMonth = Object.values(
    transactions.reduce((acc, t) => {
      const d = new Date(t.date);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
      acc[key] = acc[key] || { month: key, income: 0, expense: 0 };
      acc[key][t.type] += t.amount;
      return acc;
    }, {})
  ).sort((a, b) => a.month.localeCompare(b.month));

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div className="panel">
        <h2 className="mb-2 font-bold">Spending by category</h2>
        {byCategory.length ? (
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={byCategory} dataKey="value" nameKey="name" outerRadius={90}>
                {byCategory.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p className="py-16 text-center text-sm text-slate-500">Add an expense to see your spending breakdown.</p>
        )}
      </div>

      <div className="panel">
        <h2 className="mb-2 font-bold">Monthly income vs expenses</h2>
        {byMonth.length ? (
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={byMonth}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="income" fill="#0f8a6a" />
              <Bar dataKey="expense" fill="#d1495b" />
            </BarChart>
          </ResponsiveContainer>
        ) : (
          <p className="py-16 text-center text-sm text-slate-500">Monthly trends appear after your first transaction.</p>
        )}
      </div>
    </div>
  );
}