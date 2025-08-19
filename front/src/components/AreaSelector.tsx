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
  onAreaChange,
}) => {
  return (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Selecciona tu área:
      </label>
      <div className="relative">
        <select
          value={selectedArea}
          onChange={(e) => onAreaChange(e.target.value)}
          className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent appearance-none cursor-pointer"
        >
          <option value="">Selecciona un área...</option>
          {areas.map((area) => (
            <option key={area.id} value={area.id}>
              {area.name}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
};