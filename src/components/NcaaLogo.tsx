import React from "react";

const NcaaLogo = ({ className = "", size = 120 }: { className?: string; size?: number }) => {
  return (
    <svg
      width={size}
      height={size / 2}
      viewBox="0 0 200 80"
      className={className}
    >
      {/* NCAA Text */}
      <text
        x="100"
        y="50"
        textAnchor="middle"
        dominantBaseline="middle"
        fill="#ffffff"
        fontSize="48"
        fontWeight="bold"
        fontFamily="Arial, sans-serif"
        className="drop-shadow-lg"
      >
        NCAA
      </text>
      {/* Decorative Lines */}
      <line x1="30" y1="20" x2="170" y2="20" stroke="#ffffff" strokeWidth="4"/>
      <line x1="30" y1="60" x2="170" y2="60" stroke="#ffffff" strokeWidth="4"/>
    </svg>
  );
};

export default NcaaLogo;