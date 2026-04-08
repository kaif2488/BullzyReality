import { useMemo, useState } from "react";

const isDriveImageUrl = (value = "") =>
    /^https?:\/\/(drive\.google\.com|lh3\.googleusercontent\.com)\//i.test(value.trim());

const PropertyImage = ({ src, alt = "", className = "", ...rest }) => {
    const [failed, setFailed] = useState(false);

    const resolvedSrc = useMemo(() => (typeof src === "string" ? src.trim() : ""), [src]);
    const canRenderImage = useMemo(() => isDriveImageUrl(resolvedSrc) && !failed, [failed, resolvedSrc]);

    if (!canRenderImage) {
        return <div className={`property-image-placeholder ${className}`.trim()} role="img" aria-label={alt} />;
    }

    return (
        <img
            src={resolvedSrc}
            alt={alt}
            className={className}
            loading="lazy"
            onError={() => setFailed(true)}
            {...rest}
        />
    );
};

export default PropertyImage;

