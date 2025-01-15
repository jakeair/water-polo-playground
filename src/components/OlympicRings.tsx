import React from "react";

const OlympicRings = ({ className = "", size = 120 }: { className?: string; size?: number }) => {
  const ringRadius = size / 6;
  const strokeWidth = size / 30;
  
  return (
    <svg
      width={size}
      height={size / 2}
      viewBox="0 0 300 150"
      className={className}
    >
      {/* Blue Ring */}
      <circle cx="60" cy="60" r="30" fill="none" stroke="#0085C7" strokeWidth="8"/>
      {/* Yellow Ring */}
      <circle cx="150" cy="60" r="30" fill="none" stroke="#F4C300" strokeWidth="8"/>
      {/* Black Ring */}
      <circle cx="240" cy="60" r="30" fill="none" stroke="#000000" strokeWidth="8"/>
      {/* Green Ring */}
      <circle cx="105" cy="90" r="30" fill="none" stroke="#009F3D" strokeWidth="8"/>
      {/* Red Ring */}
      <circle cx="195" cy="90" r="30" fill="none" stroke="#DF0024" strokeWidth="8"/>
    </svg>
  );
};

export default OlympicRings;