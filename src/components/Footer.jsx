import { Link } from "react-router-dom";

const Footer = () => {
    const whatsappNumber = "917039443733";
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        "Hello Bullzy Realty, I want property guidance."
    )}`;
    const facebookPageUrl = "https://www.facebook.com/Bullzyrealty/";
    const instagramUrl = "https://share.google/IjBMi5caEFgp6rolY";
    const linkedInUrl = "https://share.google/933nfR37riazmbKwk";

    return (
        <section className="footer">
            <div className="container">
                <div className="row g-4">
                    <div className="col-lg-3 col-md-6">
                        <i className="fas fa-home"></i>
                        <span className="footer-other-text d-block mt-3 mb-3">
                            Bullzy Realty helps buyers discover verified projects, compare practical options, and make
                            confident real estate decisions across Mumbai.
                        </span>
                        <div className="footer-social">
                            <a className="footer-social-item" href={facebookPageUrl} target="_blank" rel="noreferrer" aria-label="Facebook">
                                <i className="fab fa-facebook-f"></i>
                            </a>
                            <a className="footer-social-item" href={instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram">
                                <i className="fab fa-instagram"></i>
                            </a>
                            <a className="footer-social-item" href={linkedInUrl} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                                <i className="fab fa-linkedin-in"></i>
                            </a>
                            <a className="footer-social-item" href={whatsappLink} target="_blank" rel="noreferrer" aria-label="WhatsApp">
                                <i className="fab fa-whatsapp"></i>
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <p className="footer-title">Quick Links</p>
                        <ul className="footer-ul">
                            <li><Link className="footer-link" to="/home">Home</Link></li>
                            <li><Link className="footer-link" to="/about">About</Link></li>
                            <li><Link className="footer-link" to="/blog">Blog</Link></li>
                            <li><Link className="footer-link" to="/contact">Contact</Link></li>
                        </ul>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <div>
                            <p className="footer-title">Explore</p>
                            <ul className="footer-ul">
                                <li><Link className="footer-link" to="/search">Search Properties</Link></li>
                                <li><Link className="footer-link" to="/developer-projects">Top Developers</Link></li>
                                <li><Link className="footer-link" to="/location-projects">Top Localities</Link></li>
                                <li><a className="footer-link" href={whatsappLink} target="_blank" rel="noreferrer">WhatsApp Guidance</a></li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <p className="footer-title">Contact</p>
                        <ul className="footer-ul">
                            <li className="d-flex">
                                <div className="footer-info-item"><i className="fas fa-clock"></i></div> <span>08:00-18:00</span>
                            </li>
                            <li className="d-flex">
                                <div className="footer-info-item" ><i className="fas fa-envelope"></i></div> <a className="footer-link" href="mailto:bullzyreality@gmail.com">bullzyreality@gmail.com</a>
                            </li>
                            <li className="d-flex">
                                <div className="footer-info-item"><i className="fas fa-map-marker-alt"></i></div> <span>Mumbai</span>
                            </li>
                            <li className="d-flex">
                                <div className="footer-info-item"><i className="fas fa-phone-alt"></i></div> <a className="footer-link" href="tel:+917039443733">+91 70394 43733</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Footer
