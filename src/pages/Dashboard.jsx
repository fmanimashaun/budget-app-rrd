import { Link, useLoaderData } from "react-router-dom";
import {
  createbudget,
  createExpense,
  deleteItem,
  fetchData,
  waait,
} from "../helpers";
import Intro from "../components/Intro";
import { toast } from "react-toastify";
import AddBudgetform from "../components/AddBudgetform";
import AddExpenseform from "../components/AddExpenseform";
import BudgetItem from "../components/BudgetItem";
import Table from "../components/Table";

export const dashboardLoader = () => {
  const userName = fetchData("userName");
  const budgets = fetchData("budgets");
  const expenses = fetchData("expenses");

  return { userName, budgets, expenses };
};

export const dashboardAction = async ({ request }) => {
  await waait(2000);
  const data = await request.formData();

  const { _action, ...values } = Object.fromEntries(data);

  if (_action === "newUser") {
    try {
      localStorage.setItem("userName", JSON.stringify(values.userName));

      return toast.success(`Welcome ${values.userName}!`);
    } catch (error) {
      throw new Error("There is an error creating your account!");
    }
  }

  if (_action === "newBudget") {
    try {
      createbudget({
        name: values.newBudget,
        amount: values.newBudgetAmount,
      });
      return toast.success("Budget created!");
    } catch (error) {
      throw new Error("There is an error creating your budget!");
    }
  }

  if (_action === "newExpense") {
    try {
      createExpense({
        name: values.newExpense,
        amount: values.newExpenseAmount,
        budgetId: values.newExpenseBudget,
      });

      const budget = fetchData("budgets").find(
        (budget) => budget.id === values.newExpenseBudget
      );
      return toast.success(
        `${values.newExpense} added to the ${budget.name} budget!`
      );
    } catch (error) {
      throw new Error("There is an error adding expense!");
    }
  }

  if (_action === "deleteExpense") {
    try {
      deleteItem({
        key: "expenses",
        id: values.expenseId,
      });

      return toast.success("Expense deleted!");
    } catch (error) {
      throw new Error("There is a problem deleting your expense!");
    }
  }
};

const Dashboard = () => {
  const { userName, budgets, expenses } = useLoaderData();
  return (
    <>
      {userName ? (
        <div className="dashboard">
          <h1>
            Welcome back <span className="accent">{userName}</span>
          </h1>
          <div className="grid-sm">
            {budgets && budgets.length > 0 ? (
              <div className="grid-lg">
                <div className="flex-lg">
                  <AddBudgetform />
                  <AddExpenseform budgets={budgets} />
                </div>
                <h2>Exisiting Budgets</h2>
                <div className="budgets">
                  {budgets.map((budget) => (
                    <BudgetItem key={budget.id} budget={budget} />
                  ))}
                </div>
                {expenses && expenses.length > 0 && (
                  <div className="grid-md">
                    <h2>Recent Expenses</h2>
                    <Table
                      expenses={expenses
                        .sort((a, b) => b.createdAt - a.createdAt)
                        .slice(0, 8)}
                    />
                    {expenses.length > 8 && (
                      <Link to="/expenses" className="btn btn--dark">
                        View all expenses
                      </Link>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="grid-sm">
                <p>Personal budgeting is the secret to financial freedom.</p>
                <p>Create a budget to get started!</p>
                <AddBudgetform />
              </div>
            )}
          </div>
        </div>
      ) : (
        <Intro />
      )}
    </>
  );
};

export default Dashboard;
