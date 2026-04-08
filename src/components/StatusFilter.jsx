import { propertyStatusOptions } from "../data/propertySearchData";

export const statusFilters = [
    { label: "All Status", value: "all" },
    ...propertyStatusOptions.map((status) => ({ label: status, value: status }))
];

const StatusFilter = ({ value, onChange }) => {
    return (
        <div className="budget-filter-area">
            <select className="budget-select" value={value} onChange={onChange}>
                {statusFilters.map((item) => (
                    <option key={item.value} value={item.value}>
                        {item.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default StatusFilter;
