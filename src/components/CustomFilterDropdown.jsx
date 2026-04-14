import { useEffect, useMemo, useRef, useState } from "react";

const CustomFilterDropdown = ({ value, onChange, options = [], placeholder = "Select option" }) => {
    const dropdownRef = useRef(null);
    const [isOpen, setIsOpen] = useState(false);

    const selectedOption = useMemo(() => {
        return options.find((option) => option.value === value) || options[0] || null;
    }, [options, value]);

    useEffect(() => {
        if (!isOpen) return undefined;

        const onPointerDown = (event) => {
            if (!dropdownRef.current?.contains(event.target)) {
                setIsOpen(false);
            }
        };

        const onKeyDown = (event) => {
            if (event.key === "Escape") {
                setIsOpen(false);
            }
        };

        document.addEventListener("pointerdown", onPointerDown);
        document.addEventListener("keydown", onKeyDown);

        return () => {
            document.removeEventListener("pointerdown", onPointerDown);
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [isOpen]);

    const handleSelect = (nextValue) => {
        onChange?.({ target: { value: nextValue } });
        setIsOpen(false);
    };

    return (
        <div className={`budget-filter-area custom-filter ${isOpen ? "is-open" : ""}`} ref={dropdownRef}>
            <button
                type="button"
                className="budget-select custom-filter-trigger"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                onClick={() => setIsOpen((prev) => !prev)}
            >
                <span>{selectedOption?.label || placeholder}</span>
                <span className="custom-filter-chevron" aria-hidden="true">
                    <i className="fas fa-chevron-down"></i>
                </span>
            </button>

            <div className="custom-filter-menu" role="listbox" aria-hidden={!isOpen}>
                {options.map((option) => {
                    const isSelected = option.value === value;

                    return (
                        <button
                            key={option.value}
                            type="button"
                            role="option"
                            aria-selected={isSelected}
                            className={`custom-filter-option ${isSelected ? "is-selected" : ""}`}
                            onClick={() => handleSelect(option.value)}
                        >
                            <span>{option.label}</span>
                            {isSelected ? <i className="fas fa-check" aria-hidden="true"></i> : null}
                        </button>
                    );
                })}
            </div>
        </div>
    );
};

export default CustomFilterDropdown;
