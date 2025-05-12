    // src/components/Breadcrumb.js
    import React from "react";
    import { Link } from "react-router-dom";

    const Breadcrumb = ({ paths }) => {
    return (
        <nav aria-label="breadcrumb">
        <ol className="breadcrumb mb-3 ms-5">
            {paths.map((path, index) => (
            <li
                key={index}
                className={`breadcrumb-item ${index === paths.length - 1 ? "active" : ""}`}
                aria-current={index === paths.length - 1 ? "page" : undefined}
            >
                {index === paths.length - 1 ? (
                path.label
                ) : (
                <Link to={path.href} className="text-decoration-none">{path.label}</Link>
                )}
            </li>
            ))}
        </ol>
        </nav>
    );
    };

    export default Breadcrumb;
