import { propertyTypeOptions } from "../data/propertySearchData";

export const typeFilters = [
    { label: "All Types", value: "all" },
    ...propertyTypeOptions.map((type) => ({ label: type, value: type }))
];

const TypeFilter = ({ value, onChange }) => {
    return (
        <div className="budget-filter-area">
            <select className="budget-select" value={value} onChange={onChange}>
                {typeFilters.map((item) => (
                    <option key={item.value} value={item.value}>
                        {item.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default TypeFilter;
