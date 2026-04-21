import React, { useState } from "react";
import ImageGallery from "react-image-gallery";
import { Link, useNavigate, useParams } from "react-router-dom";
import propertySearchData, { propertyImageFallback } from "../data/propertySearchData";

const getPricingLabel = (category) => {
    switch (category) {
        case "range":
            return "Range";
        case "onwards":
            return "Starting Price";
        case "psf":
            return "PSF Pricing";
        case "total":
            return "Total Price";
        default:
            return "Mixed Pricing";
    }
};

const handlePropertyImageError = (event) => {
    event.currentTarget.onerror = null;
    event.currentTarget.src = propertyImageFallback;
};

const getGalleryItemKey = (item) => item.driveId || item.sourceUrl || item.previewUrl || item.original || item.thumbnail;

const contactMapLink = "https://maps.app.goo.gl/pveTEZHtRhx9zai86";

const FlatDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [slideIntervalMs, setSlideIntervalMs] = useState(5000);
    const [activeDrivePreviewKey, setActiveDrivePreviewKey] = useState("");

    const property = propertySearchData.find((item) => item.slug === slug);

    if (!property) {
        return (
            <div className="flat-detail">
                <div className="page-top">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-12 text-center">
                                <h1 className="page-title">Property Not Found</h1>
                                <h2 className="page-description">This property may have been removed.</h2>
                                <button type="button" className="btn btn-light mt-3" onClick={() => navigate(-1)}>
                                    Back
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    const galleryItems = property.media?.length
        ? property.media.map((item, index) => ({
            ...item,
            original: item.original || item.thumbnail || propertyImageFallback,
            thumbnail: item.thumbnail || item.original || propertyImageFallback,
            galleryKey: getGalleryItemKey(item) || `${property.slug || property.name}-media-${index}`
        }))
        : property.images?.length
            ? property.images.map((image, index) => ({ type: "image", original: image, thumbnail: image, galleryKey: `${property.slug || property.name}-image-${index}` }))
        : [{ original: propertyImageFallback, thumbnail: propertyImageFallback, galleryKey: `${property.slug || property.name}-fallback` }];
    const recentlyAdded = propertySearchData.filter((item) => item.slug !== property.slug).slice(0, 3);

    const formattedPrice = property.priceLabel || "Price on request";
    const location = property.location || "Location not listed";
    const locality = property.locality || location;
    const developerName = property.developerName || "Developer not listed";
    const featureHighlights = property.featureHighlights?.length
        ? property.featureHighlights
        : [property.type, property.status, locality, developerName].filter(Boolean);

    const whatsappMessage = encodeURIComponent(
        [
            "Hello, I'm interested in this property.",
            "",
            `Property: ${property.name}`,
            `Location: ${location}`,
            `Developer: ${developerName}`,
            `Type: ${property.type}`,
            `Status: ${property.status}`,
            `Price: ${formattedPrice}`,
            "",
            "Please share more details, brochure, and site visit availability."
        ].join("\n")
    );

    const setUserSlideInterval = () => {
        setSlideIntervalMs((previous) => (previous === 10000 ? previous : 10000));
    };

    const openDrivePreview = (event, item) => {
        event.preventDefault();
        event.stopPropagation();
        setUserSlideInterval();
        setActiveDrivePreviewKey(item.galleryKey);
    };

    const closeDrivePreview = (event) => {
        event.preventDefault();
        event.stopPropagation();
        setActiveDrivePreviewKey("");
    };

    return (
        <div className="flat-detail">
            <div className="page-top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <h1 className="page-title">{property.name}</h1>
                            <h2 className="page-description">Details</h2>
                            <button type="button" className="btn btn-light mt-3" onClick={() => navigate(-1)}>
                                Back
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container mt-5 mb-5">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="fd-top flat-detail-content">
                            <div>
                                <h3 className="flat-detail-title">{property.name}</h3>
                                <p className="fd-address"><i className="fas fa-map-marker-alt"></i> {location}</p>
                            </div>
                            <div>
                                <span className="fd-price">{formattedPrice}</span>
                            </div>
                        </div>

                        <div className={`fd-gallery-wrapper ${activeDrivePreviewKey ? "fd-gallery-preview-active" : ""}`}>
                            <ImageGallery
                                flickThreshold={0.5}
                                slideDuration={500}
                                slideInterval={slideIntervalMs}
                                autoPlay={!activeDrivePreviewKey}
                                items={galleryItems}
                                showNav={galleryItems.length > 1}
                                showBullets={galleryItems.length > 1}
                                showIndex={galleryItems.length > 1}
                                showThumbnails={galleryItems.length > 1}
                                showFullscreenButton={false}
                                showPlayButton={false}
                                thumbnailPosition="bottom"
                                lazyLoad={true}
                                additionalClass="fd-image-gallery"
                                onClick={setUserSlideInterval}
                                onTouchStart={setUserSlideInterval}
                                onSlide={() => setActiveDrivePreviewKey("")}
                                onThumbnailClick={() => {
                                    setActiveDrivePreviewKey("");
                                    setUserSlideInterval();
                                }}
                                renderItem={(item) => (
                                    <div className={`fd-gallery-slide-frame ${item.type === "video" || activeDrivePreviewKey === item.galleryKey ? "fd-gallery-video-frame" : ""}`}>
                                        {item.type === "video" ? (
                                            <>
                                                <video className="fd-gallery-video" controls playsInline preload="metadata" poster={item.thumbnail || propertyImageFallback}>
                                                    <source src={item.videoUrl || item.original} />
                                                    Your browser does not support the video tag.
                                                </video>
                                                <span className="fd-media-badge">
                                                    <i className="fas fa-play"></i>
                                                    Video
                                                </span>
                                            </>
                                        ) : activeDrivePreviewKey === item.galleryKey && item.previewUrl ? (
                                            <>
                                                <iframe
                                                    src={item.previewUrl}
                                                    title={`${property.name} media preview`}
                                                    className="fd-gallery-drive-preview"
                                                    allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                                                    allowFullScreen
                                                    loading="lazy"
                                                ></iframe>
                                                <button type="button" className="fd-preview-close-btn" onClick={closeDrivePreview}>
                                                    <i className="fas fa-times"></i>
                                                    Close Preview
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <img
                                                    src={item.original || propertyImageFallback}
                                                    alt={property.name}
                                                    className="fd-gallery-image"
                                                    onError={handlePropertyImageError}
                                                />
                                                {item.type === "drive" && item.previewUrl ? (
                                                    <button
                                                        type="button"
                                                        className="fd-media-badge fd-drive-preview-link"
                                                        onClick={(event) => openDrivePreview(event, item)}
                                                    >
                                                        <i className="fas fa-play"></i>
                                                        Play Here
                                                    </button>
                                                ) : null}
                                            </>
                                        )}
                                    </div>
                                )}
                                renderThumbInner={(item) => (
                                    <span className="fd-gallery-thumb-frame">
                                        <img
                                            src={item.thumbnail || propertyImageFallback}
                                            alt={`${property.name} thumbnail`}
                                            onError={handlePropertyImageError}
                                        />
                                        {item.type === "video" || item.type === "drive" ? (
                                            <span className="fd-gallery-thumb-media">
                                                <i className="fas fa-play"></i>
                                            </span>
                                        ) : null}
                                    </span>
                                )}
                            />
                        </div>

                        <div className="row" style={{ marginTop: "30px" }}>
                            <div className="col-lg-8">
                                <div className="fd-item">
                                    <h4>Overview and Property Details</h4>
                                    <p>
                                        {property.name} is a {property.type.toLowerCase()} currently marked as {property.status.toLowerCase()} by {developerName}.
                                        This listing is presented directly from the latest submitted property data and includes the most relevant project details available right now.
                                    </p>
                                    {property.featuresText ? <p>{property.featuresText}</p> : null}

                                    <div className="row" style={{ marginTop: "15px" }}>
                                        <div className="col-lg-4"><strong>Type:</strong> {property.type}</div>
                                        <div className="col-lg-4"><strong>Status:</strong> {property.status}</div>
                                        <div className="col-lg-4"><strong>Price:</strong> {formattedPrice}</div>
                                    </div>
                                    <div className="row" style={{ marginTop: "8px" }}>
                                        <div className="col-lg-4"><strong>Developer:</strong> {developerName}</div>
                                        <div className="col-lg-4"><strong>Locality:</strong> {locality}</div>
                                        <div className="col-lg-4"><strong>Pricing:</strong> {getPricingLabel(property.priceCategory)}</div>
                                    </div>
                                    <div className="row" style={{ marginTop: "8px" }}>
                                        <div className="col-lg-12"><strong>Location:</strong> {location}</div>
                                    </div>
                                </div>

                                <div className="fd-item fd-features">
                                    <h4>Features</h4>
                                    <div className="row">
                                        {featureHighlights.map((feature) => (
                                            <div key={feature} className="col-lg-6">
                                                <i className="fa fa-check"></i><span>{feature}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="fd-item">
                                    <h4>Bullzy Reality Location</h4>
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d2978.211394844832!2d72.8459!3d19.1887!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b6914fe3a8e5%3A0x73f264109c4db9d4!2sMalad%2C%20Malad%20West%2C%20Mumbai%2C%20Maharashtra!5e1!3m2!1sen!2sin!4v1774809719193!5m2!1sen!2sin"
                                        width="100%"
                                        height="450"
                                        style={{ border: 0, borderRadius: "18px" }}
                                        allowFullScreen
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        title="Bullzy Reality location"
                                    ></iframe>
                                </div>
                            </div>

                            <div className="col-lg-4">
                                <div className="fd-sidebar-item">
                                    <h4 style={{ marginBottom: "15px" }}>Quick Enquiry</h4>

                                    <a
                                        href={`https://wa.me/917039443733?text=${whatsappMessage}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "12px",
                                            padding: "16px",
                                            borderRadius: "12px",
                                            textDecoration: "none",
                                            color: "#fff",
                                            background: "linear-gradient(135deg, #25D366, #1ebe5d)",
                                            boxShadow: "0 10px 25px rgba(37,211,102,0.35)",
                                            marginBottom: "12px"
                                        }}
                                    >
                                        <i className="fab fa-whatsapp" style={{ fontSize: "26px" }}></i>
                                        <div>
                                            <strong>Chat on WhatsApp</strong>
                                            <p style={{ margin: 0, fontSize: "13px", opacity: 0.9 }}>Get instant project details</p>
                                        </div>
                                    </a>

                                    <a
                                        href="tel:+917039443733"
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: "12px",
                                            padding: "16px",
                                            borderRadius: "12px",
                                            textDecoration: "none",
                                            color: "#fff",
                                            background: "linear-gradient(135deg, #0d6efd, #084298)",
                                            boxShadow: "0 10px 25px rgba(13,110,253,0.35)"
                                        }}
                                    >
                                        <i className="fas fa-phone-alt" style={{ fontSize: "22px" }}></i>
                                        <div>
                                            <strong>Call Now</strong>
                                            <p style={{ margin: 0, fontSize: "13px", opacity: 0.9 }}>Speak directly with agent</p>
                                        </div>
                                    </a>
                                </div>

                                <div className="fd-sidebar-item">
                                    <h4>Category</h4>
                                    <ul className="category-ul">
                                        <li>{property.type}</li>
                                        <li>{property.status}</li>
                                        <li>{developerName}</li>
                                        <li>{locality}</li>
                                        <li>{location}</li>
                                        <li>{formattedPrice}</li>
                                        <li>{getPricingLabel(property.priceCategory)}</li>
                                    </ul>
                                </div>

                                <div className="fd-sidebar-item fd-recently-added-card">
                                    <div className="fd-sidebar-heading">
                                        <div>
                                            <span className="fd-sidebar-eyebrow">Fresh picks</span>
                                            <h4>Recently Added</h4>
                                        </div>
                                        <span className="fd-recent-count">{recentlyAdded.length}</span>
                                    </div>
                                    {recentlyAdded.map((item) => (
                                        <Link className="recently-item" to={`/flat/${item.slug}`} key={item.id}>
                                            <span className="recently-item-img-wrap">
                                                <img src={item.image || propertyImageFallback} alt={item.name} onError={handlePropertyImageError} />
                                                {item.imageCount > 1 ? <span className="recently-photo-count">{item.imageCount} Photos</span> : null}
                                            </span>
                                            <span className="recently-item-content">
                                                <span className="recently-item-topline">
                                                    <span className="recently-status-pill">{item.status || "Available"}</span>
                                                    <span className="recently-item-cta">
                                                        View Details
                                                        <i className="fas fa-arrow-right"></i>
                                                    </span>
                                                </span>
                                                <span className="recently-item-title">{item.name}</span>
                                                <span className="recently-item-meta">
                                                    <i className="fas fa-map-marker-alt"></i>
                                                    {item.locality || item.location || "Location not listed"}
                                                </span>
                                                <span className="recently-item-footer">
                                                    <span>{item.priceLabel || "Price on request"}</span>
                                                    <small>{item.type || "Property"}</small>
                                                </span>
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlatDetail;
