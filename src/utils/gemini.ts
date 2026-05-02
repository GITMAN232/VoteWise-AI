import { GoogleGenAI } from '@google/genai';

// Initialize the Gemini client
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
You are VoteWise, an AI Election Assistant.
Your goal is to help users understand the election process, timelines, and voting steps in a simple, engaging, and personalized way.
You must be friendly, encouraging, and provide beginner-level explanations.

Rules:
1. If the user asks about HOW TO VOTE, list the steps briefly and output the special token [COMPONENT:voting-steps].
2. If the user asks about ELECTION DATES or TIMELINES, explain briefly and output the special token [COMPONENT:election-timeline].
3. If the user asks WHERE TO VOTE or POLLING BOOTHS, explain briefly and output the special token [COMPONENT:booth-locator].
4. Always tailor your advice based on the user's voter type (e.g., First-time, General, NRI).
5. Keep your text responses concise, as interactive UI components will be shown alongside your answer.
`;

export async function generateGeminiResponse(
  prompt: string,
  history: { role: string; content: string }[],
  userType: string | null
) {
  try {
    let contextPrompt = prompt;
    if (userType) {
      contextPrompt = `[User Context: I am a ${userType}] ${prompt}`;
    }

    // Convert our generic history to Gemini format
    const contents = history.map((msg) => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

    // Add current prompt
    contents.push({
      role: 'user',
      parts: [{ text: contextPrompt }],
    });

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      }
    });

    let text = response.text || "I'm not sure how to respond to that.";
    let componentType = null;

    // Parse special tokens
    if (text.includes('[COMPONENT:voting-steps]')) {
      componentType = 'voting-steps';
      text = text.replace('[COMPONENT:voting-steps]', '').trim();
    } else if (text.includes('[COMPONENT:election-timeline]')) {
      componentType = 'election-timeline';
      text = text.replace('[COMPONENT:election-timeline]', '').trim();
    } else if (text.includes('[COMPONENT:booth-locator]')) {
      componentType = 'booth-locator';
      text = text.replace('[COMPONENT:booth-locator]', '').trim();
    }

    return { text, componentType };
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
}
