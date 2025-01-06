import { useState } from "react";
import { View, ScrollView } from "react-native";
import { useTranslation } from "react-i18next";
import Markdown from "react-native-markdown-display";

import axios from "axios";
import { useRouter } from "expo-router";
import { Filter } from "bad-words";

import { CONSTANTS } from "../../constants";
import Navbar from "../../components/navbar";
import BadWordBr from "../../constants/bad-word/bad-word-br.json";

import { Text, Button, TextInput, ActivityIndicator } from "react-native-paper";

import { useTheme } from "@/app/theme/ThemeProvider";

import { useStyles, getMarkdownStyles } from "./styles";

export default function AiResponse() {
  const { theme } = useTheme();
  const router = useRouter();
  const styles = useStyles(theme);
  const markdownStyles = getMarkdownStyles(theme);
  const { t } = useTranslation();
  const filter = new Filter();

  const [question, setQuestion] = useState<string>("");
  const [aiResponse, setAIResponse] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  filter.addWords(...BadWordBr.words);

  const handleSend = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setAIResponse(null);

    try {
      if (filter.isProfane(question)) {
        setAIResponse(t("aiResponse.badWord"));
        return;
      }
      const processedQuestion =
        t(CONSTANTS.AI_RESPONSE.START_PROMPT) + question;

      const URL_WITH_KEY = `${CONSTANTS.AI_RESPONSE.API_URLS.URL_API_GOOGLE_GEMINI}?key=${CONSTANTS.AI_RESPONSE.API_KEYS.API_KEY_GOOGLE_GEMINI}`;

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

  return (
    <View style={styles.container}>
      <Navbar showBackButton />
      <View style={styles.content}>
        <Text>{t("aiResponse.askAnything")} 🤖</Text>

        <TextInput
          mode="outlined"
          label={t("aiResponse.enterYourQuestion")}
          value={question}
          onChangeText={setQuestion}
          style={styles.input}
        />

        <Button
          mode="contained"
          onPress={handleSend}
          disabled={loading}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            {loading ? t("aiResponse.consulting") : t("aiResponse.toAsk")}
          </Text>
        </Button>

        {loading && <ActivityIndicator size="large" style={styles.loading} />}

        <ScrollView style={styles.aiResponseMarked}>
          {aiResponse && (
            <Markdown style={markdownStyles}>
              {`${t("aiResponse.response")}: \n\n${aiResponse}`}
            </Markdown>
          )}
        </ScrollView>

        <Button
          mode="outlined"
          onPress={() => router.back()}
          style={styles.button}
        >
          {t("back")}
        </Button>
      </View>
    </View>
  );
}
