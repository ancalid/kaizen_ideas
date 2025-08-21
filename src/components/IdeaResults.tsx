import React from 'react';
import { Lightbulb, Loader2 } from 'lucide-react';
import { GeneratedIdea } from '../types';

interface IdeaResultsProps {
  ideas: GeneratedIdea[];
  isLoading: boolean;
  error: string | null;
}

export const IdeaResults: React.FC<IdeaResultsProps> = ({
  ideas,
  isLoading,
  error
}) => {
  if (isLoading) {
    return (
      <div className="bg-white border-2 border-gray-200 rounded-xl p-8 text-center">
        
        <p className="text-gray-600">Generando ideas innovadoras...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
        <p className="text-red-700 font-medium">Error al generar ideas:</p>
        <p className="text-red-600 mt-1">{error}</p>
      </div>
    );
  }

  if (ideas.length === 0) {
    return null;
  }

  return (
    <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
      <div className="flex items-center gap-3 mb-6">
        <Lightbulb className="w-6 h-6 text-yellow-500" />
        <h3 className="font-semibold text-xl text-gray-800">
          Ideas Generadas
        </h3>
      </div>
      <div className="space-y-4">
        {ideas.map((idea) => (
          <div
            key={idea.id}
            className="bg-gray-50 border border-gray-200 rounded-lg p-4 hover:bg-gray-100 transition-colors duration-200"
          >
            <div className="flex items-start gap-3">
              <span className="bg-blue-600 text-white text-sm font-bold rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                {idea.id}
              </span>
              <p className="text-gray-800 leading-relaxed">{idea.content}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};