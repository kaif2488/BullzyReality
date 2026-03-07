import React, { useState } from "react";
import ImageGallery from "react-image-gallery";
import { Link, useNavigate, useParams } from "react-router-dom";
import propertySearchData from "../data/propertySearchData";

const FlatDetail = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const [slideIntervalMs, setSlideIntervalMs] = useState(5000);

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

    const images = [
        { original: property.image, thumbnail: property.image },
        { original: "/img/sample12.png", thumbnail: "/img/sample12.png" },
        { original: "/img/sample13.png", thumbnail: "/img/sample13.png" }
    ];

    const recentlyAdded = propertySearchData.filter((item) => item.slug !== property.slug).slice(0, 3);

    const formattedPrice = `${"\u20B9"}${property.price.toLocaleString("en-IN")}`;
    const location = property.location || "Location not listed";
    const developerName = property.developerName || "Developer not listed";

    const whatsappMessage = encodeURIComponent(`Hello, I am interested in ${property.name} in ${location}`);

    const setUserSlideInterval = () => {
        setSlideIntervalMs((previous) => (previous === 10000 ? previous : 10000));
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

                        <ImageGallery
                            flickThreshold={0.5}
                            slideDuration={500}
                            slideInterval={slideIntervalMs}
                            autoPlay={true}
                            items={images}
                            showNav={false}
                            showFullscreenButton={false}
                            showPlayButton={false}
                            onClick={setUserSlideInterval}
                            onTouchStart={setUserSlideInterval}
                            onThumbnailClick={setUserSlideInterval}
                        />

                        <div className="row">
                            <div className="col-lg-8">
                                <div className="fd-item">
                                    <h4>Overview and Property Details</h4>
                                    <p>
                                        {property.name} is a {property.type.toLowerCase()} currently marked as {property.status.toLowerCase()} by {developerName}.
                                        This listing is presented directly from the latest property data and includes current pricing details.
                                    </p>

                                    <div className="row" style={{ marginTop: "15px" }}>
                                        <div className="col-lg-4"><strong>Type:</strong> {property.type}</div>
                                        <div className="col-lg-4"><strong>Status:</strong> {property.status}</div>
                                        <div className="col-lg-4"><strong>Price:</strong> {formattedPrice}</div>
                                    </div>
                                    <div className="row" style={{ marginTop: "8px" }}>
                                        <div className="col-lg-4"><strong>Developer:</strong> {developerName}</div>
                                        <div className="col-lg-8"><strong>Location:</strong> {location}</div>
                                    </div>
                                </div>

                                <div className="fd-item fd-features">
                                    <h4>Features</h4>
                                    <div className="row">
                                        <div className="col-lg-4"><i className="fa fa-check"></i><span>24x7 Security</span></div>
                                        <div className="col-lg-4"><i className="fa fa-check"></i><span>Power Backup</span></div>
                                        <div className="col-lg-4"><i className="fa fa-check"></i><span>Lift Facility</span></div>
                                    </div>
                                    <div className="row">
                                        <div className="col-lg-4"><i className="fa fa-check"></i><span>Reserved Parking</span></div>
                                        <div className="col-lg-4"><i className="fa fa-check"></i><span>Children's Play Area</span></div>
                                        <div className="col-lg-4"><i className="fa fa-check"></i><span>Open Space</span></div>
                                    </div>
                                </div>

                                <div className="fd-item">
                                    <h4>Location</h4>
                                    <iframe
                                        src={`https://www.google.com/maps?q=${encodeURIComponent(`${property.name} ${location}`)}&output=embed`}
                                        width="100%"
                                        height="450"
                                        style={{ border: 0 }}
                                        loading="lazy"
                                        title={`${property.name} location`}
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
                                        <li>{location}</li>
                                        <li>{formattedPrice}</li>
                                        <li>{property.name}</li>
                                    </ul>
                                </div>

                                <div className="fd-sidebar-item">
                                    <h4>Recently Added</h4>
                                    {recentlyAdded.map((item) => (
                                        <div className="recently-item" key={item.id}>
                                            <img src={item.image} alt={item.name} width="50" />
                                            <Link to={`/flat/${item.slug}`}><span>{item.name}</span></Link>
                                        </div>
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
