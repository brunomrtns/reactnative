import { StyleSheet } from "react-native";
import { MD3Theme } from "react-native-paper";

export const useStyles = (
  theme: MD3Theme & { customColors: Record<string, string> }
) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background, // Fundo dinâmico
    },
    scrollView: {
      flex: 1,
    },
    content: {
      padding: 20,
    },
    card: {
      marginBottom: 20,
      backgroundColor: theme.colors.surface, // Fundo do card
    },
    title: {
      marginBottom: 10,
      color: theme.customColors.text, // Texto dinâmico
    },
    input: {
      marginTop: 10,
      backgroundColor: theme.customColors.inputBackground, // Fundo do input
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      marginVertical: 10,
    },
    text: {
      marginLeft: 10,
      color: theme.customColors.text, // Texto dinâmico
    },
    divider: {
      marginVertical: 10,
      backgroundColor: theme.colors.onSurface, // Cor da linha divisória
    },
    fab: {
      position: "absolute", // Faz o FAB flutuar
      bottom: 20, // Distância da parte inferior
      right: 20, // Distância da lateral direita
    },
    button: {
      marginTop: 16,
      backgroundColor: theme.colors.primary, // Fundo do botão dinâmico
      borderRadius: 8,
    },
    buttonText: {
      color: theme.colors.onPrimary, // Texto do botão
      fontWeight: "600",
    },
  });
