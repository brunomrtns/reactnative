import { StyleSheet, TextStyle, ViewStyle, ImageStyle } from "react-native";
import { MD3Theme } from "react-native-paper";

type NamedStyles<T> = { [P in keyof T]: ViewStyle | TextStyle | ImageStyle };

export const useStyles = (
  theme: MD3Theme & { customColors: Record<string, string> }
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background, // Fundo principal
    },
    content: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: 16,
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
      color: theme.customColors.text, // Texto principal
    },
    input: {
      marginTop: 10,
      backgroundColor: theme.customColors.inputBackground, // Fundo do input
      width: "100%",
      minHeight: 48,
    },
    button: {
      marginVertical: 10,
      backgroundColor: theme.customColors.buttonBackground, // Fundo do botão
      borderRadius: 5,
    },
    buttonText: {
      color: theme.colors.onBackground,
      fontSize: 16,
      fontWeight: "500",
    },
    loading: {
      marginVertical: 20,
    },
    imageContainer: {
      flex: 1,
      marginTop: 20,
      width: "100%",
      backgroundColor: theme.colors.background, // Fundo da área de imagens
      borderRadius: 5,
      justifyContent: "center",
      alignItems: "center",
    },
    generatedImage: {
      width: "100%",
      height: 300, // Altura máxima da imagem gerada
      borderRadius: 5,
      marginVertical: 10,
    },
  });