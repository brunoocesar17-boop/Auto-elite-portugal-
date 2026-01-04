
import { GoogleGenAI } from "@google/genai";

export const generateCarPitch = async (vehicle: any) => {
  try {
    // Correct initialization: always use a named parameter and direct process.env.API_KEY reference.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `Atue como um vendedor de carros de luxo em Portugal. Crie uma descrição curta e persuasiva (máximo 150 palavras) para um ${vehicle.brand} ${vehicle.model} do ano ${vehicle.year}, com ${vehicle.km}km, combustível ${vehicle.fuel}. Use um tom profissional, sofisticado e mencione a qualidade e o estado do veículo. Escreva em Português de Portugal.`;
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        temperature: 0.7,
      },
    });

    // Accessing .text property directly instead of calling it as a method.
    return response.text || "Descrição premium indisponível no momento.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Erro ao gerar descrição premium.";
  }
};
