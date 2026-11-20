
import { GoogleGenAI } from "@google/genai";

// Created on first use so a missing key only disables the advisor, not the whole site.
let ai: GoogleGenAI | null = null;

export const getPolicyAdvice = async (userInput: string) => {
  try {
    ai ??= new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are a professional LIC (Life Insurance Corporation of India) expert advisor. 
      A customer is asking: "${userInput}". 
      Based on typical LIC products like Jeevan Umang (Whole life), Jeevan Labh (Savings), Jeevan Amar (Term), and Jeevan Lakshya (Child), 
      recommend the best approach. Keep it professional, empathetic, and encouraging. 
      Focus on the financial security of their family. 
      Format the response with clear bullet points and a concluding call to action to speak with the agent.`,
      config: {
        temperature: 0.7,
        topP: 0.9,
      }
    });

    return response.text;
  } catch (error) {
    console.error("Gemini Error:", error);
    return "I'm sorry, I'm having trouble connecting to the insurance database right now. Please try again or contact our agent directly at +91 95405 98999.";
  }
};
