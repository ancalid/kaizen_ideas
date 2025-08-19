import React from 'react';
import { Lock, Unlock } from 'lucide-react';

interface WordBlockProps {
  title: string;
  word: string;
  isLocked: boolean;
  onToggleLock: () => void;
}

export const WordBlock: React.FC<WordBlockProps> = ({
  title,
  word,
  isLocked,
  onToggleLock,
}) => {
  return (
    <div className="bg-white rounded-lg border-2 border-gray-200 p-4 relative">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-medium text-gray-600">{title}</h3>
        <button
          onClick={onToggleLock}
          className={`p-1 rounded transition-colors ${
            isLocked
              ? 'text-indigo-600 hover:text-indigo-700'
              : 'text-gray-400 hover:text-gray-600'
          }`}
          title={isLocked ? 'Desanclar palabra' : 'Anclar palabra'}
        >
          {isLocked ? <Lock className="w-4 h-4" /> : <Unlock className="w-4 h-4" />}
        </button>
      </div>
      <p className="text-gray-800 font-medium text-center py-2">
        {word || 'Selecciona área y categoría'}
      </p>
    </div>
  );
};