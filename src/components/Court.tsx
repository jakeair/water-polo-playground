import React from 'react';

interface CourtProps {
  children: React.ReactNode;
  width?: number;
  height?: number;
}

const Court: React.FC<CourtProps> = ({ children, width, height }) => {
  return (
    <div 
      className="court relative"
      style={{ 
        aspectRatio: '5/7',
        width: '100%',
        maxWidth: '100%',
        margin: '0 auto',
        overflow: 'visible',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {children}
    </div>
  );
};

export default Court;