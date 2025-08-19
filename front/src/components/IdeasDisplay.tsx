import React from 'react';
import { Lightbulb, Loader2 } from 'lucide-react';

interface IdeasDisplayProps {
  ideas: string;
  isLoading: boolean;
}

export const IdeasDisplay: React.FC<IdeasDisplayProps> = ({ ideas, isLoading }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mr-3" />
          <p className="text-gray-600 text-lg">Generando ideas innovadoras...</p>
        </div>
      </div>
    );
  }

  if (!ideas) return null;

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-4">
        <Lightbulb className="w-6 h-6 text-yellow-500 mr-2" />
        <h2 className="text-2xl font-semibold text-gray-800">
          Ideas Generadas
        </h2>
      </div>
      <div className="prose max-w-none">
        <div className="text-gray-700 leading-relaxed whitespace-pre-wrap">
          {ideas}
        </div>
      </div>
    </div>
  );
};