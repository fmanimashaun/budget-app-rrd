import { redirect } from "react-router-dom";
import { deleteItem } from "../helpers";
import { toast } from "react-toastify";

export const logoutAction = async () => {
  // delete user

  deleteItem({
    key: "userName",
  });

  deleteItem({
    key: "budgets",
  });

  deleteItem({
    key: "expenses",
  });

	toast.success("you have deleted your account successfully!");

  // redirect to main page
  return redirect("/");
};
