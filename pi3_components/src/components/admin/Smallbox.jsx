import React from "react";

const SmallBox = ({ color, value, label, iconPath, link }) => {
  return (
    <div className={`col-lg mb-4`}>
      <div className={`small-box text-bg-${color}`}>
        <div className="inner">
          <h3>{value}</h3>
          <p>{label}</p>
        </div>
        <svg
          className="small-box-icon"
          fill="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d={iconPath}></path>
        </svg>
        <a
          href={link}
          className="small-box-footer link-light link-underline-opacity-0 link-underline-opacity-50-hover"
        >
          More info <i className="bi bi-link-45deg"></i>
        </a>
      </div>
    </div>
  );
};

export default SmallBox;