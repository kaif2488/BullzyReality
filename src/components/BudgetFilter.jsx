import CustomFilterDropdown from "./CustomFilterDropdown";

export const budgetFilters = [
    { label: "All Budgets", value: "all", min: 0, max: null },
    { label: "Up to \u20B91 Cr", value: "upto-1cr", min: 0, max: 10000000 },
    { label: "\u20B91 Cr - \u20B92 Cr", value: "1cr-2cr", min: 10000000, max: 20000000 },
    { label: "\u20B92 Cr - \u20B93 Cr", value: "2cr-3cr", min: 20000000, max: 30000000 },
    { label: "Above \u20B93 Cr", value: "above-3cr", min: 30000000, max: null }
];

const BudgetFilter = ({ value, onChange }) => {
    return (
        <CustomFilterDropdown value={value} onChange={onChange} options={budgetFilters} placeholder="All Budgets" />
    );
};

export default BudgetFilter;
