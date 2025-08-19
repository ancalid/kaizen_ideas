import React, { useState, useEffect } from 'react';
import { Lightbulb, RefreshCw, Sparkles } from 'lucide-react';

// Components
import { AreaSelector } from './components/AreaSelector';
import { CategorySelector } from './components/CategorySelector';
import { WordBlock } from './components/WordBlock';
import { GeneratedPhrase } from './components/GeneratedPhrase';
import { IdeasDisplay } from './components/IdeasDisplay';

// Data
import { areas } from './data/areas';
import { categories } from './data/categories';
import { wordCategories } from './data/words';

// Types
import { SelectedWords, LockedWords } from './types';

// Utils
import { generateRandomWords } from './utils/wordGenerator';

// Services
import { generateIdeas } from './services/api';

function App() {
  const [selectedArea, setSelectedArea] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedWords, setSelectedWords] = useState<SelectedWords>({
    medio: '',
    tema: '',
    impacto: '',
  });
  const [lockedWords, setLockedWords] = useState<LockedWords>({
    medio: false,
    tema: false,
    impacto: false,
  });
  const [generatedIdeas, setGeneratedIdeas] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Generate initial random words when area and category are selected
  useEffect(() => {
    if (selectedArea && selectedCategory) {
      const newWords = generateRandomWords(wordCategories, lockedWords, selectedWords);
      setSelectedWords(newWords);
    }
  }, [selectedArea, selectedCategory]);

  const handleAreaChange = (areaId: string) => {
    setSelectedArea(areaId);
    setSelectedCategory('');
    setGeneratedIdeas('');
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setGeneratedIdeas('');
  };

  const handleToggleLock = (wordType: keyof LockedWords) => {
    setLockedWords(prev => ({
      ...prev,
      [wordType]: !prev[wordType],
    }));
  };

  const handleChangeWords = () => {
    const newWords = generateRandomWords(wordCategories, lockedWords, selectedWords);
    setSelectedWords(newWords);
  };

  const handleGenerateIdeas = async () => {
    if (!selectedArea || !selectedCategory || !selectedWords.medio || !selectedWords.tema || !selectedWords.impacto) {
      return;
    }

    const areaName = areas.find(a => a.id === selectedArea)?.name || '';
    const categoryName = categories.find(c => c.id === selectedCategory)?.name || '';

    const prompt = `Soy parte del área de ${areaName}. Quiero generar ideas en la ${categoryName} usando ${selectedWords.medio} en el contexto de ${selectedWords.tema} para lograr ${selectedWords.impacto}. Por favor dame 3 ideas concretas y prácticas para implementar.`;

    setIsLoading(true);
    setGeneratedIdeas('');

    try {
      const ideas = await generateIdeas(prompt);
      setGeneratedIdeas(ideas);
    } catch (error) {
      setGeneratedIdeas('Error al generar ideas. Por favor, inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  const canGenerateIdeas = selectedArea && selectedCategory && selectedWords.medio && selectedWords.tema && selectedWords.impacto;
  const canShowPhrase = canGenerateIdeas;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Lightbulb className="w-12 h-12 text-yellow-500 mr-3" />
              <h1 className="text-4xl font-bold text-gray-800">
                Generador de Ideas Innovadoras
              </h1>
            </div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Herramienta para generar ideas creativas y soluciones prácticas para áreas administrativas y operativas de la empresa
            </p>
          </div>

          {/* Selection Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <AreaSelector
                areas={areas}
                selectedArea={selectedArea}
                onAreaChange={handleAreaChange}
              />
              <CategorySelector
                categories={categories}
                selectedCategory={selectedCategory}
                onCategoryChange={handleCategoryChange}
                disabled={!selectedArea}
              />
            </div>

            {/* Word Blocks */}
            {selectedArea && selectedCategory && (
              <div className="space-y-6">
                <div className="grid md:grid-cols-3 gap-4">
                  {wordCategories.map((category) => (
                    <WordBlock
                      key={category.id}
                      title={category.name}
                      word={selectedWords[category.id as keyof SelectedWords]}
                      isLocked={lockedWords[category.id as keyof LockedWords]}
                      onToggleLock={() => handleToggleLock(category.id as keyof LockedWords)}
                    />
                  ))}
                </div>

                {/* Change Words Button */}
                <div className="flex justify-center">
                  <button
                    onClick={handleChangeWords}
                    className="bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200 flex items-center"
                  >
                    <RefreshCw className="w-5 h-5 mr-2" />
                    Cambiar palabras
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Generated Phrase */}
          {canShowPhrase && (
            <div className="mb-8">
              <GeneratedPhrase
                category={categories.find(c => c.id === selectedCategory)?.name || ''}
                medio={selectedWords.medio}
                tema={selectedWords.tema}
                impacto={selectedWords.impacto}
                area={areas.find(a => a.id === selectedArea)?.name || ''}
              />
            </div>
          )}

          {/* Generate Ideas Button */}
          {canGenerateIdeas && (
            <div className="flex justify-center mb-8">
              <button
                onClick={handleGenerateIdeas}
                disabled={isLoading}
                className="bg-indigo-600 text-white px-8 py-4 rounded-lg font-medium text-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center"
              >
                {isLoading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Generando ideas...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-6 h-6 mr-2" />
                    Generar Ideas
                  </>
                )}
              </button>
            </div>
          )}

          {/* Ideas Display */}
          <IdeasDisplay ideas={generatedIdeas} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}

export default App;