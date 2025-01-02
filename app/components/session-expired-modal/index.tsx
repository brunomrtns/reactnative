import React from "react";
import { Modal, Portal, Text, Button } from "react-native-paper";
import { useTheme } from "@/app/theme/ThemeProvider";
import { useStyles } from "./styles";
import { useTranslation } from "react-i18next";

type SessionExpiredModalProps = {
  visible: boolean;
  onClose: () => void;
};

const SessionExpiredModal: React.FC<SessionExpiredModalProps> = ({
  visible,
  onClose,
}) => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = useStyles(theme);

  return (
    <Portal>
      <Modal
        visible={visible}
        dismissable={false}
        contentContainerStyle={styles.modal}
      >
        <Text style={styles.text}>
          {t("sessionExpiredModal.sessionExpiredLabel")}
        </Text>
        <Button
          mode="contained"
          onPress={() => {
            onClose();
          }}
          style={styles.button}
        >
          {t("sessionExpiredModal.ok")}
        </Button>
      </Modal>
    </Portal>
  );
};

export default SessionExpiredModal;
