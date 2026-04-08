import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logoAnimVideo from "../assets/logoanim.mp4";

const IntroSplash = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const redirectTimer = setTimeout(() => {
            navigate("/home", { replace: true });
        }, 8000);

        return () => clearTimeout(redirectTimer);
    }, [navigate]);

    return (
        <section className="intro-splash" aria-label="Intro">
            <div className="intro-splash-inner">
                <video
                    className="intro-splash-video"
                    src={logoAnimVideo}
                    autoPlay
                    muted
                    playsInline
                    preload="auto"
                />
            </div>
        </section>
    );
};

export default IntroSplash;
