import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import bullzzyLogo from "../assets/logo2.jpg";
import "./Header.css";

const Header = () => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isBrandExpanded, setIsBrandExpanded] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const headerRef = useRef(null);
    const brandCollapseTimeoutRef = useRef(null);
    const isHomePage = location.pathname === "/home";

    const clearBrandCollapseTimeout = useCallback(() => {
        if (brandCollapseTimeoutRef.current) {
            clearTimeout(brandCollapseTimeoutRef.current);
            brandCollapseTimeoutRef.current = null;
        }
    }, []);

    const queueBrandCollapse = useCallback(() => {
        clearBrandCollapseTimeout();
        brandCollapseTimeoutRef.current = setTimeout(() => {
            setIsBrandExpanded(false);
        }, 3000);
    }, [clearBrandCollapseTimeout]);

    useEffect(() => {
        queueBrandCollapse();

        return () => {
            clearBrandCollapseTimeout();
        };
    }, [clearBrandCollapseTimeout, queueBrandCollapse]);

    useEffect(() => {
        const onScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });

        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, []);

    const closeMenus = useCallback(() => {
        setIsMenuOpen(false);
    }, []);

    useEffect(() => {
        closeMenus();
    }, [location.pathname, closeMenus]);

    useEffect(() => {
        if (!isMenuOpen) {
            return undefined;
        }

        const onPointerDown = (event) => {
            if (!headerRef.current?.contains(event.target)) {
                closeMenus();
            }
        };

        const onKeyDown = (event) => {
            if (event.key === "Escape") {
                closeMenus();
            }
        };

        document.addEventListener("pointerdown", onPointerDown);
        document.addEventListener("keydown", onKeyDown);

        return () => {
            document.removeEventListener("pointerdown", onPointerDown);
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [isMenuOpen, closeMenus]);

    const onToggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const expandBrand = () => {
        clearBrandCollapseTimeout();
        setIsBrandExpanded(true);
    };

    const collapseBrandAfterDelay = () => {
        queueBrandCollapse();
    };

    const onBrandBlur = (event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) {
            collapseBrandAfterDelay();
        }
    };

    return (
        <div ref={headerRef} className={`header ${isHomePage ? "header-overlay" : ""} ${isScrolled ? "header-scrolled" : ""}`}>
            <div className="container">
                <nav className="navbar navbar-expand-lg navbar-light">
                    <div className="container-fluid">
                        <Link
                            className="navbar-brand header-brand"
                            to="/home"
                            onBlur={onBrandBlur}
                            onClick={closeMenus}
                            onFocus={expandBrand}
                            onMouseEnter={expandBrand}
                            onMouseLeave={collapseBrandAfterDelay}
                        >
                            <div className={`d-flex align-items-center brand-wrap ${isBrandExpanded ? "brand-expanded" : "brand-collapsed"}`}>
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

                        <div
                            className={`collapse navbar-collapse header-collapse ${isMenuOpen ? "show" : ""}`}
                            id="navbarNav"
                        >
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
