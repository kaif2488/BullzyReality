export const budgetFilters = [
    { label: "All Budgets", value: "all", min: 0, max: null },
    { label: "Up to \u20B93,00,000", value: "upto-3l", min: 0, max: 300000 },
    { label: "\u20B93,00,000 - \u20B96,00,000", value: "3l-6l", min: 300000, max: 600000 },
    { label: "\u20B96,00,000 - \u20B910,00,000", value: "6l-10l", min: 600000, max: 1000000 },
    { label: "Above \u20B910,00,000", value: "above-10l", min: 1000000, max: null }
];

const BudgetFilter = ({ value, onChange }) => {
    return (
        <div className="budget-filter-area">
            <select className="budget-select" value={value} onChange={onChange}>
                {budgetFilters.map((range) => (
                    <option key={range.value} value={range.value}>
                        {range.label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default BudgetFilter;
