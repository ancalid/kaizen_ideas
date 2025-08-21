import { GeneratedIdea } from '../types';

const API_BASE_URL = "url"; // Backend endpoint

export class OpenAIService {
  async generateIdeas(
    area: string,
    category: string
    medio: string,
    tema: string,
    impacto: string
  ): Promise<GeneratedIdea[]> {
    const prompt = `Soy parte del área de ${area}. Quiero generar ideas usando ${medio} en el contexto de ${tema} para lograr ${impacto}. Por favor dame 3 ideas concretas y prácticas para implementar.`;

    try {
      // 👇 Cambié la URL a tu backend de Vercel
      const response = await fetch("https://kaizen-ideas.vercel.app/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: prompt }),
      });

      if (!response.ok) {
        if (response.status === 429) {
          throw new Error("El servicio está temporalmente saturado. Por favor espera unos minutos antes de intentar nuevamente.");
        }
        throw new Error(`Error del servidor: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      // 👇 Ajustar al formato que devuelve OpenAI
      const content = data.choices?.[0]?.message?.content || "";

      // Parseamos el contenido en ideas
      const ideas = this.parseIdeasFromResponse(content);
      return ideas;
    } catch (error) {
      console.error("Error generating ideas:", error);
      if (error instanceof Error) {
        throw error;
      }
      throw new Error("No se pudieron generar las ideas. Verifica tu conexión a internet.");
    }
  }

  private parseIdeasFromResponse(content: string): GeneratedIdea[] {
    const lines = content.split("\n").filter((line) => line.trim());
    const ideas: GeneratedIdea[] = [];

    let currentIdea = "";
    let ideaCount = 0;

    for (const line of lines) {
      const trimmedLine = line.trim();

      if (/^[1-3][\.\)\-]/.test(trimmedLine) || /^[\*\-\•]/.test(trimmedLine)) {
        if (currentIdea && ideaCount < 3) {
          ideas.push({
            id: ideaCount + 1,
            content: currentIdea.trim(),
          });
        }
        currentIdea = trimmedLine.replace(/^[1-3][\.\)\-]\s*/, "").replace(/^[\*\-\•]\s*/, "");
        ideaCount++;
      } else if (trimmedLine && ideaCount > 0) {
        currentIdea += " " + trimmedLine;
      }
    }

    if (currentIdea && ideas.length < 3) {
      ideas.push({
        id: ideas.length + 1,
        content: currentIdea.trim(),
      });
    }

    if (ideas.length === 0) {
      const sentences = content.split(".").filter((s) => s.trim().length > 20);
      for (let i = 0; i < Math.min(3, sentences.length); i++) {
        ideas.push({
          id: i + 1,
          content: sentences[i].trim() + ".",
        });
      }
    }

    return ideas.slice(0, 3);
  }
}
