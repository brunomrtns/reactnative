import { useState } from "react";
import { View, ScrollView, Image } from "react-native";
import { useTranslation } from "react-i18next";

import axios from "axios";
import { useRouter } from "expo-router";
import { Filter } from "bad-words";

import { CONSTANTS } from "../../../utils/constants";
import Navbar from "../../../components/navbar";
import BadWordBr from "../../../utils/constants/bad-word/bad-word-br.json";

import { Text, Button, TextInput, ActivityIndicator } from "react-native-paper";

import { useTheme } from "@/app/theme/ThemeProvider";

import { useStyles } from "./styles";

export default function AiResponseImage() {
  const { theme } = useTheme();
  const router = useRouter();
  const styles = useStyles(theme);
  const { t } = useTranslation();
  const filter = new Filter();

  const [prompt, setPrompt] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  filter.addWords(...BadWordBr.words);

  const handleGenerateImage = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setImageUrl(null);

    try {
      if (filter.isProfane(prompt)) {
        setImageUrl(null);
        return;
      }

      const URL_WITH_KEY = `${CONSTANTS.AI_RESPONSE.API_URLS.DIFFUSION}`;

      const requestData = {
        inputs: prompt,
      };

      const response = await axios.post(URL_WITH_KEY, requestData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${CONSTANTS.AI_RESPONSE.API_KEYS.HUGGINGFACE}`,
        },
      });

      const generatedImage = response.data.image;

      if (generatedImage) {
        setImageUrl(generatedImage);
      } else {
        setImageUrl(null);
      }
    } catch (error) {
      console.error("Erro ao gerar imagem:", error);
      setImageUrl(null);
    } finally {
      setLoading(false);
    }
  };

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
              source={{ uri: imageUrl }}
              style={styles.generatedImage}
              resizeMode="contain"
            />
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
