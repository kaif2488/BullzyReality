import { useRef } from "react";
import { Link } from "react-router-dom";
import Title from "./Title";

const getTopRankedGroups = (properties, keyName) => {
    const grouped = properties.reduce((acc, item) => {
        const key = item[keyName] || "Unknown";

        if (!acc[key]) {
            acc[key] = {
                name: key,
                propertyCount: 0,
                totalCost: 0,
                totalReviewCount: 0,
                weightedRatingSum: 0,
                image: item.image,
                bestRatedInGroup: item.reviewScore || 0
            };
        }

        acc[key].propertyCount += 1;
        acc[key].totalCost += item.price;
        acc[key].totalReviewCount += item.reviewCount || 0;
        acc[key].weightedRatingSum += (item.reviewScore || 0) * (item.reviewCount || 0);

        if ((item.reviewScore || 0) > acc[key].bestRatedInGroup) {
            acc[key].bestRatedInGroup = item.reviewScore || 0;
            acc[key].image = item.image;
        }

        return acc;
    }, {});

    return Object.values(grouped)
        .map((entry) => {
            const averageCost = entry.totalCost / entry.propertyCount;
            const averageRating = entry.totalReviewCount > 0 ? entry.weightedRatingSum / entry.totalReviewCount : 0;

            return {
                ...entry,
                averageCost,
                averageRating
            };
        })
        .sort((a, b) => {
            if (b.averageRating !== a.averageRating) {
                return b.averageRating - a.averageRating;
            }
            return b.totalReviewCount - a.totalReviewCount;
        })
        .slice(0, 7);
};

const getFeaturedProperties = (properties) => {
    const ranked = [...properties].sort((a, b) => {
        if ((b.reviewScore || 0) !== (a.reviewScore || 0)) {
            return (b.reviewScore || 0) - (a.reviewScore || 0);
        }
        return (b.reviewCount || 0) - (a.reviewCount || 0);
    });

    const filtered = ranked.filter((item) => (item.reviewScore || 0) >= 4.2);
    const source = filtered.length >= 10 ? filtered : ranked;
    return source.slice(0, 10);
};

