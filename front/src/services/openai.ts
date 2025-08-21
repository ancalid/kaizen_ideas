@@ .. @@
   async generateIdeas(
     area: string,
+    category: string,
     medio: string,
     tema: string,
     impacto: string
   ): Promise<GeneratedIdea[]> {
-    const prompt = `Soy parte del área de ${area}. Quiero generar ideas usando ${medio} en el contexto de ${tema} para lograr ${impacto}. Por favor dame 3 ideas concretas y prácticas para implementar.`;
    const prompt = `Soy parte del área de ${area}. Quiero generar ideas en la ${category} usando ${medio} en el contexto de ${tema} para lograr ${impacto}. Por favor dame 3 ideas concretas y prácticas para implementar.`;
+    const prompt = `Soy part
     }
   }e del área de ${area}. Quiero generar ideas en la ${category} usando ${medio} en el contexto de ${tema} para lograr ${impacto}. Por favor dame 3 ideas concretas y prácticas para implementar.`;
 
     try {