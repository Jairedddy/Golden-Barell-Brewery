/**
 * Groq API Integration
 * 
 * Handles communication with Groq's AI API for chatbot responses.
 * Includes error handling, rate limiting, and fallback mechanisms.
 */

export interface GroqMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface GroqResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
  error?: {
    message: string;
    type: string;
  };
}

// Rate limiting: Track requests per day
const RATE_LIMIT_KEY = 'groq_api_requests';
const MAX_REQUESTS_PER_DAY = 100; // Conservative limit

/**
 * Checks if we've exceeded the rate limit
 */
function checkRateLimit(): boolean {
  const today = new Date().toDateString();
  const stored = localStorage.getItem(RATE_LIMIT_KEY);
  
  if (!stored) {
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify({ date: today, count: 0 }));
    return true;
  }
  
  const data = JSON.parse(stored);
  if (data.date !== today) {
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify({ date: today, count: 0 }));
    return true;
  }
  
  return data.count < MAX_REQUESTS_PER_DAY;
}

/**
 * Increments the rate limit counter
 */
function incrementRateLimit(): void {
  const today = new Date().toDateString();
  const stored = localStorage.getItem(RATE_LIMIT_KEY);
  
  if (!stored) {
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify({ date: today, count: 1 }));
    return;
  }
  
  const data = JSON.parse(stored);
  if (data.date !== today) {
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify({ date: today, count: 1 }));
  } else {
    localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify({ date: today, count: data.count + 1 }));
  }
}

/**
 * Retry logic with exponential backoff
 */
async function retryWithBackoff<T>(
  fn: () => Promise<T>,
  maxRetries: number = 3,
  initialDelay: number = 1000
): Promise<T> {
  let lastError: Error | null = null;
  
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error as Error;
      if (attempt < maxRetries - 1) {
        const delay = initialDelay * Math.pow(2, attempt);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw lastError || new Error('Max retries exceeded');
}

/**
 * Sends a chat request to Groq API
 */
export async function chatWithGroq(
  messages: GroqMessage[],
  knowledgeBase: string
): Promise<string> {
  const apiKey = import.meta.env.VITE_GROQ_API_KEY;
  
  // Check if API key is configured
  if (!apiKey) {
    throw new Error('Groq API key not configured. Please set VITE_GROQ_API_KEY in your .env file.');
  }
  
  // Check rate limit
  if (!checkRateLimit()) {
    throw new Error('Rate limit exceeded. Please try again tomorrow.');
  }
  
  const systemPrompt = `You are a friendly, knowledgeable assistant for Golden Barrel Brewery, a craft brewery in Portland, Oregon. Your personality is warm, welcoming, and enthusiastic about craft beer. You help visitors with questions about the brewery, menu, hours, events, and reservations.

Use the following information to answer questions accurately:
${knowledgeBase}

IMPORTANT - Response Length:
- Keep responses SHORT and concise - only 2-3 sentences maximum
- Be direct and to the point while remaining friendly
- Even for complex questions, limit to 2-3 sentences
- Users prefer quick, helpful answers over lengthy explanations

Guidelines:
- Be friendly, conversational, and on-brand (enthusiastic but not overly salesy)
- Only use information from the knowledge base provided above
- If you don't know something or it's not in the knowledge base, politely suggest contacting the brewery directly at (503) 555-1234 or hello@goldenbarrel.com
- For beer recommendations, suggest specific beers from the menu and explain why (in 2-3 sentences)
- For food pairings, be creative but realistic (keep it brief)
- Always be helpful and positive
- If asked about reservations, provide the phone number and mention parties of 6+ need reservations
- If asked about events, mention specific upcoming events from the list`;

  const requestBody = {
    model: 'llama-3.1-8b-instant', // Fast, free tier model
    messages: [
      { role: 'system', content: systemPrompt },
      ...messages
    ],
    temperature: 0.7,
    max_tokens: 200, // Reduced for concise 2-3 sentence responses
    stream: false,
  };

  const makeRequest = async (): Promise<string> => {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      const errorMessage = errorData.error?.message || `HTTP ${response.status}: ${response.statusText}`;
      throw new Error(`Groq API request failed: ${errorMessage}`);
    }

    const data: GroqResponse = await response.json();
    
    if (data.error) {
      throw new Error(data.error.message || 'Unknown API error');
    }
    
    const content = data.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response content from API');
    }
    
    // Increment rate limit counter on success
    incrementRateLimit();
    
    return content;
  };

  // Retry with exponential backoff
  return retryWithBackoff(makeRequest);
}

/**
 * Checks if Groq API is available (has API key configured)
 */
export function isGroqAvailable(): boolean {
  return !!import.meta.env.VITE_GROQ_API_KEY;
}

