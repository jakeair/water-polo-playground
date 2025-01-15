import React from "react";

const OlympicRings = ({ className = "", size = 120 }: { className?: string; size?: number }) => {
  return (
    <svg
      width={size}
      height={size / 2}
      viewBox="0 0 240 100"
      className={className}
    >
      {/* Blue Ring */}
      <circle cx="45" cy="35" r="25" fill="none" stroke="#0085C7" strokeWidth="6"/>
      {/* Yellow Ring */}
      <circle cx="120" cy="35" r="25" fill="none" stroke="#F4C300" strokeWidth="6"/>
      {/* Black Ring */}
      <circle cx="195" cy="35" r="25" fill="none" stroke="#000000" strokeWidth="6"/>
      {/* Green Ring */}
      <circle cx="82.5" cy="60" r="25" fill="none" stroke="#009F3D" strokeWidth="6"/>
      {/* Red Ring */}
      <circle cx="157.5" cy="60" r="25" fill="none" stroke="#DF0024" strokeWidth="6"/>
    </svg>
  );
};

export default OlympicRings;