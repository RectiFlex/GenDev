import OpenAI from 'openai';
import { captureException } from '../../utils/sentry';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export interface CodeGenerationRequest {
  prompt: string;
  language?: string;
  framework?: string;
}

export async function generateCode({ prompt, language = 'typescript', framework = 'react' }: CodeGenerationRequest) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: `You are an expert ${language} and ${framework} developer. Generate production-ready code with:
            - TypeScript types and interfaces
            - Error handling
            - Best practices
            - Clean code principles
            - Comprehensive comments
            - Modern syntax`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 4096
    });

    return completion.choices[0].message.content || '';
  } catch (error) {
    captureException(error as Error, { prompt, language, framework });
    throw error;
  }
}

export async function analyzeCode(code: string) {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a code review expert. Analyze the code for potential improvements, bugs, and best practices."
        },
        {
          role: "user",
          content: code
        }
      ],
      temperature: 0.3,
      max_tokens: 2048
    });

    return completion.choices[0].message.content || '';
  } catch (error) {
    captureException(error as Error, { code });
    throw error;
  }
}