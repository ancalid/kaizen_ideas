import React from 'react';
import { MessageSquare } from 'lucide-react';

interface GeneratedPhraseProps {
  category: string;
  medio: string;
  tema: string;
  impacto: string;
  area: string;
}

export const GeneratedPhrase: React.FC<GeneratedPhraseProps> = ({
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
          {hasAllWords ? (
            <p className="text-lg text-gray-800 leading-relaxed">
              En la <span className="font-semibold text-indigo-700">{category}</span>, usando{' '}
              <span className="font-semibold text-blue-700">{medio}</span> en el contexto de{' '}
              <span className="font-semibold text-green-700">{tema}</span> se busca sobresalir en{' '}
              <span className="font-semibold text-purple-700">{impacto}</span> para el área de{' '}
              <span className="font-semibold text-orange-700">{area}</span>.
            </p>
          ) : (
            <p className="text-gray-500 italic">
              Selecciona todas las palabras para generar tu frase personalizada.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};