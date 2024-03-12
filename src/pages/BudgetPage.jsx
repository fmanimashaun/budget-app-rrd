import { useLoaderData } from "react-router-dom";
import {
  createExpense,
  deleteItem,
  fetchData,
  getAllMatchingItems,
  waait,
} from "../helpers";
import BudgetItem from "../components/BudgetItem";
import AddExpenseform from "../components/AddExpenseform";
import Table from "../components/Table";
import { toast } from "react-toastify";

export const budgetLoader = async ({ params }) => {
  const budget = await getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: params.id,
  })[0];

  const expenses = await getAllMatchingItems({
    category: "expenses",
    key: "budgetId",
    value: params.id,
  });

  if (!budget) {
    throw new Error("The budget your are trying to found does not exit!");
  }

  return { budget, expenses };
};

export const budgetAction = async ({ request }) => {
  await waait(2000);
  const data = await request.formData();

  const { _action, ...values } = Object.fromEntries(data);

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

const BudgetPage = () => {
  const { budget, expenses } = useLoaderData();

  return (
    <div
      className="grid-lg"
      style={{
        "--accent": budget.color,
      }}
    >
      <h1 className="h2">
        <span className="accent">{budget.name}</span> Overview
      </h1>
      <div className="flex-lg">
        <BudgetItem budget={budget} showDelete={true} />
        <AddExpenseform budgets={[budget]} />
      </div>
      {expenses && expenses.length > 0 && (
        <div className="grid-md">
          <h2>
            <span className="accent">{budget.name}</span> Expenses
          </h2>
          <Table expenses={expenses} showBudget={false} />
        </div>
      )}
    </div>
  );
};

export default BudgetPage;
