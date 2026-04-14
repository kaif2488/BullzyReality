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
    const menuCloseTimeoutRef = useRef(null);
    const isHomePage = location.pathname === "/home";

    const clearMenuCloseTimeout = useCallback(() => {
        if (menuCloseTimeoutRef.current) {
            clearTimeout(menuCloseTimeoutRef.current);
            menuCloseTimeoutRef.current = null;
        }
    }, []);

    const queueMenuClose = useCallback(() => {
        clearMenuCloseTimeout();
        menuCloseTimeoutRef.current = setTimeout(() => {
            setIsMenuOpen(false);
        }, 5000);
    }, [clearMenuCloseTimeout]);

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
        return () => {
            clearMenuCloseTimeout();
        };
    }, [clearMenuCloseTimeout]);

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
        clearMenuCloseTimeout();
        setIsMenuOpen(false);
    }, [clearMenuCloseTimeout]);

    useEffect(() => {
        closeMenus();
    }, [location.pathname, closeMenus]);

    useEffect(() => {
        if (!isMenuOpen) {
            clearMenuCloseTimeout();
            return undefined;
        }

        queueMenuClose();

        const onPointerDown = (event) => {
            if (!headerRef.current?.contains(event.target)) {
                closeMenus();
            }
        };

        const onScrollClose = () => {
            closeMenus();
        };

        document.addEventListener("pointerdown", onPointerDown);
        window.addEventListener("scroll", onScrollClose, { passive: true });

        return () => {
            document.removeEventListener("pointerdown", onPointerDown);
            window.removeEventListener("scroll", onScrollClose);
        };
    }, [isMenuOpen, closeMenus, clearMenuCloseTimeout, queueMenuClose]);

    const onToggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    const onMenuInteraction = () => {
        if (!isMenuOpen) return;
        queueMenuClose();
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
        <div ref={headerRef} className={`header ${isHomePage ? "header-overlay" : ""} ${isScrolled ? "header-scrolled" : ""}`}>
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

                        <div
                            className={`collapse navbar-collapse header-collapse ${isMenuOpen ? "show" : ""}`}
                            id="navbarNav"
                            onPointerDown={onMenuInteraction}
                            onPointerMove={onMenuInteraction}
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
