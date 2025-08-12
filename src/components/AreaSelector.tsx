import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Area } from '../types';

interface AreaSelectorProps {
  areas: Area[];
  selectedArea: string;
  onAreaChange: (areaId: string) => void;
}

export const AreaSelector: React.FC<AreaSelectorProps> = ({
  areas,
  selectedArea,
  onAreaChange
}) => {
  const selectedAreaName = areas.find(area => area.id === selectedArea)?.name || 'Selecciona un área';

  return (
    <div className="relative">
      <select
        value={selectedArea}
        onChange={(e) => onAreaChange(e.target.value)}
        className="w-full px-4 py-3 bg-white border-2 border-gray-200 rounded-xl text-gray-800 font-medium appearance-none cursor-pointer hover:border-gray-300 focus:border-blue-500 focus:outline-none transition-all duration-200 pr-10"
      >
        <option value="">Selecciona un área</option>
        {areas.map((area) => (
          <option key={area.id} value={area.id}>
            {area.name}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
    </div>
  );
};