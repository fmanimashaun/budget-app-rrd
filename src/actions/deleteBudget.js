import { redirect } from "react-router-dom";
import { deleteItem, getAllMatchingItems } from "../helpers";
import { toast } from "react-toastify";

export const deleteBudgetAction = async ({ params }) => {
  try {
    deleteItem({
      key: "budgets",
      id: params.id,
    });

    const associatedExpenses = getAllMatchingItems({
      category: "expenses",
      key: "budgetId",
      value: params.id,
    });

    associatedExpenses.forEach((expense) => {
      deleteItem({
        key: "expenses",
        id: expense.id,
      });
    });

    toast.success("you have deleted your budget successfully!");
  } catch (error) {
    throw new Error("There is a problem deleting your budget");
  }

  // redirect to main page
  return redirect("/");
};
