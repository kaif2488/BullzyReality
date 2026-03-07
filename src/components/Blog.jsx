import { useMemo, useState } from "react";

const Blog = () => {
    const [suggestion, setSuggestion] = useState("");
    const whatsappNumber = "917039443733";

    const whatsappLink = useMemo(() => {
        const trimmedSuggestion = suggestion.trim();
        const message = trimmedSuggestion
            ? `Hello Bullzy Realty, suggestion: ${trimmedSuggestion}`
            : "Hello Bullzy Realty, I have a suggestion.";

        return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    }, [suggestion]);

    return (
        <section className="blog">
            <div className="page-top">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <h1 className="page-title">Blog</h1>
                            <h2 className="page-description">Updates</h2>
                        </div>
                    </div>
                </div>
            </div>

            <div className="page-content">
                <div className="container">
                    <div className="blog-maintenance-card">
                        <h3 className="blog-maintenance-title">We are working on it.</h3>
                        <p className="blog-maintenance-text">
                            New blog content will be available soon. Share your suggestions with us on WhatsApp.
                        </p>
                        

                        <label className="blog-suggestion-label" htmlFor="blog-suggestion">Suggestion Box</label>
                        <textarea
                            id="blog-suggestion"
                            className="blog-suggestion-textarea"
                            placeholder="Type your suggestion here"
                            value={suggestion}
                            onChange={(event) => setSuggestion(event.target.value)}
                            rows={5}
                        />

                        <a href={whatsappLink} target="_blank" rel="noreferrer" className="btn blog-whatsapp-btn">
                            <i className="fab fa-whatsapp"></i> Send on WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Blog;
