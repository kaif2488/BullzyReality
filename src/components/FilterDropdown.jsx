import React, { useEffect, useId, useMemo, useRef, useState } from "react";

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const FilterDropdown = ({ options, value, onChange, ariaLabel, className = "", triggerClassName = "" }) => {
    const instanceId = useId();
    const rootRef = useRef(null);
    const triggerRef = useRef(null);
    const panelRef = useRef(null);

    const [isOpen, setIsOpen] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);

    const selectedIndex = useMemo(
        () => options.findIndex((option) => option.value === value),
        [options, value]
    );

    const selectedOption = useMemo(() => {
        if (selectedIndex >= 0) return options[selectedIndex];
        return options[0];
    }, [options, selectedIndex]);

    useEffect(() => {
        if (!isOpen) return;

        const onDocumentMouseDown = (event) => {
            if (!rootRef.current) return;
            if (rootRef.current.contains(event.target)) return;
            setIsOpen(false);
        };

        document.addEventListener("mousedown", onDocumentMouseDown);
        return () => document.removeEventListener("mousedown", onDocumentMouseDown);
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) return;

        const id = window.setTimeout(() => {
            panelRef.current?.focus();
        }, 0);

        return () => window.clearTimeout(id);
    }, [isOpen]);

    const selectOption = (option) => {
        onChange?.({ target: { value: option.value } });
        setIsOpen(false);
        window.setTimeout(() => triggerRef.current?.focus(), 0);
    };

    const openDropdown = (indexToActivate) => {
        setIsOpen(true);
        setActiveIndex(clamp(indexToActivate, 0, Math.max(0, options.length - 1)));
    };

    const closeDropdown = () => {
        setIsOpen(false);
        setActiveIndex(-1);
    };

    const onToggle = () => {
        setIsOpen((prev) => {
            const next = !prev;
            if (next) {
                setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
            } else {
                setActiveIndex(-1);
            }
            return next;
        });
    };

    const onTriggerKeyDown = (event) => {
        if (event.key === "ArrowDown") {
            event.preventDefault();
            if (!isOpen) return openDropdown(selectedIndex >= 0 ? selectedIndex : 0);
            setActiveIndex((prev) => clamp(prev + 1, 0, options.length - 1));
            return;
        }

        if (event.key === "ArrowUp") {
            event.preventDefault();
            if (!isOpen) return openDropdown(selectedIndex >= 0 ? selectedIndex : options.length - 1);
            setActiveIndex((prev) => clamp(prev - 1, 0, options.length - 1));
            return;
        }

        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onToggle();
        }

        if (event.key === "Escape") {
            event.preventDefault();
            closeDropdown();
        }
    };

    const onPanelKeyDown = (event) => {
        if (event.key === "ArrowDown") {
            event.preventDefault();
            setActiveIndex((prev) => clamp(prev + 1, 0, options.length - 1));
            return;
        }

        if (event.key === "ArrowUp") {
            event.preventDefault();
            setActiveIndex((prev) => clamp(prev - 1, 0, options.length - 1));
            return;
        }

        if (event.key === "Home") {
            event.preventDefault();
            setActiveIndex(0);
            return;
        }

        if (event.key === "End") {
            event.preventDefault();
            setActiveIndex(Math.max(0, options.length - 1));
            return;
        }

        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            const option = options[activeIndex];
            if (option) selectOption(option);
            return;
        }

        if (event.key === "Escape") {
            event.preventDefault();
            closeDropdown();
            triggerRef.current?.focus();
        }
    };

    const panelId = `${instanceId}-panel`;
    const activeDescendantId = activeIndex >= 0 ? `${instanceId}-opt-${activeIndex}` : undefined;

    return (
        <div className={className} ref={rootRef}>
            <button
                ref={triggerRef}
                type="button"
                className={`${triggerClassName} filter-dropdown-trigger`}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-controls={panelId}
                aria-label={ariaLabel}
                onClick={onToggle}
                onKeyDown={onTriggerKeyDown}
            >
                <span className="filter-dropdown-value">{selectedOption?.label ?? ""}</span>
            </button>

            {isOpen && (
                <div
                    ref={panelRef}
                    id={panelId}
                    className="filter-dropdown-panel"
                    role="listbox"
                    tabIndex={-1}
                    aria-label={ariaLabel}
                    aria-activedescendant={activeDescendantId}
                    onKeyDown={onPanelKeyDown}
                >
                    <div className="filter-dropdown-list">
                        {options.map((option, index) => {
                            const isSelected = option.value === value;
                            const isActive = index === activeIndex;

                            return (
                                <button
                                    id={`${instanceId}-opt-${index}`}
                                    key={option.value}
                                    type="button"
                                    role="option"
                                    aria-selected={isSelected}
                                    className={`filter-dropdown-option${isSelected ? " is-selected" : ""}${
                                        isActive ? " is-active" : ""
                                    }`}
                                    onMouseEnter={() => setActiveIndex(index)}
                                    onClick={() => selectOption(option)}
                                >
                                    {option.label}
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
};

export default FilterDropdown;

