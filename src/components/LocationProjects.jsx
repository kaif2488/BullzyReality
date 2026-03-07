import { useEffect, useMemo, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import FlatItem from "./FlatItem";
import Title from "./Title";
import propertySearchData from "../data/propertySearchData";

const LocationProjects = () => {
    const [searchParams] = useSearchParams();
    const location = (searchParams.get("location") || "").trim();
    const sliderRefs = useRef({});

    const locationProjects = useMemo(() => {
        if (!location) {
            return [...propertySearchData].sort((a, b) => a.location.localeCompare(b.location));
        }

        const normalizedLocation = location.toLowerCase();
        return propertySearchData.filter((item) => item.location.toLowerCase() === normalizedLocation);
    }, [location]);

    const groupedByLocation = useMemo(() => {
        if (location) return [];

        const grouped = locationProjects.reduce((acc, item) => {
            if (!acc[item.location]) {
                acc[item.location] = [];
            }
            acc[item.location].push(item);
            return acc;
        }, {});

        return Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b));
    }, [location, locationProjects]);

    const uniqueLocationCount = useMemo(
        () => new Set(locationProjects.map((item) => item.location)).size,
        [locationProjects]
    );

    const pageTitle = location || "All Location Projects";
    const pageDescription = location
        ? `Found ${locationProjects.length} projects`
        : `Found ${locationProjects.length} projects across ${uniqueLocationCount} locations (A-Z)`;

    useEffect(() => {
        if (location) return undefined;

        const sliderRows = Object.entries(sliderRefs.current).filter(
            ([, element]) => element && Number(element.dataset.count || 0) > 3
        );

        const intervals = sliderRows.map(([, element]) =>
            setInterval(() => {
                if (!element) return;

                const firstCard = element.querySelector(".location-slider-item");
                if (!firstCard) return;

                const maxScroll = element.scrollWidth - element.clientWidth;
                if (maxScroll <= 0) return;

                const rowGap = parseFloat(window.getComputedStyle(element).columnGap || "12") || 12;
                const step = firstCard.getBoundingClientRect().width + rowGap;
                const nextLeft = element.scrollLeft + step;
                const targetLeft = nextLeft >= maxScroll - 2 ? 0 : nextLeft;

                element.scrollTo({ left: targetLeft, behavior: "smooth" });
            }, 3200)
        );

        return () => {
            intervals.forEach((intervalId) => clearInterval(intervalId));
        };
    }, [location, groupedByLocation]);

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
                                {properties.length > 3 ? (
                                    <div className="location-slider-wrap">
                                        <div
                                            className="location-slider-row"
                                            ref={(element) => {
                                                if (element) {
                                                    sliderRefs.current[locationName] = element;
                                                } else {
                                                    delete sliderRefs.current[locationName];
                                                }
                                            }}
                                            data-count={properties.length}
                                        >
                                            {properties.map((property) => (
                                                <div key={property.id} className="location-slider-item">
                                                    <FlatItem property={property} />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="row">
                                        {properties.map((property) => (
                                            <FlatItem key={property.id} property={property} />
                                        ))}
                                    </div>
                                )}
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
