import { useRef } from "react";
import { Link } from "react-router-dom";
import Title from "./Title";
import { propertyImageFallback } from "../data/propertySearchData";

const formatCurrencyShort = (amount) => {
    if (!Number.isFinite(amount) || amount <= 0) return "Mixed pricing";

    if (amount >= 10000000) {
        return `\u20B9${(amount / 10000000).toFixed(amount >= 100000000 ? 1 : 2).replace(/\\.0$/, "")} Cr`;
    }

    if (amount >= 100000) {
        return `\u20B9${(amount / 100000).toFixed(amount >= 1000000 ? 1 : 2).replace(/\\.0$/, "")} Lakh`;
    }

    return `\u20B9${Math.round(amount).toLocaleString("en-IN")}`;
};

const handlePropertyImageError = (event) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = propertyImageFallback;
};

const getTopRankedGroups = (properties, keyName) => {
    const grouped = properties.reduce((acc, item) => {
        const key = item[keyName] || "Unknown";

        if (!acc[key]) {
            acc[key] = {
                name: key,
                propertyCount: 0,
                image: item.image,
                readyCount: 0,
                relatedLabels: {},
                minComparablePrice: Number.POSITIVE_INFINITY,
                latestTimestamp: item.timestampValue || 0
            };
        }

        acc[key].propertyCount += 1;
        acc[key].latestTimestamp = Math.max(acc[key].latestTimestamp, item.timestampValue || 0);

        if (item.status === "Ready to Move") {
            acc[key].readyCount += 1;
        }

        if (item.budgetComparable && Number.isFinite(item.priceValue)) {
            acc[key].minComparablePrice = Math.min(acc[key].minComparablePrice, item.priceValue);
        }

        const relatedLabel = keyName === "developerName" ? item.locality : item.developerName;
        if (relatedLabel) {
            acc[key].relatedLabels[relatedLabel] = (acc[key].relatedLabels[relatedLabel] || 0) + 1;
        }

        if (item.imageCount > 1 || item.timestampValue >= acc[key].latestTimestamp) {
            acc[key].image = item.image;
        }

        return acc;
    }, {});

    return Object.values(grouped)
        .map((entry) => {
            const primaryRelatedLabel = Object.entries(entry.relatedLabels)
                .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))[0]?.[0] || "";

            return {
                ...entry,
                primaryRelatedLabel,
                minComparablePrice: Number.isFinite(entry.minComparablePrice) ? entry.minComparablePrice : null
            };
        })
        .sort((a, b) => {
            if (b.propertyCount !== a.propertyCount) {
                return b.propertyCount - a.propertyCount;
            }
            if (b.readyCount !== a.readyCount) {
                return b.readyCount - a.readyCount;
            }
            return b.latestTimestamp - a.latestTimestamp;
        })
        .slice(0, 7);
};

const getFeaturedProperties = (properties) => {
    return [...properties]
        .sort((a, b) => {
            if (b.timestampValue !== a.timestampValue) {
                return b.timestampValue - a.timestampValue;
            }
            if (b.imageCount !== a.imageCount) {
                return b.imageCount - a.imageCount;
            }
            return a.name.localeCompare(b.name);
        })
        .slice(0, 7);
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
        description: "Real property submissions with grouped developer and locality browsing."
    };

    const featuredProperties = getFeaturedProperties(properties);
    const featuredFirstRow = featuredProperties.slice(0, 4);
    const featuredSecondRow = featuredProperties.slice(4, 7);
    const topDevelopers = getTopRankedGroups(properties, "developerName");
    const topLocalities = getTopRankedGroups(properties, "locality");

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
                                            <img src={property.image} alt={property.name} onError={handlePropertyImageError} />
                                        </div>
                                        <h5 className="insight-card-title">{property.name}</h5>
                                        <p className="insight-metric">{property.locality}</p>
                                        <p className="insight-meta">{property.developerName}</p>
                                        <p className="insight-meta">{property.type} | {property.status}</p>
                                        <p className="insight-cost">{property.priceLabel}</p>
                                    </article>
                                </Link>
                            ))}
                        </div>

                        <div className="insight-featured-row">
                            {featuredSecondRow.map((property) => (
                                <Link key={property.id} className="insight-card-link" to={`/flat/${property.slug}`}>
                                    <article className="insight-card">
                                        <div className="insight-card-image">
                                            <img src={property.image} alt={property.name} onError={handlePropertyImageError} />
                                        </div>
                                        <h5 className="insight-card-title">{property.name}</h5>
                                        <p className="insight-metric">{property.locality}</p>
                                        <p className="insight-meta">{property.developerName}</p>
                                        <p className="insight-meta">{property.type} | {property.status}</p>
                                        <p className="insight-cost">{property.priceLabel}</p>
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
                                        <img src={developer.image} alt={developer.name} onError={handlePropertyImageError} />
                                    </div>
                                    <h5 className="insight-card-title">{developer.name}</h5>
                                    <p className="insight-metric">{developer.propertyCount} properties</p>
                                    <p className="insight-meta">Ready to move: {developer.readyCount}</p>
                                    <p className="insight-meta">Top locality: {developer.primaryRelatedLabel || "Multiple locations"}</p>
                                    <p className="insight-cost">
                                        {developer.minComparablePrice ? `Starting at ${formatCurrencyShort(developer.minComparablePrice)}` : "Mixed pricing"}
                                    </p>
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
                                        <img src={locality.image} alt={locality.name} onError={handlePropertyImageError} />
                                    </div>
                                    <h5 className="insight-card-title">{locality.name}</h5>
                                    <p className="insight-metric">{locality.propertyCount} properties</p>
                                    <p className="insight-meta">Ready to move: {locality.readyCount}</p>
                                    <p className="insight-meta">Top developer: {locality.primaryRelatedLabel || "Multiple developers"}</p>
                                    <p className="insight-cost">
                                        {locality.minComparablePrice ? `Starting at ${formatCurrencyShort(locality.minComparablePrice)}` : "Mixed pricing"}
                                    </p>
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
