const TeamItem = () => {
    return (
        <div className="col-12 col-md-6 col-lg-4">
            <div className="team-card">
                <div className="team-image-container">
                    <div className="team-img">
                        <img src="/img/team.jpg" alt="team" />
                        <div className="team-overlay">
                            <div className="overlay-content">
                                <h6>Contact Me</h6>
                                <p>Let's discuss your property needs</p>
                            </div>
                        </div>
                    </div>
                    <div className="team-badge">
                        <span className="badge-icon">⭐</span>
                        <span className="badge-text">Expert</span>
                    </div>
                </div>

                <div className="team-info">
                    <div className="team-header">
                        <h5 className="team-name">Lorem Ipsum</h5>
                        <h6 className="team-position">Real Estate Specialist</h6>
                    </div>

                    <div className="team-contact">
                        <div className="contact-item">
                            <span className="contact-icon">📧</span>
                            <span>contact@bullzy.com</span>
                        </div>
                        <div className="contact-item">
                            <span className="contact-icon">📱</span>
                            <span>+91 98765 43210</span>
                        </div>
                    </div>

                    <div className="social-links">
                        <div className="social-item facebook">
                            <i className="fab fa-facebook-f"></i>
                        </div>
                        <div className="social-item twitter">
                            <i className="fab fa-twitter"></i>
                        </div>
                        <div className="social-item instagram">
                            <i className="fab fa-instagram"></i>
                        </div>
                        <div className="social-item linkedin">
                            <i className="fab fa-linkedin-in"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TeamItem
