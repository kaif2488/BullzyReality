import { useState } from "react";

const Contact = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [subject, setSubject] = useState("");
    const [message, setMessage] = useState("");
    const whatsappNumber = "917039443733";

    const handleSendMessage = () => {
        const trimmedName = name.trim();
        const trimmedPhone = phone.trim();
        const trimmedSubject = subject.trim();
        const trimmedMessage = message.trim();

        if (!trimmedName || !trimmedPhone || !trimmedSubject) {
            alert("Please fill Name, Phone, and Subject before sending.");
            return;
        }

        const details = [
            "Hello Bullzy Realty, I want to connect.",
            `Name: ${trimmedName}`,
            `Phone: ${trimmedPhone}`,
            `Subject: ${trimmedSubject}`,
            `Message: ${trimmedMessage || "Not provided"}`
        ];

        const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(details.join("\n"))}`;
        window.open(whatsappLink, "_blank", "noopener,noreferrer");
    };

    return (
        <section className="contact">
            <div className="page-top">
                <div className="container">
                    <div className="row contact-first-row">
                        <div className="col-lg-12">
                            <h1 className="page-title">Contact</h1>
                            <h2 className="page-description">Get instant help</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="page-content">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="row contact-info-row g-3">
                                <div className="col-12 col-md-6 col-lg-4 d-flex">
                                    <div className="contact-item">
                                        <i className="fas fa-envelope"></i>
                                        <h5>Mail</h5>
                                        <h6>bullzyreality@gmail.com</h6>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-4 d-flex">
                                    <div className="contact-item">
                                        <i className="fas fa-map-marker-alt"></i>
                                        <h5>Address</h5>
                                        <h6>Mumbai</h6>
                                    </div>
                                </div>
                                <div className="col-12 col-md-6 col-lg-4 d-flex">
                                    <div className="contact-item">
                                        <i className="fas fa-phone-alt"></i>
                                        <h5>Phone</h5>
                                        <h6>70394 43733</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-12">
                            <div className="row contact-form-row g-3">
                                <div className="col-12 col-md-6">
                                    <label>Name Surname</label>
                                    <input
                                        type="text"
                                        className="inp-contact"
                                        required
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <label>Phone</label>
                                    <input
                                        type="tel"
                                        className="inp-contact"
                                        required
                                        value={phone}
                                        onChange={(event) => setPhone(event.target.value)}
                                    />
                                </div>
                                <div className="col-12">
                                    <label>Subject</label>
                                    <input
                                        type="text"
                                        className="inp-contact"
                                        required
                                        value={subject}
                                        onChange={(event) => setSubject(event.target.value)}
                                    />
                                </div>
                                <div className="col-12">
                                    <label>Message</label>
                                    <textarea
                                        type="text"
                                        className="ta-contact"
                                        rows="4"
                                        value={message}
                                        onChange={(event) => setMessage(event.target.value)}
                                    ></textarea>
                                </div>
                                <div className="col-12 contact-form-actions">
                                    <button type="button" className="btn-contact" onClick={handleSendMessage}>
                                        <i className="fab fa-whatsapp" aria-hidden="true"></i>
                                        Send on WhatsApp
                                    </button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contact
