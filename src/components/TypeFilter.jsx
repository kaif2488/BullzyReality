export const typeFilters = [
    { label: "All Types", value: "all" },
    { label: "Apartment", value: "Apartment" },
    { label: "Flat", value: "Flat" },
    { label: "House", value: "House" },
    { label: "Villa", value: "Villa" },
    { label: "Penthouse", value: "Penthouse" }
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
