export const statusFilters = [
    { label: "All Status", value: "all" },
    { label: "Ready to Move", value: "Ready to Move" },
    { label: "Under Construction", value: "Under Construction" }
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
