import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function generateCode(prompt: string): Promise<string> {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `You are an expert full-stack developer. Generate production-ready code based on user requirements.
          Follow these guidelines:
          - Use TypeScript and React for frontend
          - Include proper error handling
          - Add comprehensive comments
          - Follow best practices and design patterns
          - Ensure code is clean, modular, and maintainable
          - Include necessary types and interfaces
          - Add proper documentation for functions and components`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      model: "gpt-3.5-turbo",
      temperature: 0.7,
      max_tokens: 4096,
    });

    return completion.choices[0].message.content || '';
  } catch (error) {
    console.error('Error generating code:', error);
    throw error;
  }
}