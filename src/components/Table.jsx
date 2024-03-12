import PropTypes from "prop-types";
import ExpenseItem from "./ExpenseItem";

const Table = ({ expenses, showBudget }) => {
	const headerArray = showBudget ? ["Name", "Amount", "Date", "Budget"] : ["Name", "Amount", "Date"];

  return (
    <div className="table">
      <table>
        <thead>
          <tr>
						{
							headerArray.map((header, index) => (
								<th key={index}>{header}</th>
							))
						}
					</tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <tr key={expense.id}>
              <ExpenseItem expense={expense} showBudget={showBudget}/>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  expenses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      createdAt: PropTypes.number.isRequired,
      budgetId: PropTypes.string.isRequired,
    })
  ).isRequired,
	showBudget: PropTypes.bool,
};

Table.defaultProps = {
  showBudget: true
}

export default Table;
