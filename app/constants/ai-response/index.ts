const API_KEYS = {
    API_KEY_HUGGINGFACE: "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",
    API_KEY_AIMLAPI: "2ed027904a2947efa218958a67074d20",
    API_KEY_GOOGLE_GEMINI: "AIzaSyC7kq-OM5VO3shwj0aQHUze6t-wQ5vn04s",
  };
  
const API_URLS = {
    URL_API_GOOGLE_GEMINI:
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent",
    URL_API_FALCON_7B_INSTRUCT:
      "https://api-inference.huggingface.co/models/tiiuae/falcon-7b-instruct",
  };
  
export const AI_RESPONSE = {
    START_PROMPT: "aiResponse.prompt",
    API_KEYS: API_KEYS,
    API_URLS: API_URLS,
  };