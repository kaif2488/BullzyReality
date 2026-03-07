import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import bullzzyLogo from "../assets/logo2.jpg";
import "./Header.css";

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isBrandExpanded, setIsBrandExpanded] = useState(true);
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
        <div className="header">
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <div className="container-fluid">
                        <Link className="navbar-brand header-brand" to="/home" onClick={closeMenus}>
                            <div
                                className={`d-flex align-items-center brand-wrap ${isBrandExpanded ? "brand-expanded" : "brand-collapsed"}`}
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

                        <button
                            className={`navbar-toggler header-toggler ${isMenuOpen ? "" : "collapsed"}`}
                            type="button"
                            aria-controls="navbarNav"
                            aria-expanded={isMenuOpen}
                            aria-label="Toggle navigation"
                            onClick={onToggleMenu}
                        >
                            <span className="toggler-line"></span>
                            <span className="toggler-line"></span>
                            <span className="toggler-line"></span>
                        </button>

                        <div className={`collapse navbar-collapse header-collapse ${isMenuOpen ? "show" : ""}`} id="navbarNav">
                            <ul className="navbar-nav ms-auto header-nav-links">
                                <li className="nav-item">
                                    <Link className="nav-link header-nav-link" to="/home" onClick={closeMenus}>Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link header-nav-link" to="/blog" onClick={closeMenus}>Blog</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link header-nav-link" to="/about" onClick={closeMenus}>About</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link header-nav-link" to="/contact" onClick={closeMenus}>Contact</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Header;
