import FilterDropdown from "./FilterDropdown";
import { typeFilters } from "../data/filterOptions";

const TypeFilter = ({ value, onChange }) => {
    return (
        <FilterDropdown
            className="budget-filter-area"
            triggerClassName="budget-select"
            ariaLabel="Type filter"
            value={value}
            onChange={onChange}
            options={typeFilters}
        />
    );
};

export default TypeFilter;
