import React from 'react';
import ColorPicker from './ColorPicker';

interface TeamColorPickerProps {
  team1Color: string;
  team2Color: string;
  onTeam1ColorChange: (color: string) => void;
  onTeam2ColorChange: (color: string) => void;
}

const TeamColorPicker: React.FC<TeamColorPickerProps> = ({
  team1Color,
  team2Color,
  onTeam1ColorChange,
  onTeam2ColorChange,
}) => {
  return (
    <div className="flex flex-col gap-4">
      <ColorPicker
        color={team1Color}
        onChange={onTeam1ColorChange}
        label="Team 1 Color"
      />
      <ColorPicker
        color={team2Color}
        onChange={onTeam2ColorChange}
        label="Team 2 Color"
      />
    </div>
  );
};

export default TeamColorPicker;