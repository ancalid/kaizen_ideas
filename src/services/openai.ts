import { GeneratedIdea } from '../types';

const API_BASE_URL = "url"; // Backend endpoint

export class OpenAIService {
  async generateIdeas(
    area: string,
    medio: string,
    tema: string,
    impacto: string
  ): Promise<GeneratedIdea[]> {
    const prompt = `Soy parte del área de ${area}. Quiero generar ideas usando ${medio} en el contexto de ${tema} para lograr ${impacto}. Por favor dame 3 ideas concretas y prácticas para implementar.`;

    try {
      const response = await fetch(`${API_BASE_URL}/generate-ideas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          area,
          medio,
          tema,
          impacto,
          prompt
        }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('El servicio está temporalmente saturado. Por favor espera unos minutos antes de intentar nuevamente.');
        }
        throw new Error(`Error del servidor: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      
      // Expect the backend to return ideas in the correct format
      if (data.ideas && Array.isArray(data.ideas)) {
        return data.ideas;
      }
      
      // Fallback parsing if backend returns raw content
      const ideas = this.parseIdeasFromResponse(data.content || '');
      return ideas;
    } catch (error) {
      console.error('Error generating ideas:', error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('No se pudieron generar las ideas. Verifica tu conexión a internet.');
    }
  }

  private parseIdeasFromResponse(content: string): GeneratedIdea[] {
    // Split the response into individual ideas
    const lines = content.split('\n').filter(line => line.trim());
    const ideas: GeneratedIdea[] = [];
    
    let currentIdea = '';
    let ideaCount = 0;
    
    for (const line of lines) {
      const trimmedLine = line.trim();
      
      // Check if this line starts a new idea (numbered or bulleted)
      if (/^[1-3][\.\)\-]/.test(trimmedLine) || /^[\*\-\•]/.test(trimmedLine)) {
        if (currentIdea && ideaCount < 3) {
          ideas.push({
            id: ideaCount + 1,
            content: currentIdea.trim()
          });
        }
        currentIdea = trimmedLine.replace(/^[1-3][\.\)\-]\s*/, '').replace(/^[\*\-\•]\s*/, '');
        ideaCount++;
      } else if (trimmedLine && ideaCount > 0) {
        currentIdea += ' ' + trimmedLine;
      }
    }
    
    // Add the last idea
    if (currentIdea && ideas.length < 3) {
      ideas.push({
        id: ideas.length + 1,
        content: currentIdea.trim()
      });
    }
    
    // If parsing failed, create fallback ideas
    if (ideas.length === 0) {
      const sentences = content.split('.').filter(s => s.trim().length > 20);
      for (let i = 0; i < Math.min(3, sentences.length); i++) {
        ideas.push({
          id: i + 1,
          content: sentences[i].trim() + '.'
        });
      }
    }
    
    return ideas.slice(0, 3);
  }
}