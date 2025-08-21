import React from 'react';
import { MessageSquare } from 'lucide-react';

interface GeneratedPhraseProps {
  category: string;
  category: string;
  medio: string;
  tema: string;
  impacto: string;
  area: string;
}

export const GeneratedPhrase: React.FC<GeneratedPhraseProps> = ({
  category,
  category,
  medio,
  tema,
  impacto,
  area,
}) => {
  const hasAllWords = category && medio && tema && impacto && area;

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-lg p-6 border border-indigo-200">
      <div className="flex items-start space-x-3">
        <MessageSquare className="w-6 h-6 text-indigo-600 mt-1 flex-shrink-0" />
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            Frase generada:
          </h3>
          <p className="text-gray-700 leading-relaxed italic">
            "{phrase}"
          </p>
        </div>
      </div>
    </div>
  );
};