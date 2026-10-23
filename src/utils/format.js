export const CATEGORIES = {
  income: ['Salary', 'Freelance', 'Investments', 'Gift', 'Other'],
  expense: ['Rent', 'Food', 'Transport', 'Utilities', 'Shopping', 'Health', 'Entertainment', 'Other'],
};

export const money = (n) =>
  new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' }).format(n);

export const shortDate = (d) =>
  new Intl.DateTimeFormat(undefined, { day: 'numeric', month: 'short', year: 'numeric' }).format(new Date(d));

export const errMsg = (err) => err.response?.data?.message || err.message || 'Something went wrong';