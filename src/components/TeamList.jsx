import Title from "./Title"
import TeamItem from "./TeamItem"

const TeamList = () => {
    const title = {
        text: "Bullzy Reality",
        description: "Point of Contacts"
    }
    return (
        <section className="section-teams position-relative overflow-hidden">
            {/* Background decorative elements */}
            <div className="teams-bg-decoration">
                <div className="decoration-shape shape-1"></div>
                <div className="decoration-shape shape-2"></div>
                <div className="decoration-shape shape-3"></div>
            </div>

            <div className="container position-relative">
                <div className="teams-header text-center mb-5">
                    <div className="section-icon mb-3">
                        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17 20H7C5.89543 20 5 19.1046 5 18V9C5 7.89543 5.89543 7 7 7H17C18.1046 7 19 7.89543 19 9V18C19 19.1046 18.1046 20 17 20Z" stroke="#4b5698" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M12 3V7" stroke="#4b5698" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M8 3V7" stroke="#4b5698" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M16 3V7" stroke="#4b5698" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <circle cx="9" cy="12" r="1" fill="#4b5698"/>
                            <circle cx="12" cy="12" r="1" fill="#4b5698"/>
                            <circle cx="15" cy="12" r="1" fill="#4b5698"/>
                            <circle cx="9" cy="15" r="1" fill="#4b5698"/>
                            <circle cx="12" cy="15" r="1" fill="#4b5698"/>
                            <circle cx="15" cy="15" r="1" fill="#4b5698"/>
                        </svg>
                    </div>
                    <Title title={title.text} description={title.description} />
                    <p className="teams-subtitle">
                        Meet our expert team of real estate professionals dedicated to helping you find your dream property
                    </p>
                </div>

                <div className="row g-4">
                    <TeamItem/>
                    <TeamItem/>
                    <TeamItem/>
                </div>
            </div>
        </section>
    )
}

export default TeamList;