import React, { useState } from 'react';
import WaterPoloCourt from '@/components/WaterPoloCourt';
import Toolbar from '@/components/Toolbar';
import Help from '@/components/Help';
import { Toaster } from 'sonner';

const Index = () => {
  const [team1Color, setTeam1Color] = useState('#FF0000');
  const [team2Color, setTeam2Color] = useState('#0000FF');
  const [isDrawing, setIsDrawing] = useState(false);
  const [isErasing, setIsErasing] = useState(false);
  const [strokeColor, setStrokeColor] = useState('#000000');
  const [strokeWidth, setStrokeWidth] = useState(2);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Help Section at the top */}
        <Help />
        
        <Toolbar
          team1Color={team1Color}
          team2Color={team2Color}
          onTeam1ColorChange={setTeam1Color}
          onTeam2ColorChange={setTeam2Color}
          isDrawing={isDrawing}
          setIsDrawing={setIsDrawing}
          isErasing={isErasing}
          setIsErasing={setIsErasing}
          strokeColor={strokeColor}
          setStrokeColor={setStrokeColor}
          strokeWidth={strokeWidth}
          setStrokeWidth={setStrokeWidth}
        />

        <WaterPoloCourt
          team1Color={team1Color}
          team2Color={team2Color}
          onTeam1ColorChange={setTeam1Color}
          onTeam2ColorChange={setTeam2Color}
          isDrawing={isDrawing}
          isErasing={isErasing}
          strokeColor={strokeColor}
          strokeWidth={strokeWidth}
        />
      </div>
      <Toaster />
    </div>
  );
};

export default Index;