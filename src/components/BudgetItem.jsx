import PropTypes from "prop-types";
import { HiOutlineBanknotes } from "react-icons/hi2";
import { HiOutlineTrash } from "react-icons/hi";
import {
  calculateSpentByBudget,
  formatCurrency,
  formatPercentage,
} from "../helpers";
import { Form, Link } from "react-router-dom";

const BudgetItem = ({ budget, showDelete }) => {
  const { id, name, amount, color } = budget;

  const spent = calculateSpentByBudget(id);
  return (
    <div
      className="budget"
      style={{
        "--accent": color,
      }}
    >
      <div className="progress-text">
        <h3>{name}</h3>
        <p>{formatCurrency(amount)} Budgeted</p>
      </div>
      <progress max={amount} value={spent}>
        {formatPercentage(spent / amount)}
      </progress>
      <div className="progress-text">
        <small>{formatCurrency(spent)} spent</small>
        <small>{formatCurrency(amount - spent)} remaining</small>
      </div>
      {showDelete ? (
        <div className="flex-sm">
          <Form
            method="post"
            action="delete"
            onSubmit={(e) => {
              if (
                !confirm(
                  "Are you sure you want to permanently delete this budget?"
                )
              ) {
                e.preventDefault();
              }
            }}
          >
            <button type="submit" className="btn">
              <span>Delete budget</span> <HiOutlineTrash width={20} />
            </button>
          </Form>
        </div>
      ) : (
        <div className="flex-sm">
          <Link to={`budget/${id}`} className="btn">
            <span>View Details</span>
            <HiOutlineBanknotes width={20} />
          </Link>
        </div>
      )}
    </div>
  );
};

BudgetItem.propTypes = {
  budget: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    amount: PropTypes.number.isRequired,
    createdAt: PropTypes.number.isRequired,
    color: PropTypes.string.isRequired,
  }).isRequired,
  showDelete: PropTypes.bool,
};

BudgetItem.defaultProps = {
  showDelete: false,
};

export default BudgetItem;
