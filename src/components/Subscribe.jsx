const Subscribe = () => {
    return (
        <section className="section-subscribe pt-5 pb-5">
            <div className="container">
                <div className="row align-items-center g-4">
                    <div className="col-12 col-lg-6">
                        <p className="title">Stay Updated</p>
                        <span className="sbs-description">
                            Get buyer-focused property updates, new launches, and quick guidance from Bullzy Realty.
                        </span>
                    </div>
                    <div className="col-12 col-lg-6">
                        <div className="subscribe-form-shell">
                            <div className="row w-100 m-0 g-2">
                                <div className="col-12 col-md-8">
                                    <input type="text" className="w-100 sbs-area-inp" placeholder="Enter your phone or email" />
                                </div>
                                <div className="col-12 col-md-4 d-flex align-items-stretch">
                                    <input type="submit" className="w-100 h-100 btn btn-dark subscribe-submit-btn" value="Send" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Subscribe
