import { Link } from "react-router-dom";
import { propertyImageFallback } from "../data/propertySearchData";

const FlatItem = ({ property, wrapperClass = "text-center col-lg-4 col-12 col-md-6" }) => {
    if (!property) return null;

    const handleImageError = (event) => {
        event.currentTarget.onerror = null;
        event.currentTarget.src = propertyImageFallback;
    };

    return (
        <div className={wrapperClass}>
            <div className="item">
                <div className="item-image">
                    <img src={property.image || propertyImageFallback} alt={property.name} className="img-fluid" onError={handleImageError} />
                </div>
                <div className="item-description">
                    <div className="d-flex justify-content-between mb-3">
                        <span className="item-title">{property.name}</span>
                        <span className="item-price">
                            {property.priceLabel || "Price on request"}
                        </span>
                    </div>
                    <small className="d-block text-muted mb-2">{property.locality || property.location}</small>
                    <div className="item-icon d-flex alig-items-center justify-content-between">
                        <div>
                            <i className="fas fa-check-circle"></i> <span>{property.type}</span>
                        </div>
                        <div>
                            <i className="fas fa-check-circle"></i> <span>{property.status}</span>
                        </div>
                        <Link to={`/flat/${property.slug}`} className="item-title">
                            <button className="btn btn-detail">View</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FlatItem;
