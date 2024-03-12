import { useLoaderData } from "react-router-dom";
import { deleteItem, fetchData, waait } from "../helpers";
import Table from "../components/Table";
import { toast } from "react-toastify";

export const expensesLoader = () => {
  const expenses = fetchData("expenses");

  return { expenses };
};

export const expensesAction = async ({ request }) => {
  await waait(2000);
  const data = await request.formData();

  const { _action, ...values } = Object.fromEntries(data);

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

const ExpensesPage = () => {
  const { expenses } = useLoaderData();
  return (
    <div className="grid-lg">
      <h1>All Expenses</h1>
      {expenses && expenses.length > 0 ? (
        <div className="grid-md">
          <h2>
            Recent Expenses <small>({expenses.length} total)</small>
          </h2>
          <Table
            expenses={expenses.sort((a, b) => b.createdAt - a.createdAt)}
          />
        </div>
      ) : (
        <p className="text-center">No expenses found</p>
      )}
    </div>
  );
};

export default ExpensesPage;
