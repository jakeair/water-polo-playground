import React from "react";

const OlympicRings = ({ className = "", size = 120 }: { className?: string; size?: number }) => {
  return (
    <svg
      width={size}
      height={size / 2}
      viewBox="0 0 200 80"
      className={className}
    >
      {/* Blue Ring */}
      <circle cx="40" cy="30" r="20" fill="none" stroke="#0EA5E9" strokeWidth="4"/>
      {/* Black Ring */}
      <circle cx="85" cy="30" r="20" fill="none" stroke="#221F26" strokeWidth="4"/>
      {/* Red Ring */}
      <circle cx="130" cy="30" r="20" fill="none" stroke="#ea384c" strokeWidth="4"/>
      {/* Yellow Ring */}
      <circle cx="62.5" cy="50" r="20" fill="none" stroke="#F4C300" strokeWidth="4"/>
      {/* Green Ring */}
      <circle cx="107.5" cy="50" r="20" fill="none" stroke="#009F3D" strokeWidth="4"/>
    </svg>
  );
};

export default OlympicRings;