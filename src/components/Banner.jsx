import { useState } from "react";
import { useNavigate } from "react-router-dom";
import BudgetFilter from "./BudgetFilter";
import TypeFilter from "./TypeFilter";
import StatusFilter from "./StatusFilter";
import backgroundVideo from "../assets/Background_video.mp4";
import "./Banner.css";

const Banner = () => {
    const navigate = useNavigate();
    const [word, setWord] = useState("");
    const [selectedBudget, setSelectedBudget] = useState("all");
    const [selectedType, setSelectedType] = useState("all");
    const [selectedStatus, setSelectedStatus] = useState("all");

    const onSubmitSearch = (event) => {
        event.preventDefault();

        const params = new URLSearchParams({
            word: word.trim(),
            budget: selectedBudget,
            type: selectedType,
            status: selectedStatus
        });

        navigate(`/search?${params.toString()}`);
    };

    return (
        <div className="banner d-flex align-items-center">
            <div className="banner-media" aria-hidden="true">
                <video
                    className="banner-video"
                    src={backgroundVideo}
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                />
            </div>
            <div className="bg-custom banner-overlay">
                <div className="container">
                    <div className="row justify-content-start banner-row">
                        <div className="col-12 col-md-10 col-lg-8">
                            <div className="banner-area banner-content text-start pt-4 pb-4">
                                <div className="banner-premium-card">
                                    <h2 className="mt-2 mb-3 banner-title"><strong>BULLZY REALTY</strong></h2>
                                    <p className="banner-subtitle">Confidence in every square foot</p>

                                    <div className="banner-controls">
                                        <form className="search-panel" onSubmit={onSubmitSearch}>
                                            <div className="search-main-row">
                                                <input
                                                    value={word}
                                                    onChange={(event) => setWord(event.target.value)}
                                                    type="text"
                                                    className="inp-search"
                                                    aria-label="Search properties"
                                                    placeholder="Search by project, location, developer"
                                                />
                                                <button type="submit" className="btn-search">Search</button>
                                            </div>

                                            <div className="search-filter-row">
                                                <BudgetFilter
                                                    value={selectedBudget}
                                                    onChange={(event) => setSelectedBudget(event.target.value)}
                                                />
                                                <TypeFilter
                                                    value={selectedType}
                                                    onChange={(event) => setSelectedType(event.target.value)}
                                                />
                                                <StatusFilter
                                                    value={selectedStatus}
                                                    onChange={(event) => setSelectedStatus(event.target.value)}
                                                />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Banner;
