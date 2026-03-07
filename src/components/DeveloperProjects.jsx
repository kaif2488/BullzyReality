import { useEffect, useMemo, useRef } from "react";
import { Link, useSearchParams } from "react-router-dom";
import FlatItem from "./FlatItem";
import Title from "./Title";
import propertySearchData from "../data/propertySearchData";

const DeveloperProjects = () => {
    const [searchParams] = useSearchParams();
    const developer = (searchParams.get("developer") || "").trim();
    const sliderRefs = useRef({});

    const developerProjects = useMemo(() => {
        if (!developer) {
            return [...propertySearchData].sort((a, b) => a.developerName.localeCompare(b.developerName));
        }

        const normalizedDeveloper = developer.toLowerCase();
        return propertySearchData.filter((item) => item.developerName.toLowerCase() === normalizedDeveloper);
    }, [developer]);

    const groupedByDeveloper = useMemo(() => {
        if (developer) return [];

        const grouped = developerProjects.reduce((acc, item) => {
            if (!acc[item.developerName]) {
                acc[item.developerName] = [];
            }
            acc[item.developerName].push(item);
            return acc;
        }, {});

        return Object.entries(grouped).sort(([a], [b]) => a.localeCompare(b));
    }, [developer, developerProjects]);

    const uniqueDeveloperCount = useMemo(
        () => new Set(developerProjects.map((item) => item.developerName)).size,
        [developerProjects]
    );

    const pageTitle = developer || "All Developer Projects";
    const pageDescription = developer
        ? `Found ${developerProjects.length} projects`
        : `Found ${developerProjects.length} projects across ${uniqueDeveloperCount} developers (A-Z)`;

    useEffect(() => {
        if (developer) return undefined;

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
    }, [developer, groupedByDeveloper]);

    return (
        <section className="section-all-re page-content">
            <div className="container">
                <Title title={pageTitle} description={pageDescription} />
                <div className="mb-4 text-center">
                    <Link to="/home" className="btn btn-detail">Back to Home</Link>
                </div>

                {developerProjects.length > 0 ? (
                    developer ? (
                        <div className="row">
                            {developerProjects.map((property) => <FlatItem key={property.id} property={property} />)}
                        </div>
                    ) : (
                        groupedByDeveloper.map(([developerName, properties]) => (
                            <div key={developerName} className="mb-4">
                                <h4 className="insight-heading mb-3">{developerName}</h4>
                                {properties.length > 3 ? (
                                    <div className="location-slider-wrap">
                                        <div
                                            className="location-slider-row"
                                            ref={(element) => {
                                                if (element) {
                                                    sliderRefs.current[developerName] = element;
                                                } else {
                                                    delete sliderRefs.current[developerName];
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
                            <p>No projects found for this developer.</p>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default DeveloperProjects;
