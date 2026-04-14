import { useMemo, useState } from "react";

const whatsappNumber = "917039443733";

const Subscribe = () => {
    const [contactValue, setContactValue] = useState("");
    const [feedback, setFeedback] = useState({ type: "", text: "" });

    const isEmail = useMemo(() => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactValue.trim()), [contactValue]);
    const isPhone = useMemo(() => /^[+]?[0-9\s-]{8,15}$/.test(contactValue.trim()), [contactValue]);

    const onSubmit = (event) => {
        event.preventDefault();

        const trimmedValue = contactValue.trim();

        if (!trimmedValue) {
            setFeedback({ type: "error", text: "Enter your phone number or email first." });
            return;
        }

        if (!isEmail && !isPhone) {
            setFeedback({ type: "error", text: "Enter a valid phone number or email address." });
            return;
        }

        const message = [
            "Hello, I want to stay updated with Bullzy Realty.",
            "",
            `Contact: ${trimmedValue}`,
            `Preferred mode: ${isEmail ? "Email" : "Phone/WhatsApp"}`,
            "",
            "Please share buyer-focused property updates, new launches, and quick guidance."
        ].join("\n");

        const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
        window.open(whatsappLink, "_blank", "noopener,noreferrer");
        setFeedback({ type: "success", text: "Opening WhatsApp with your update request." });
        setContactValue("");
    };

    return (
        <section className="section-subscribe pt-5 pb-5 position-relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="subscribe-bg-decoration">
                <div className="decoration-circle circle-1"></div>
                <div className="decoration-circle circle-2"></div>
                <div className="decoration-circle circle-3"></div>
            </div>

            <div className="container position-relative">
                <div className="row align-items-center g-4">
                    <div className="col-12 col-lg-6">
                        <div className="subscribe-content">
                            <div className="subscribe-icon mb-3">
                                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M8 9H16" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    <path d="M8 12H14" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <h2 className="title mb-3">Stay Updated</h2>
                            <p className="sbs-description mb-4">
                                Get buyer-focused property updates, new launches, and quick guidance from Bullzy Realty.
                                Join thousands of satisfied customers who stay ahead in the real estate market.
                            </p>
                            <div className="subscribe-features">
                                <div className="feature-item">
                                    <span className="feature-icon">🏠</span>
                                    <span>Exclusive property deals</span>
                                </div>
                                <div className="feature-item">
                                    <span className="feature-icon">📈</span>
                                    <span>Market insights & trends</span>
                                </div>
                                <div className="feature-item">
                                    <span className="feature-icon">⚡</span>
                                    <span>Instant notifications</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-lg-6">
                        <div className="subscribe-form-container">
                            <form className="subscribe-form-shell" onSubmit={onSubmit}>
                                <div className="form-header mb-3">
                                    <h3 className="form-title">Get Started Today</h3>
                                    <p className="form-subtitle">Enter your contact details below</p>
                                </div>
                                <div className="row w-100 m-0 g-3">
                                    <div className="col-12">
                                        <div className="input-group">
                                            <span className="input-icon">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    <polyline points="22,6 12,13 2,6" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </span>
                                            <input
                                                type="text"
                                                className="w-100 sbs-area-inp"
                                                placeholder="Enter your phone or email"
                                                value={contactValue}
                                                onChange={(event) => {
                                                    setContactValue(event.target.value);
                                                    if (feedback.text) {
                                                        setFeedback({ type: "", text: "" });
                                                    }
                                                }}
                                                aria-label="Phone number or email"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-12">
                                        <button type="submit" className="w-100 btn btn-dark subscribe-submit-btn">
                                            <span className="btn-text">Send Update Request</span>
                                            <span className="btn-icon">
                                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                    <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </span>
                                        </button>
                                    </div>
                                </div>
                                {feedback.text ? (
                                    <div className={`subscribe-feedback ${feedback.type === "error" ? "is-error" : "is-success"} mt-3`}>
                                        <span className="feedback-icon">
                                            {feedback.type === "error" ? "⚠️" : "✅"}
                                        </span>
                                        {feedback.text}
                                    </div>
                                ) : null}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Subscribe;
