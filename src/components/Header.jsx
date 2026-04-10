import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import bullzzyLogo from "../assets/logo2.jpg";
import "./Header.css";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isBrandExpanded, setIsBrandExpanded] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const brandCollapseTimeoutRef = useRef(null);

    const queueBrandCollapse = useCallback(() => {
        if (brandCollapseTimeoutRef.current) {
            clearTimeout(brandCollapseTimeoutRef.current);
        }
        brandCollapseTimeoutRef.current = setTimeout(() => {
            setIsBrandExpanded(false);
        }, 2600);
    }, []);

    useEffect(() => {
        queueBrandCollapse();
        return () => {
            if (brandCollapseTimeoutRef.current) {
                clearTimeout(brandCollapseTimeoutRef.current);
            }
        };
    }, [queueBrandCollapse]);

    useEffect(() => {
        const onScroll = () => setIsScrolled(window.scrollY > 12);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const closeMenus = () => {
        setIsMenuOpen(false);
    };

    const onToggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const onBrandMouseEnter = () => {
        if (brandCollapseTimeoutRef.current) {
            clearTimeout(brandCollapseTimeoutRef.current);
        }
        setIsBrandExpanded(true);
    };

    const onBrandMouseLeave = () => {
        queueBrandCollapse();
    };

    return (
        <nav className={`header ${isScrolled ? "header-scrolled" : ""}`} aria-label="Primary navigation">
            <div className="nav-container">
                <Link className="header-brand header-glass" to="/home" onClick={closeMenus}>
                    <div
                        className={`brand-wrap ${isBrandExpanded ? "brand-expanded" : "brand-collapsed"}`}
                        onMouseEnter={onBrandMouseEnter}
                        onMouseLeave={onBrandMouseLeave}
                    >
                        <span className="logo-shell">
                            <img src={bullzzyLogo} alt="Bullzzy Realty Logo" className="logo-img" />
                        </span>
                        <span className="brand-text-shell">
                            <span className="brand-text">BULLZY REALTY</span>
                        </span>
                    </div>
                </Link>

                <div className="nav-actions">
                    <button
                        className={`header-toggler ${isMenuOpen ? "is-open" : ""}`}
                        type="button"
                        aria-controls="primaryNavLinks"
                        aria-expanded={isMenuOpen}
                        aria-label="Toggle navigation"
                        onClick={onToggleMenu}
                    >
                        <span className="toggler-line"></span>
                        <span className="toggler-line"></span>
                        <span className="toggler-line"></span>
                    </button>

                    <div
                        id="primaryNavLinks"
                        className={`nav-links header-glass ${isMenuOpen ? "is-open" : ""}`}
                    >
                        <Link className="nav-link" to="/home" onClick={closeMenus}>Home</Link>
                        <Link className="nav-link" to="/blog" onClick={closeMenus}>Blog</Link>
                        <Link className="nav-link" to="/about" onClick={closeMenus}>About</Link>
                        <Link className="nav-link" to="/contact" onClick={closeMenus}>Contact</Link>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
