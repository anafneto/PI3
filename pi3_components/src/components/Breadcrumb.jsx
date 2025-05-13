import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumb = () => {
    const location = useLocation();
    const paths = location.pathname.split("/").filter((path) => path);

    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb mb-3 ms-0" style={{ textTransform: "capitalize" }}>
                <li className="breadcrumb-item">
                    <Link to="/" className="text-decoration-none">Home</Link>
                </li>
                {paths.map((path, index) => {
                    const href = `/${paths.slice(0, index + 1).join("/")}`;
                    const isLast = index === paths.length - 1;

                    return (
                        <li
                            key={index}
                            className={`breadcrumb-item ${isLast ? "active" : ""}`}
                            aria-current={isLast ? "page" : undefined}
                        >
                            {isLast ? (
                                path
                            ) : (
                                <Link to={href} className="text-decoration-none">{path}</Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
};

export default Breadcrumb;