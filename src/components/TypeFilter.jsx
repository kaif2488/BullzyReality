import { propertyTypeOptions } from "../data/propertySearchData";
import CustomFilterDropdown from "./CustomFilterDropdown";

export const typeFilters = [
    { label: "All Types", value: "all" },
    ...propertyTypeOptions.map((type) => ({ label: type, value: type }))
];

const TypeFilter = ({ value, onChange }) => {
    return (
        <CustomFilterDropdown value={value} onChange={onChange} options={typeFilters} placeholder="All Types" />
    );
};

export default TypeFilter;
