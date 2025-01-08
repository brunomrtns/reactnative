import { useState } from "react";
import { View, ScrollView, Image } from "react-native";
import { useTranslation } from "react-i18next";

import axios from "axios";
import { Buffer } from "buffer";

import { CONSTANTS } from "../../../utils/constants";
import Navbar from "../../../components/navbar";
import { Text, Button, TextInput, ActivityIndicator } from "react-native-paper";

import { useTheme } from "@/app/theme/ThemeProvider";

import { useStyles } from "./styles";

export default function AiResponseImage() {
  const { theme } = useTheme();
  const styles = useStyles(theme);
  const { t } = useTranslation();

  const [prompt, setPrompt] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const generateImageWithRetry = async (
    prompt: string,
    retries = 5,
    delay = 60
  ) => {
    for (let attempt = 1; attempt <= retries; attempt++) {
      try {
        console.log(`Tentativa ${attempt} de ${retries}`);

        const response = await axios.post(
          `${CONSTANTS.AI_RESPONSE.API_URLS.DIFFUSION}`,
          { inputs: prompt },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${CONSTANTS.AI_RESPONSE.API_KEYS.HUGGINGFACE}`,
            },
            responseType: "arraybuffer",
          }
        );

        if (response.status === 503) {
          const { error, estimated_time } = response.data;
          console.warn(
            `Modelo ainda está carregando (${error}). Tentando novamente em ${
              estimated_time || delay
            } segundos...`
          );
          await new Promise((resolve) =>
            setTimeout(resolve, (estimated_time || delay) * 1000)
          );
          continue;
        }

        if (response.headers["content-type"] === "image/jpeg") {
          const base64Image = `data:image/jpeg;base64,${Buffer.from(
            response.data,
            "binary"
          ).toString("base64")}`;
          return base64Image;
        }

        throw new Error("Resposta inesperada. Tipo de conteúdo inválido.");
      } catch (error) {
        console.error(
          `Erro na tentativa ${attempt}:`,
          error instanceof Error ? error.message : String(error)
        );

        if (attempt === retries) {
          throw new Error("Falha após múltiplas tentativas.");
        }

        await new Promise((resolve) => setTimeout(resolve, delay * 1000));
      }
    }
  };

  const handleGenerateImage = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setImageUrl(null);

    try {
      const base64Image = await generateImageWithRetry(prompt);
      setImageUrl(base64Image ?? null);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error("Erro ao gerar imagem:", errorMessage);
      setImageUrl(null);
    }
  };
  console.log("Image URI:", "data:image/jpeg;base64," + imageUrl);

  return (
    <View style={styles.container}>
      <Navbar showBackButton />
      <View style={styles.content}>
        <Text>{t("aiResponse.image.describePrompt")} 🎨</Text>

        <TextInput
          mode="outlined"
          label={t("aiResponse.image.enterYourPrompt")}
          value={prompt}
          onChangeText={setPrompt}
          style={styles.input}
        />

        <Button
          mode="contained"
          onPress={handleGenerateImage}
          disabled={loading}
          style={styles.button}
        >
          <Text style={styles.buttonText}>
            {loading
              ? t("aiResponse.image.generating")
              : t("aiResponse.image.generateImage")}
          </Text>
        </Button>

        {loading && <ActivityIndicator size="large" style={styles.loading} />}

        <ScrollView contentContainerStyle={styles.imageContainer}>
          {imageUrl && (
            <Image
              style={styles.generatedImage}
              source={{ uri: "data:image/jpeg;base64," + imageUrl }}
              resizeMode="contain"
              onError={(e) =>
                console.error("Image load error:", e.nativeEvent.error)
              }
            />
          )}
        </ScrollView>
      </View>
    </View>
  );
}
