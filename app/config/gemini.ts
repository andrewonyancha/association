import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
  GenerativeModel,
  GenerationConfig,
  SafetySetting,
} from "@google/generative-ai";

// Use the correct model name - try these alternatives:
const MODEL_NAME = "gemini-flash-latest"; // or "gemini-1.0-pro", "gemini-pro"
const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "your-api-key-here";

async function runChat(prompt: string): Promise<string> {
  // Don't run on server side
  if (typeof window === 'undefined') {
    return "AI Assistant is loading...";
  }

  // Check if API key is available
  if (!API_KEY || API_KEY === "your-api-key-here") {
    console.error("Gemini API key is missing");
    return "AI service is currently unavailable. Please check the configuration.";
  }

  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    
    // Try different model names if the first one fails
    let model: GenerativeModel;
    try {
      model = genAI.getGenerativeModel({ model: MODEL_NAME });
    } catch (modelError) {
      console.warn(`Model ${MODEL_NAME} not found, trying fallback models`);
      // Try fallback models
      model = genAI.getGenerativeModel({ model: "gemini-pro" });
    }

    const generationConfig: GenerationConfig = {
      temperature: 1,
      topP: 0.95,
      topK: 64,
      maxOutputTokens: 2048,
    };

    const safetySettings: SafetySetting[] = [
      {
        category: HarmCategory.HARM_CATEGORY_HARASSMENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
      {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
      },
    ];

    const chat = model.startChat({
      generationConfig,
      safetySettings,
      history: [
  {
    role: "user",
    parts: [
      {text: "Introduce yourself as TMX Global Freight Network's AI assistant. Keep answers 1-2 sentences max."},
    ],
  },
  {
    role: "model",
    parts: [
      {text: "I'm TMX's AI assistant. I help find verified logistics partners and answer network questions."},
    ],
  },
  {
    role: "user",
    parts: [
      {text: "Direct users to tmxglobalfreightnetwork.com for details. Keep answers very short."},
    ],
  },
  {
    role: "model",
    parts: [
      {text: "Visit tmxglobalfreightnetwork.com for full details."},
    ],
  },
  {
    role: "user",
    parts: [
      {text: "Only answer logistics questions. Reject others immediately."},
    ],
  },
  {
    role: "model",
    parts: [
      {text: "I only handle logistics queries. Try other AI for unrelated questions."},
    ],
  },
  {
    role: "user",
    parts: [
      {text: "For membership fees or pricing, direct to website."},
    ],
  },
  {
    role: "model",
    parts: [
      {text: "Contact us via website for current membership details."},
    ],
  },
  {
    role: "user",
    parts: [
      {text: "Members include verified freight forwarders, agents, traders, manufacturers, sellers, buyers."},
    ],
  },
  {
    role: "model",
    parts: [
      {text: "We have verified freight forwarders, agents, traders, manufacturers, sellers, and buyers."},
    ],
  },
  {
    role: "user",
    parts: [
      {text: "Benefits: cargo insurance, financing, 500+ agents, business leads, investments, priority routes."},
    ],
  },
  {
    role: "model",
    parts: [
      {text: "Members get cargo insurance, financing, 500+ agents, daily leads, and investment opportunities."},
    ],
  },
  {
    role: "user",
    parts: [
      {text: "For partner requests: we have 500+ agents in 120+ countries. Verification ongoing."},
    ],
  },
  {
    role: "model",
    parts: [
      {text: "We have 500+ agents in 120+ countries. Verification ongoing for recommendations."},
    ],
  },
  {
    role: "user",
    parts: [
      {text: "Contact: WhatsApp 0790407508 or email info@tmxglobal.com during verification."},
    ],
  },
  {
    role: "model",
    parts: [
      {text: "Contact WhatsApp 0790407508 or email info@tmxglobal.com for assistance."},
    ],
  }
]
    });

    const result = await chat.sendMessage(prompt);
    const response = result.response;
    return response.text();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    
    // Provide more specific error messages
    if (error instanceof Error) {
      if (error.message.includes('404') || error.message.includes('not found')) {
        return "The AI model is currently unavailable. Please try again later or contact support.";
      } else if (error.message.includes('API key') || error.message.includes('auth')) {
        return "AI service configuration error. Please check the API configuration.";
      }
    }
    
    return "Sorry, I'm having trouble responding right now. Please try again later.";
  }
}

export default runChat;