const FlatList = ({ properties = [] }) => {
    const developerScrollRef = useRef(null);
    const localityScrollRef = useRef(null);
    const developerDragRef = useRef({
        isPointerDown: false,
        isDragging: false,
        didDrag: false,
        startX: 0,
        startScrollLeft: 0
    });
    const localityDragRef = useRef({
        isPointerDown: false,
        isDragging: false,
        didDrag: false,
        startX: 0,
        startScrollLeft: 0
    });

    const title = {
        text: "Top Developers and Top Localities",
        description: "Featured properties plus top ranked developers and localities."
    };

    const featuredProperties = getFeaturedProperties(properties);
    const featuredFirstRow = featuredProperties.slice(0, 4);
    const featuredSecondRow = featuredProperties.slice(4, 7);
    const topDevelopers = getTopRankedGroups(properties, "developerName");
    const topLocalities = getTopRankedGroups(properties, "location");

    const onDragStart = (event, rowRef, dragRef) => {
        if (event.pointerType === "mouse" && event.button !== 0) return;
        if (!rowRef.current) return;

        dragRef.current.isPointerDown = true;
        dragRef.current.isDragging = false;
        dragRef.current.didDrag = false;
        dragRef.current.startX = event.clientX;
        dragRef.current.startScrollLeft = rowRef.current.scrollLeft;
    };

    const onDragMove = (event, rowRef, dragRef) => {
        if (!rowRef.current || !dragRef.current.isPointerDown) return;

        const dragDelta = event.clientX - dragRef.current.startX;
        const dragThreshold = 6;

        if (!dragRef.current.isDragging && Math.abs(dragDelta) > dragThreshold) {
            dragRef.current.isDragging = true;
            dragRef.current.didDrag = true;
            rowRef.current.classList.add("is-dragging");
        }

        if (!dragRef.current.isDragging) return;

        const slowFactor = 0.45;
        rowRef.current.scrollLeft = dragRef.current.startScrollLeft - dragDelta * slowFactor;
        event.preventDefault();
    };

    const onDragEnd = (_, rowRef, dragRef) => {
        if (!rowRef.current) return;

        const wasDragging = dragRef.current.isDragging;
        dragRef.current.isPointerDown = false;
        dragRef.current.isDragging = false;
        rowRef.current.classList.remove("is-dragging");

        if (wasDragging) {
            setTimeout(() => {
                dragRef.current.didDrag = false;
            }, 0);
        } else {
            dragRef.current.didDrag = false;
        }
    };

    const onCardClick = (event, dragRef) => {
        if (!dragRef.current.didDrag) return;
        event.preventDefault();
        dragRef.current.didDrag = false;
    };

    return (
        <section className="section-all-re">
            <div className="container">
                <Title title={title.text} description={title.description} />

                <div className="insight-block">
                    <h4 className="insight-heading">Featured Properties</h4>
                    <div className="insight-featured-grid">
                        <div className="insight-featured-row">
                            {featuredFirstRow.map((property) => (
                                <Link key={property.id} className="insight-card-link" to={`/flat/${property.slug}`}>
                                    <article className="insight-card">
                                        <div className="insight-card-image">
                                            <img src={property.image} alt={property.name} />
                                        </div>
                                        <h5 className="insight-card-title">{property.name}</h5>
                                        <p className="insight-metric">
                                            <i className="fas fa-star"></i> {(property.reviewScore || 0).toFixed(1)} / 5
                                        </p>
                                        <p className="insight-meta">{property.reviewCount || 0} reviews</p>
                                        <p className="insight-meta">{property.location}</p>
                                        <p className="insight-cost">Price: {"\u20B9"}{property.price.toLocaleString("en-IN")}</p>
                                    </article>
                                </Link>
                            ))}
                        </div>

                        <div className="insight-featured-row">
                            {featuredSecondRow.map((property) => (
                                <Link key={property.id} className="insight-card-link" to={`/flat/${property.slug}`}>
                                    <article className="insight-card">
                                        <div className="insight-card-image">
                                            <img src={property.image} alt={property.name} />
                                        </div>
                                        <h5 className="insight-card-title">{property.name}</h5>
                                        <p className="insight-metric">
                                            <i className="fas fa-star"></i> {(property.reviewScore || 0).toFixed(1)} / 5
                                        </p>
                                        <p className="insight-meta">{property.reviewCount || 0} reviews</p>
                                        <p className="insight-meta">{property.location}</p>
                                        <p className="insight-cost">Price: {"\u20B9"}{property.price.toLocaleString("en-IN")}</p>
                                    </article>
                                </Link>
                            ))}
                            <Link className="insight-card-link" to="/search">
                                <article className="insight-card insight-more-card">
                                    <p className="insight-more-label">More</p>
                                    <h5 className="insight-card-title insight-more-title">View All Properties</h5>
                                    <p className="insight-meta">Open search results with all records</p>
                                    <p className="insight-cost">{properties.length} total listings</p>
                                </article>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="insight-block">
                    <h4 className="insight-heading">Top Developers</h4>
                    <div
                        className="insight-scroll"
                        ref={developerScrollRef}
                        onPointerDown={(event) => onDragStart(event, developerScrollRef, developerDragRef)}
                        onPointerMove={(event) => onDragMove(event, developerScrollRef, developerDragRef)}
                        onPointerUp={(event) => onDragEnd(event, developerScrollRef, developerDragRef)}
                        onPointerCancel={(event) => onDragEnd(event, developerScrollRef, developerDragRef)}
                        onPointerLeave={(event) => onDragEnd(event, developerScrollRef, developerDragRef)}
                    >
                        {topDevelopers.map((developer, index) => (
                            <Link
                                key={developer.name}
                                className="insight-card-link"
                                to={`/developer-projects?developer=${encodeURIComponent(developer.name)}`}
                                onClick={(event) => onCardClick(event, developerDragRef)}
                            >
                                <article className="insight-card insight-card-ranked">
                                    <span className="insight-rank-badge">{index + 1}</span>
                                    <div className="insight-card-image">
                                        <img src={developer.image} alt={developer.name} />
                                    </div>
                                    <h5 className="insight-card-title">{developer.name}</h5>
                                    <p className="insight-metric"><i className="fas fa-star"></i> {developer.averageRating.toFixed(1)} / 5</p>
                                    <p className="insight-meta">{developer.totalReviewCount} reviews</p>
                                    <p className="insight-meta">{developer.propertyCount} properties</p>
                                    <p className="insight-cost">Avg Cost: {"\u20B9"}{developer.averageCost.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</p>
                                </article>
                            </Link>
                        ))}
                        <Link
                            className="insight-card-link"
                            to="/developer-projects"
                            onClick={(event) => onCardClick(event, developerDragRef)}
                        >
                            <article className="insight-card insight-more-card">
                                <p className="insight-more-label">More</p>
                                <h5 className="insight-card-title insight-more-title">View All by Developers</h5>
                                <p className="insight-meta">Browse every property grouped developer-wise</p>
                                <p className="insight-cost">{properties.length} total listings</p>
                            </article>
                        </Link>
                    </div>
                </div>

                <div className="insight-block">
                    <h4 className="insight-heading">Top Localities</h4>
                    <div
                        className="insight-scroll"
                        ref={localityScrollRef}
                        onPointerDown={(event) => onDragStart(event, localityScrollRef, localityDragRef)}
                        onPointerMove={(event) => onDragMove(event, localityScrollRef, localityDragRef)}
                        onPointerUp={(event) => onDragEnd(event, localityScrollRef, localityDragRef)}
                        onPointerCancel={(event) => onDragEnd(event, localityScrollRef, localityDragRef)}
                        onPointerLeave={(event) => onDragEnd(event, localityScrollRef, localityDragRef)}
                    >
                        {topLocalities.map((locality, index) => (
                            <Link
                                key={locality.name}
                                className="insight-card-link"
                                to={`/location-projects?location=${encodeURIComponent(locality.name)}`}
                                onClick={(event) => onCardClick(event, localityDragRef)}
                            >
                                <article className="insight-card insight-card-ranked">
                                    <span className="insight-rank-badge">{index + 1}</span>
                                    <div className="insight-card-image">
                                        <img src={locality.image} alt={locality.name} />
                                    </div>
                                    <h5 className="insight-card-title">{locality.name}</h5>
                                    <p className="insight-metric"><i className="fas fa-star"></i> {locality.averageRating.toFixed(1)} / 5</p>
                                    <p className="insight-meta">{locality.totalReviewCount} reviews</p>
                                    <p className="insight-meta">{locality.propertyCount} properties</p>
                                    <p className="insight-cost">Avg Cost: {"\u20B9"}{locality.averageCost.toLocaleString("en-IN", { maximumFractionDigits: 0 })}</p>
                                </article>
                            </Link>
                        ))}
                        <Link
                            className="insight-card-link"
                            to="/location-projects"
                            onClick={(event) => onCardClick(event, localityDragRef)}
                        >
                            <article className="insight-card insight-more-card">
                                <p className="insight-more-label">More</p>
                                <h5 className="insight-card-title insight-more-title">View All by Location</h5>
                                <p className="insight-meta">Browse every property grouped location-wise</p>
                                <p className="insight-cost">{properties.length} total listings</p>
                            </article>
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FlatList;
