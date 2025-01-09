import { useState } from "react";
import axios from "axios";
import { Filter } from "bad-words";
import BadWordBr from "@/app/utils/constants/bad-word/bad-word-br.json";
import { CONSTANTS } from "../constants";

export function useTextGenerator(t: (key: string) => string) {
  const [question, setQuestion] = useState<string>("");
  const [aiResponse, setAIResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const filter = new Filter();
  filter.addWords(...BadWordBr.words);

  const handleSend = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setAIResponse(null);

    try {
      if (filter.isProfane(question)) {
        setAIResponse(t("aiResponse.text.badWord"));
        return;
      }

      const processedQuestion =
        t(CONSTANTS.AI_RESPONSE.START_PROMPT) + question;

      const URL_WITH_KEY = `${CONSTANTS.AI_RESPONSE.API_URLS.GOOGLE_GEMINI}?key=${CONSTANTS.AI_RESPONSE.API_KEYS.GOOGLE_GEMINI}`;

      const requestData = {
        contents: [
          {
            parts: [{ text: processedQuestion }],
          },
        ],
      };

      const aiResponseRaw = await axios.post(URL_WITH_KEY, requestData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const fullResponse =
        aiResponseRaw.data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "No response.";

      setAIResponse(fullResponse);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error("Erro com Axios:", error.response?.data || error.message);
      } else if (error instanceof Error) {
        console.error("Erro genérico:", error.message);
      } else {
        console.error("Erro desconhecido:", error);
      }
      setAIResponse("Erro ao processar a solicitação. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return {
    question,
    setQuestion,
    aiResponse,
    loading,
    handleSend,
  };
}
