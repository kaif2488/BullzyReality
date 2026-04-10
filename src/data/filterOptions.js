import { propertyStatusOptions, propertyTypeOptions } from "./propertySearchData";

export const budgetFilters = [
    { label: "All Budgets", value: "all", min: 0, max: null },
    { label: "Up to ₹1 Cr", value: "upto-1cr", min: 0, max: 10000000 },
    { label: "₹1 Cr - ₹2 Cr", value: "1cr-2cr", min: 10000000, max: 20000000 },
    { label: "₹2 Cr - ₹3 Cr", value: "2cr-3cr", min: 20000000, max: 30000000 },
    { label: "Above ₹3 Cr", value: "above-3cr", min: 30000000, max: null }
];

export const typeFilters = [
    { label: "All Types", value: "all" },
    ...propertyTypeOptions.map((type) => ({ label: type, value: type }))
];

export const statusFilters = [
    { label: "All Status", value: "all" },
    ...propertyStatusOptions.map((status) => ({ label: status, value: status }))
];

