import { View, Text, StyleSheet, Pressable, TextInput } from "react-native";
import Logo from "./Logo";

const Login = () => {
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.imgWrapper}>
          <Logo />
        </View>
        <View>
          <TextInput style={styles.input} placeholder="Email" />
        </View>
        <View>
          <TextInput style={styles.input} placeholder="Hasło" />
        </View>
        <Pressable style={styles.btn}>
          <Text style={styles.btnlabel}>Zaloguj</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    flexDirection: "column",
    justifyContent: "center",
  },
  inner: {
    backgroundColor: "#ddf",
    borderRadius: 6,
    margin: "auto",
    padding: 24,
    gap: 12,
    minHeight: 300,
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
  },
});
