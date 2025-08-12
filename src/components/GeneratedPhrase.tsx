import React from 'react';
import { MessageSquare } from 'lucide-react';

interface GeneratedPhraseProps {
  medio: string;
  tema: string;
  impacto: string;
  area: string;
}

export const GeneratedPhrase: React.FC<GeneratedPhraseProps> = ({
  medio,
  tema,
  impacto,
  area
}) => {
  const hasAllWords = medio && tema && impacto && area;

  return (
    <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-xl p-6">
      <div className="flex items-start gap-3">
        <MessageSquare className="w-6 h-6 text-indigo-600 mt-1 flex-shrink-0" />
        <div>
          <h3 className="font-semibold text-indigo-900 mb-3">
            Frase Generada
          </h3>
          {hasAllWords ? (
            <p className="text-lg text-gray-800 leading-relaxed">
              Usando <span className="font-semibold text-blue-700">{medio}</span> en el contexto de{' '}
              <span className="font-semibold text-green-700">{tema}</span> se busca sobresalir en{' '}
              <span className="font-semibold text-purple-700">{impacto}</span> para el área de{' '}
              <span className="font-semibold text-indigo-700">{area}</span>.
            </p>
          ) : (
            <p className="text-gray-500 italic">
              Completa todos los campos para generar la frase automáticamente
            </p>
          )}
        </div>
      </div>
    </div>
  );
};