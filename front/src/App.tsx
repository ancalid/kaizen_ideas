import React, { useState } from 'react';
import { Lightbulb, Send, Loader2 } from 'lucide-react';

async function getIdea(userInput: string): Promise<string> {
  const response = await fetch("https://kaizen-ideas.vercel.app/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message: userInput }),
  });

  const data = await response.json();
  return data.choices[0].message.content;
}

function App() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    setResponse('');

    try {
      const idea = await getIdea(input);
      setResponse(idea);
    } catch (error) {
      console.error('Error getting idea:', error);
      setResponse('Lo siento, hubo un error al generar la idea. Por favor, inténtalo de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <Lightbulb className="w-12 h-12 text-yellow-500 mr-3" />
              <h1 className="text-4xl font-bold text-gray-800">
                Generador de Ideas Innovadoras
              </h1>
            </div>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Herramienta para generar ideas creativas y soluciones prácticas para áreas administrativas y operativas de la empresa
            </p>
          </div>

          {/* Input Form */}
          <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="idea-input" className="block text-sm font-medium text-gray-700 mb-2">
                  Describe tu desafío o área de mejora:
                </label>
                <textarea
                  id="idea-input"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ejemplo: Necesito mejorar la comunicación entre departamentos..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                  rows={4}
                  disabled={isLoading}
                />
              </div>
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="w-full bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Generando idea...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-2" />
                    Generar Idea
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Response Display */}
          {response && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 flex items-center">
                <Lightbulb className="w-6 h-6 text-yellow-500 mr-2" />
                Idea Generada
              </h2>
              <div className="prose max-w-none">
                <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                  {response}
                </p>
              </div>
            </div>
          )}

          {/* Loading State */}
          {isLoading && (
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mr-3" />
                <p className="text-gray-600">Generando tu idea innovadora...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;