const TOGETHER_API_URL = 'https://api.together.xyz/inference';
const API_KEY = import.meta.env.VITE_TOGETHER_API_KEY;

if (!API_KEY) {
  throw new Error('Missing Together AI API key');
}

export async function generateCode(prompt: string): Promise<string> {
  try {
    const response = await fetch(TOGETHER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'codellama/CodeLlama-34b-Instruct-hf',
        prompt: `You are an expert full-stack developer. Generate production-ready code based on the following requirements:
        ${prompt}
        
        Follow these guidelines:
        - Use TypeScript and React
        - Include proper error handling
        - Add comprehensive comments
        - Follow best practices and design patterns
        - Ensure code is clean, modular, and maintainable
        - Include necessary types and interfaces
        - Add proper documentation for functions and components`,
        max_tokens: 2048,
        temperature: 0.7,
        top_p: 0.7,
        top_k: 50,
        repetition_penalty: 1.1
      })
    });

    if (!response.ok) {
      throw new Error('Failed to generate code');
    }

    const data = await response.json();
    return data.output.choices[0].text;
  } catch (error) {
    console.error('Error generating code:', error);
    throw error;
  }
}

export async function analyzeCode(code: string): Promise<string> {
  try {
    const response = await fetch(TOGETHER_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        model: 'codellama/CodeLlama-34b-Instruct-hf',
        prompt: `You are a code review expert. Analyze the following code for potential improvements, bugs, and best practices:

        ${code}`,
        max_tokens: 1024,
        temperature: 0.3,
        top_p: 0.7,
        top_k: 50,
        repetition_penalty: 1.1
      })
    });

    if (!response.ok) {
      throw new Error('Failed to analyze code');
    }

    const data = await response.json();
    return data.output.choices[0].text;
  } catch (error) {
    console.error('Error analyzing code:', error);
    throw error;
  }
}