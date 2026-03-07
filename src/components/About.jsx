import aboutStageVideo from "../assets/buildanima.mp4";

const About = () => {
    const whatsappNumber = "917039443733";
    const whatsappDisplayNumber = "+91 70394 43733";
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        "Hello Bullzy Realty, I want property guidance."
    )}`;

    return (
        <section className="about about-apple">
            <div className="container page-content apple-about-shell">
                <div className="apple-about-head text-center">
                    <p className="apple-about-kicker">BULLZY REALTY</p>
                    <h1 className="apple-about-title">Confidence in every square foot</h1>
                    <p className="apple-about-subtitle">
                        A modern real-estate experience built for confident decisions, transparent guidance, and faster
                        communication.
                    </p>
                </div>

                <div className="row g-4 align-items-stretch">
                    <div className="col-12 col-lg-7">
                        <article className="apple-about-stage">
                            <video
                                className="apple-about-stage-video"
                                src={aboutStageVideo}
                                autoPlay
                                muted
                                loop
                                playsInline
                                preload="metadata"
                            />
                            <div className="apple-about-stage-caption">
                                <p className="apple-card-label">Reality Projects in Motion</p>
                                <h4 className="apple-card-value">Live visual perspective of modern developments</h4>
                            </div>
                        </article>
                    </div>

                    <div className="col-12 col-lg-5">
                        <article className="apple-about-info">
                            <h3 className="apple-info-title">Built for the Reality Field</h3>
                            <p className="apple-info-text">
                                We represent the real estate field through verified projects, practical comparisons,
                                and locality-first discovery. Every recommendation is structured around what matters in
                                actual buying decisions.
                            </p>

                            <ul className="apple-info-list">
                                <li><i className="fas fa-check-circle"></i> Verified listings with clear details</li>
                                <li><i className="fas fa-check-circle"></i> Developer-wise and location-wise browsing</li>
                                <li><i className="fas fa-check-circle"></i> Fast guidance directly on WhatsApp</li>
                            </ul>

                            <div className="apple-about-contact">
                                <p className="apple-contact-kicker">WhatsApp Assistance</p>
                                <h4 className="apple-contact-number">{whatsappDisplayNumber}</h4>
                                <div className="apple-contact-meta">
                                    <p><i className="fas fa-map-marker-alt"></i> Mumbai, India</p>
                                    <p><i className="fas fa-envelope"></i> bullzyreality@house.com</p>
                                    <p><i className="fas fa-clock"></i> 08:00 - 18:00</p>
                                </div>

                                <a href={whatsappLink} target="_blank" rel="noreferrer" className="btn apple-whatsapp-btn">
                                    <i className="fab fa-whatsapp"></i> Chat on WhatsApp
                                </a>
                            </div>
                        </article>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
