import FilterDropdown from "./FilterDropdown";
import { budgetFilters } from "../data/filterOptions";

const BudgetFilter = ({ value, onChange }) => {
    return (
        <FilterDropdown
            className="budget-filter-area"
            triggerClassName="budget-select"
            ariaLabel="Budget filter"
            value={value}
            onChange={onChange}
            options={budgetFilters.map((range) => ({ label: range.label, value: range.value }))}
        />
    );
};

export default BudgetFilter;
