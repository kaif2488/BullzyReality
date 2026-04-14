import { propertyStatusOptions } from "../data/propertySearchData";
import CustomFilterDropdown from "./CustomFilterDropdown";

export const statusFilters = [
    { label: "All Status", value: "all" },
    ...propertyStatusOptions.map((status) => ({ label: status, value: status }))
];

const StatusFilter = ({ value, onChange }) => {
    return (
        <CustomFilterDropdown value={value} onChange={onChange} options={statusFilters} placeholder="All Status" />
    );
};

export default StatusFilter;
