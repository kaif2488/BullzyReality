import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import FlatItem from "./FlatItem";
import Title from "./Title";
import propertySearchData from "../data/propertySearchData";

const LocationProjects = () => {
    const [searchParams] = useSearchParams();
    const location = (searchParams.get("location") || "").trim();

    const locationProjects = useMemo(() => {
        if (!location) {
            return [...propertySearchData].sort((a, b) => a.locality.localeCompare(b.locality));
        }

        const normalizedLocation = location.toLowerCase();
        return propertySearchData.filter((item) => item.locality.toLowerCase() === normalizedLocation);
    }, [location]);

    const groupedByLocation = useMemo(() => {
        if (location) return [];

        const grouped = locationProjects.reduce((acc, item) => {
            if (!acc[item.locality]) {
                acc[item.locality] = [];
            }
            acc[item.locality].push(item);
            return acc;
        }, {});

        return Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b));
    }, [location, locationProjects]);

    const uniqueLocationCount = useMemo(
        () => new Set(locationProjects.map((item) => item.locality)).size,
        [locationProjects]
    );

    const pageTitle = location || "All Location Projects";
    const pageDescription = location
        ? `Found ${locationProjects.length} projects`
        : `Found ${locationProjects.length} projects across ${uniqueLocationCount} locations (A-Z)`;

    return (
        <section className="section-all-re page-content">
            <div className="container">
                <Title title={pageTitle} description={pageDescription} />
                <div className="mb-4 text-center">
                    <Link to="/home" className="btn btn-detail">Back to Home</Link>
                </div>

                {locationProjects.length > 0 ? (
                    location ? (
                        <div className="row">
                            {locationProjects.map((property) => <FlatItem key={property.id} property={property} />)}
                        </div>
                    ) : (
                        groupedByLocation.map(([locationName, properties]) => (
                            <div key={locationName} className="mb-4 location-group-section">
                                <h4 className="insight-heading mb-3">{locationName}</h4>
                                <div className="row">
                                    {properties.map((property) => (
                                        <FlatItem key={property.id} property={property} />
                                    ))}
                                </div>
                            </div>
                        ))
                    )
                ) : (
                    <div className="row">
                        <div className="col-12 text-center">
                            <p>No projects found for this location.</p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default LocationProjects;
