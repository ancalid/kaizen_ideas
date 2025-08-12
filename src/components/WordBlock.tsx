import React from 'react';
import { Lock, Unlock } from 'lucide-react';

interface WordBlockProps {
  title: string;
  word: string;
  isLocked: boolean;
  onToggleLock: () => void;
  colorClass: string;
}

export const WordBlock: React.FC<WordBlockProps> = ({
  title,
  word,
  isLocked,
  onToggleLock,
  colorClass
}) => {
  return (
    <div className={`relative p-6 border-2 rounded-xl transition-all duration-300 hover:shadow-md ${colorClass}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-sm uppercase tracking-wide opacity-80">
          {title}
        </h3>
        <button
          onClick={onToggleLock}
          className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
            isLocked 
              ? 'bg-gray-600 text-white hover:bg-gray-700' 
              : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
          }`}
          title={isLocked ? 'Desanclar palabra' : 'Anclar palabra'}
        >
          {isLocked ? <Lock size={16} /> : <Unlock size={16} />}
        </button>
      </div>
      <p className="text-lg font-medium leading-tight min-h-[3rem] flex items-center">
        {word || 'Presiona "Cambiar palabras" para generar'}
      </p>
    </div>
  );
};