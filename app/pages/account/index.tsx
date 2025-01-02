import React, { useEffect } from "react";
import { View, Alert } from "react-native";
import { Text, TextInput, Button } from "react-native-paper";
import { useForm, Controller } from "react-hook-form";
import { useTheme } from "@/app/theme/ThemeProvider";
import { useStyles } from "./styles";
import { useTranslation } from "react-i18next";
import Navbar from "@/app/components/navbar";
import SessionExpiredModal from "@/app/components/session-expired-modal";
import useSessionExpired from "@/app/hooks/use-session-expired";
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";
import {
  fetchUserData,
  updateUserData,
} from "@/app/redux/actions/user-form-action";
import {
  updateName,
  updateEmail,
  updatePassword,
  updateUsername,
} from "@/app/redux/slices/user-form-slice";

const Account = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const styles = useStyles(theme);
  const dispatch = useAppDispatch();

  const {
    name,
    username,
    email,
    oldPassword,
    newPassword,
    isNameChanged,
    isUsernameChanged,
    isEmailChanged,
    initialName,
    initialUsername,
    initialEmail,
  } = useAppSelector((state) => state.userForm);

  const { control, handleSubmit } = useForm();
  const { modalVisible, closeModal } = useSessionExpired();

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  const canSubmit =
    name !== initialName ||
    username !== initialUsername ||
    email !== initialEmail ||
    (oldPassword && newPassword);

  const onUpdate = async () => {
    try {
      await dispatch(updateUserData());
      Alert.alert(t("account.successTitle"), t("account.successUpdate"));
    } catch (error) {
      Alert.alert(t("account.errorTitle"), t("account.errorUpdate"));
    }
  };

  return (
    <View style={styles.container}>
      <Navbar showBackButton />
      <SessionExpiredModal visible={modalVisible} onClose={closeModal} />
      <View style={styles.content}>
        <Text variant="headlineMedium" style={styles.title}>
          {t("account.title")}
        </Text>

        <Controller
          control={control}
          name="name"
          render={({ field: { onChange } }) => (
            <TextInput
              label={t("account.nameLabel")}
              value={name}
              onChangeText={(text) => {
                onChange(text);
                dispatch(updateName(text));
              }}
              style={styles.input}
              mode="outlined"
              placeholder={t("account.namePlaceholder")}
            />
          )}
        />

        <Controller
          control={control}
          name="username"
          render={({ field: { onChange } }) => (
            <TextInput
              label={t("account.usernameLabel")}
              value={username}
              onChangeText={(text) => {
                onChange(text);
                dispatch(updateUsername(text));
              }}
              style={styles.input}
              mode="outlined"
              placeholder={t("account.usernamePlaceholder")}
            />
          )}
        />

        <Controller
          control={control}
          name="email"
          render={({ field: { onChange } }) => (
            <TextInput
              label={t("account.emailLabel")}
              value={email}
              onChangeText={(text) => {
                onChange(text);
                dispatch(updateEmail(text));
              }}
              style={styles.input}
              mode="outlined"
              placeholder={t("account.emailPlaceholder")}
              keyboardType="email-address"
            />
          )}
        />

        <Controller
          control={control}
          name="oldPassword"
          render={({ field: { onChange } }) => (
            <TextInput
              label={t("account.currentPasswordLabel")}
              onChangeText={(text) => {
                onChange(text);
                dispatch(updatePassword({ oldPassword: text, newPassword }));
              }}
              style={styles.input}
              mode="outlined"
              placeholder={t("account.currentPasswordPlaceholder")}
              secureTextEntry
            />
          )}
        />

        <Controller
          control={control}
          name="newPassword"
          render={({ field: { onChange } }) => (
            <TextInput
              label={t("account.newPasswordLabel")}
              onChangeText={(text) => {
                onChange(text);
                dispatch(updatePassword({ oldPassword, newPassword: text }));
              }}
              style={styles.input}
              mode="outlined"
              placeholder={t("account.newPasswordPlaceholder")}
              secureTextEntry
            />
          )}
        />

        <Button
          mode="contained"
          onPress={handleSubmit(onUpdate)}
          style={canSubmit ? styles.button : styles.buttonDisabled}
          disabled={!canSubmit}
        >
          <Text
            style={canSubmit ? styles.buttonText : styles.buttonDisabledText}
          >
            {t("account.updateButton")}
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default Account;
