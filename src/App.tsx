import React, { useState } from 'react';
import { RefreshCw, Sparkles, Lightbulb } from 'lucide-react';
import { AreaSelector } from './components/AreaSelector';
import { WordBlock } from './components/WordBlock';
import { GeneratedPhrase } from './components/GeneratedPhrase';
import { IdeaResults } from './components/IdeaResults';
import { useWordGenerator } from './hooks/useWordGenerator';
import { OpenAIService } from './services/openai';
import { areas } from './data/areas';
import { wordCategories } from './data/words';
import { GeneratedIdea } from './types';

function App() {
  const [selectedArea, setSelectedArea] = useState('');
  const [ideas, setIdeas] = useState<GeneratedIdea[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { wordBlocks, generateNewWords, toggleLock, getWordByCategory } = useWordGenerator();

  const selectedAreaName = areas.find(area => area.id === selectedArea)?.name || '';
  const medio = getWordByCategory('medio');
  const tema = getWordByCategory('tema');
  const impacto = getWordByCategory('impacto');

  const canGenerateIdeas = selectedArea && medio && tema && impacto;

  const handleGenerateIdeas = async () => {
    if (!canGenerateIdeas) return;

    setIsLoading(true);
    setError(null);

    try {
      const openaiService = new OpenAIService();
      const generatedIdeas = await openaiService.generateIdeas(
        selectedAreaName,
        medio,
        tema,
        impacto
      );
      setIdeas(generatedIdeas);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Lightbulb className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Generador de Ideas
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600"> Innovadoras</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Herramienta para generar ideas creativas y soluciones prácticas para tu área de trabajo
          </p>
        </div>

        <div className="space-y-8">
          {/* Area Selection */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              1. Selecciona tu área de trabajo
            </h2>
            <AreaSelector
              areas={areas}
              selectedArea={selectedArea}
              onAreaChange={setSelectedArea}
            />
          </div>

          {/* Word Categories */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800">
                2. Genera palabras clave
              </h2>
              <button
                onClick={generateNewWords}
                className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-md"
              >
                <RefreshCw className="w-4 h-4" />
                Cambiar palabras
              </button>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {wordCategories.map((category, index) => {
                const block = wordBlocks.find(b => b.category === category.id);
                return (
                  <WordBlock
                    key={category.id}
                    title={category.title}
                    word={block?.word || ''}
                    isLocked={block?.isLocked || false}
                    onToggleLock={() => toggleLock(category.id)}
                    colorClass={category.color}
                  />
                );
              })}
            </div>
          </div>

          {/* Generated Phrase */}
          <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              3. Frase generada automáticamente
            </h2>
            <GeneratedPhrase
              medio={medio}
              tema={tema}
              impacto={impacto}
              area={selectedAreaName}
            />
          </div>

          {/* Generate Ideas Button */}
          <div className="text-center">
            <button
              onClick={handleGenerateIdeas}
              disabled={!canGenerateIdeas || isLoading}
              className={`inline-flex items-center gap-3 font-semibold px-8 py-4 rounded-xl text-lg transition-all duration-200 transform hover:scale-105 shadow-lg ${
                canGenerateIdeas && !isLoading
                  ? 'bg-gradient-to-r from-green-600 to-green-700 text-white hover:from-green-700 hover:to-green-800'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              <Sparkles className="w-6 h-6" />
              {isLoading ? 'Generando ideas...' : 'Generar Ideas'}
            </button>
          </div>

          
          {/* Results */}
          {(ideas.length > 0 || isLoading || error) && (
            <IdeaResults
              ideas={ideas}
              isLoading={isLoading}
              error={error}
            />
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 py-8 border-t border-gray-200">
          <p className="text-gray-500">
            Genera ideas ilimitadas para mejorar tu área de trabajo
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;