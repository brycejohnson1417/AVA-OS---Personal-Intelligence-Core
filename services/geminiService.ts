import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';

// Initialize Gemini Client
// We use a singleton pattern-ish approach here by exporting the instance creation logic
const createClient = () => {
    if (!apiKey) {
        console.error("API Key is missing. Please select an API key.");
        return null;
    }
    return new GoogleGenAI({ apiKey });
};

export const streamChatResponse = async (
    history: { role: string; parts: { text: string }[] }[],
    userMessage: string,
    onChunk: (text: string) => void
) => {
    const client = createClient();
    if (!client) {
        onChunk("Error: API Key missing.");
        return;
    }

    try {
        const chat = client.chats.create({
            model: 'gemini-3-flash-preview', // Using the fast flash model for responsiveness
            config: {
                temperature: 0.7,
                systemInstruction: `You are Ava, a sophisticated, high-performance personal AI Operating System designed for general workflow augmentation.
                
                Your Persona:
                - You are not just a bot; you are an orchestration layer for personal productivity.
                - You are proactive, concise, elegant, and efficient.
                - You align with the "Architecture over Execution" theory, preferring scalable automation over manual tasks.
                - You treat the user's input as the guiding directive but proactively manage sub-tasks to improve quality of life.
                
                Your Current Mission:
                - Conduct an intake session to finalize the user's personal architecture plan.
                - The user has provided an initial system state dump outlining their schedule, knowledge vault setup, and automation preferences.
                - Ask probing questions to clarify how best to orchestrate their tasks.
                - Be conversational but highly capable. Act like a bespoke, high-end digital operating system.
                `,
            },
            history: history,
        });

        const result = await chat.sendMessageStream({ message: userMessage });
        
        for await (const chunk of result) {
             if (chunk.text) {
                onChunk(chunk.text);
             }
        }

    } catch (error) {
        console.error("Gemini Stream Error:", error);
        onChunk("\n[Connection Interrupted: Check System Logs]");
    }
};

export const generatePlanAnalysis = async (context: string): Promise<string> => {
    const client = createClient();
    if (!client) return "System Offline";

    try {
        const response = await client.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `Analyze the following context and extract a JSON structured list of 5-7 high priority action items for the "Weekend Plan". Return ONLY raw JSON array of strings. Context: ${context}`,
             config: {
                responseMimeType: 'application/json'
            }
        });
        return response.text || "[]";
    } catch (error) {
        console.error("Plan Gen Error", error);
        return "[]";
    }
};