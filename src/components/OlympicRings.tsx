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
      <circle cx="36" cy="30" r="20" fill="none" stroke="#0085C7" strokeWidth="6"/>
      {/* Yellow Ring */}
      <circle cx="90" cy="30" r="20" fill="none" stroke="#F4C300" strokeWidth="6"/>
      {/* Black Ring */}
      <circle cx="144" cy="30" r="20" fill="none" stroke="#000000" strokeWidth="6"/>
      {/* Green Ring */}
      <circle cx="63" cy="50" r="20" fill="none" stroke="#009F3D" strokeWidth="6"/>
      {/* Red Ring */}
      <circle cx="117" cy="50" r="20" fill="none" stroke="#DF0024" strokeWidth="6"/>
    </svg>
  );
};

export default OlympicRings;