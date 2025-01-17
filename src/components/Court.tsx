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
        aspectRatio: {
          // More square-like on mobile, wider on larger screens
          base: '4/5',
          sm: '5/6',
          md: '3/4',
          lg: '16/9'
        },
        maxWidth: '100%',
        margin: '0 auto',
        minHeight: {
          base: '400px',
          sm: '500px',
          md: '600px',
          lg: '700px'
        },
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