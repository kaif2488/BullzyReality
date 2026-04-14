import { useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import Slider from "react-slick";
import FlatItem from "./FlatItem";
import Title from "./Title";
import propertySearchData from "../data/propertySearchData";

const DeveloperProjects = () => {
    const [searchParams] = useSearchParams();
    const developer = (searchParams.get("developer") || "").trim();

    const sliderSettings = {
        infinite: true,
        speed: 1500,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3200,
        arrows: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    arrows: true
                }
            },
            {
                breakpoint: 800,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    arrows: true
                }
            }
        ]
    };

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
                                    <Slider {...sliderSettings}>
                                        {properties.map((property) => (
                                            <div key={property.id} className="slider-flat-item">
                                                <FlatItem property={property} wrapperClass="text-center" />
                                            </div>
                                        ))}
                                    </Slider>
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
