import { Link, useSearchParams } from "react-router-dom";
import FlatItem from "./FlatItem";
import Title from "./Title";
import propertySearchData from "../data/propertySearchData";
import { budgetFilters } from "./BudgetFilter";

const SearchResults = () => {
    const [searchParams] = useSearchParams();

    const word = (searchParams.get("word") || "").trim().toLowerCase();
    const selectedBudget = searchParams.get("budget") || "all";
    const selectedType = searchParams.get("type") || "all";
    const selectedStatus = searchParams.get("status") || "all";

    const selectedBudgetOption = budgetFilters.find((range) => range.value === selectedBudget) || budgetFilters[0];

    const filteredProperties = propertySearchData.filter((item) => {
        const matchesWord =
            !word ||
            item.name.toLowerCase().includes(word) ||
            item.location.toLowerCase().includes(word) ||
            item.developerName.toLowerCase().includes(word);

        const matchesBudget =
            selectedBudget === "all"
                ? true
                : item.price >= selectedBudgetOption.min &&
                  (selectedBudgetOption.max === null || item.price <= selectedBudgetOption.max);

        const matchesType = selectedType === "all" ? true : item.type === selectedType;
        const matchesStatus = selectedStatus === "all" ? true : item.status === selectedStatus;

        return matchesWord && matchesBudget && matchesType && matchesStatus;
    });

    return (
        <section className="section-all-re page-content">
            <div className="container">
                <Title title="Search Results" description={`Found ${filteredProperties.length} properties`} />
                <div className="mb-4 text-center">
                    <Link to="/home" className="btn btn-detail">Back to Home</Link>
                </div>

                <div className="row">
                    {filteredProperties.length > 0 ? (
                        filteredProperties.map((property) => <FlatItem key={property.id} property={property} />)
                    ) : (
                        <div className="col-12 text-center">
                            <p>No properties found for selected filters.</p>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default SearchResults;
