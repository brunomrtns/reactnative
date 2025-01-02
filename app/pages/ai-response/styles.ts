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
    aiResponseMarked: {
      flex: 1,
      marginTop: 20,
      width: "100%",
      backgroundColor: theme.colors.background,
      borderRadius: 2,
    },
  });

export const getMarkdownStyles = (
  theme: MD3Theme & { customColors: Record<string, string> }
): NamedStyles<any> => ({
  body: {
    backgroundColor: theme.colors.background || "#ffffff", // Fundo do texto
    color: theme.colors.onBackground || "#000000", // Cor do texto
  },
  heading1: {
    color: theme.colors.primary || "#333333",
    fontSize: 24,
  },
  strong: {
    fontWeight: "bold",
    color: theme.colors.onBackground || "#222222",
  },
  code_block: {
    backgroundColor: theme.customColors.codeBlockBackground, // Fundo do bloco
    color: theme.customColors.codeBlockText, // Texto do bloco
    borderColor: theme.customColors.codeBlockBorder, // Borda
    borderWidth: 1,
    padding: 8,
    borderRadius: 4,
  },
  link: {
    color: theme.customColors?.link || theme.colors.primary || "#1e90ff",
    textDecorationLine: "underline",
  },
});
