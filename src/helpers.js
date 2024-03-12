export const waait = (ms = 0) =>
  new Promise((resolve) => setTimeout(resolve, Math.random() * ms));

const generateRandomColor = () => {
  const existingBudgetLength = fetchData("budgets")?.length ?? 0;

  return `${existingBudgetLength * 34} 65% 50%`;
};

export const fetchData = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

export const deleteItem = ({ key, id }) => {

  const exisitingData = fetchData(key);

  if (id) {
    const newData = exisitingData.filter((item) => item.id !== id);

    return localStorage.setItem(key, JSON.stringify(newData));
  }
  return localStorage.removeItem(key);
};

export const createbudget = ({ name, amount }) => {
  const newBudget = {
    id: crypto.randomUUID(),
    name: name,
    amount: +amount,
    createdAt: Date.now(),
    color: generateRandomColor(),
  };

  const existingBudgets = fetchData("budgets") ?? [];

  return localStorage.setItem(
    "budgets",
    JSON.stringify([...existingBudgets, newBudget])
  );
};

export const createExpense = ({ name, amount, budgetId }) => {
  const newExpense = {
    id: crypto.randomUUID(),
    name: name,
    amount: +amount,
    createdAt: Date.now(),
    budgetId: budgetId,
  };

  const existingExpenses = fetchData("expenses") ?? [];

  return localStorage.setItem(
    "expenses",
    JSON.stringify([...existingExpenses, newExpense])
  );
};

export const formatCurrency = (amount) => {
  return amount.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
  });
};

export const calculateSpentByBudget = (budgetId) => {
  const expenses = fetchData("expenses") ?? [];

  const expensesByBudget = expenses.filter(
    (expense) => expense.budgetId === budgetId
  );

  return expensesByBudget.reduce((total, expense) => total + expense.amount, 0);
};

export const formatPercentage = (amount) => {
  return amount.toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 0,
  });
};

export const formatDateToLocaleString = (date) => {
  return new Date(date).toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const getAllMatchingItems = ({ category, key, value }) => {
  const data = fetchData(category) ?? [];

  return data.filter((item) => item[key] === value);
};

