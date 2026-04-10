import FilterDropdown from "./FilterDropdown";
import { statusFilters } from "../data/filterOptions";

const StatusFilter = ({ value, onChange }) => {
    return (
        <FilterDropdown
            className="budget-filter-area"
            triggerClassName="budget-select"
            ariaLabel="Status filter"
            value={value}
            onChange={onChange}
            options={statusFilters}
        />
    );
};

export default StatusFilter;
