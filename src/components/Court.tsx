import React from 'react';

interface CourtProps {
  width: number;
  height: number;
  children: React.ReactNode;
}

const Court: React.FC<CourtProps> = ({ width, height, children }) => {
  return (
    <div 
      className="court relative"
      style={{ 
        aspectRatio: '5/7',
        height: 'calc(100% - 80px)', // Reduced timeline space for desktop
        width: '100%',
        maxWidth: '1000px', // Limit maximum width on large screens
        margin: '0 auto',
        overflow: 'visible',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        paddingTop: '2rem',
        paddingBottom: '2rem'
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