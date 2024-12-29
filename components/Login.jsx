import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { useState, useEffect } from "react";
import Logo from "./Logo";

const Login = () => {
  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={styles.container}
      keyboardVerticalOffset={110}
    >
      <View style={styles.inner}>
        <View style={styles.imgWrapper}>
          <Logo />
        </View>
        <View>
          <TextInput
            inputMode="email"
            style={styles.input}
            placeholder="Email"
          />
        </View>
        <View>
          <TextInput secureTextEntry style={styles.input} placeholder="Hasło" />
        </View>
        <Pressable style={styles.btn}>
          <Text style={styles.btnlabel}>Zaloguj</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  inner: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 6,
    margin: "auto",
    padding: 24,
    gap: 12,
  },
  imgWrapper: {
    margin: "auto",
  },
  input: {
    textAlign: "center",
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 36,
    borderRadius: 6,
    minWidth: 300,
    fontSize: 18,
    backgroundColor: "#eee",
  },
  btn: {
    backgroundColor: "#ccf",
    paddingVertical: 12,
    borderRadius: 6,
    width: 150,
    marginHorizontal: "auto",
    marginTop: 18,
  },
  btnlabel: {
    textAlign: "center",
    fontSize: 18,
  },
});
