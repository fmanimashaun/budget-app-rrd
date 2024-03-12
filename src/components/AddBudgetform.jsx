import { useFetcher } from "react-router-dom";
import { HiCurrencyDollar } from "react-icons/hi2";
import { useEffect, useRef } from "react";

const AddBudgetform = () => {
  const fetcher = useFetcher();

  const isSubmitting = fetcher.state === "submitting";

  const formRef = useRef();
  const focusRef = useRef();

  useEffect(() => {
    if (!isSubmitting) {
      formRef.current.reset();
      focusRef.current.focus();
    }
  }, [isSubmitting]);

  return (
    <div className="form-wrapper">
      <h2 className="h3">Create budget</h2>
      <fetcher.Form method="post" className="grid-sm" ref={formRef}>
        <div className="grid-xs">
          <label htmlFor="newBudget">Buget Name</label>
          <input
            type="text"
            name="newBudget"
            id="newBudget"
            placeholder="e.g., Groceries"
            required
            ref={focusRef}
          />
        </div>
        <div className="grid-xs">
          <label htmlFor="newBudgetAmount">Amount</label>
          <input
            type="number"
            step={0.01}
            name="newBudgetAmount"
            id="newBudgetAmount"
            placeholder="e.g., $350"
            inputMode="decimal"
            required
          />
        </div>

        <input type="hidden" name="_action" value="newBudget" />

        <button type="submit" className="btn btn--dark" disabled={isSubmitting}>
          {isSubmitting ? (
            <span>Submitting...</span>
          ) : (
            <>
              <span>Create budget</span>
              <HiCurrencyDollar width={20} />
            </>
          )}
        </button>
      </fetcher.Form>
    </div>
  );
};

export default AddBudgetform;
