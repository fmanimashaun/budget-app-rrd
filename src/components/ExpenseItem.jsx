import PropTypes from "prop-types";
import { HiOutlineTrash } from "react-icons/hi";
import {
  formatCurrency,
  formatDateToLocaleString,
  getAllMatchingItems,
} from "../helpers";
import { Link, useFetcher } from "react-router-dom";

const ExpenseItem = ({ expense, showBudget }) => {
  const fetcher = useFetcher();
  const budget = getAllMatchingItems({
    category: "budgets",
    key: "id",
    value: expense.budgetId,
  })[0];

  return (
    <>
      <td>{expense.name}</td>
      <td>{formatCurrency(expense.amount)}</td>
      <td>{formatDateToLocaleString(expense.createdAt)}</td>
      {showBudget && (
        <td>
          <Link
            to={`/budget/${budget.id}`}
            style={{
              "--accent": budget.color,
            }}
          >
            {budget.name}
          </Link>
        </td>
      )}
      <td>
        <fetcher.Form method="post">
          <input type="hidden" name="_action" value="deleteExpense" />
          <input type="hidden" name="expenseId" value={expense.id} />
          <button type="submit" className="btn btn--warning">
            <HiOutlineTrash width={20} />
          </button>
        </fetcher.Form>
      </td>
    </>
  );
};

ExpenseItem.propTypes = {
  expense: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    createdAt: PropTypes.number.isRequired,
    budgetId: PropTypes.string.isRequired,
  }).isRequired,
  showBudget: PropTypes.bool,
};

ExpenseItem.defaultProps = {
  showBudget: true,
};

export default ExpenseItem;
