export async function generateIdeas(prompt: string): Promise<string> {
  try {
    const response = await fetch("https://kaizen-ideas.vercel.app/api/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: prompt }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // ✅ Evita error si no hay respuesta
    const content = data.choices?.[0]?.message?.content;
    if (!content) {
      throw new Error("No se recibió contenido desde OpenAI");
    }

    return content;
  } catch (error) {
    console.error("Error generating ideas:", error);
    throw new Error("Error al generar ideas. Por favor, inténtalo de nuevo.");
  }
}
