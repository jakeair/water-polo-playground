import React from 'react';

interface CourtProps {
  children: React.ReactNode;
  width?: number;
  height?: number;
}

const Court: React.FC<CourtProps> = ({ children, width, height }) => {
  return (
    <div 
      className="court relative w-full h-full"
      style={{ 
        aspectRatio: '5/7',
        maxWidth: '100%',
        margin: '0 auto',
        minHeight: '500px',
        overflow: 'visible',
      }}
    >
      <div className="goal goal-top">
        <div className="goal-net" />
      </div>
      <div className="goal goal-bottom">
        <div className="goal-net" />
      </div>

      <div className="line two-meter-line" style={{ top: '8%' }}></div>
      <div className="line five-meter-line" style={{ top: '20%' }}></div>
      <div className="line six-meter-line" style={{ top: '24%' }}></div>
      <div className="line two-meter-line" style={{ bottom: '8%' }}></div>
      <div className="line five-meter-line" style={{ bottom: '20%' }}></div>
      <div className="line six-meter-line" style={{ bottom: '24%' }}></div>
      <div className="line halfway-line" style={{ top: '50%' }}></div>

      {children}
    </div>
  );
};

export default Court;