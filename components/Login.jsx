import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { useState, useContext, useEffect } from "react";
import { FirebaseContext } from "../providers/FirebaseProvider";
import Logo from "./Logo";
import * as Crypto from "expo-crypto";
import { getRandomName } from "../utils/getRandomName";

const Login = ({ navigation }) => {
  // adborowski@gmail.com
  // dummy123

  const [email, setEmail] = useState(
    `${Crypto.randomUUID().slice(0, 8)}@gmail.com`
  );
  const [password, setPassword] = useState("dummy123");
  const [error, setError] = useState("");
  const [user, setUser] = useState();

  useEffect(() => {
    if (user) {
      navigation.navigate("Mep Browser Screen");
    }
  }, [user]);

  const firebase = useContext(FirebaseContext);
  const {
    auth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    ref,
    set,
    database,
  } = firebase;

  const handleSubmitLogin = () => {
    setError();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  };

  const saveUser = (user) => {
    if (user) {
      set(
        ref(
          database,
          "users/" + `${user.uid ?? "RANDOM" + Crypto.randomUUID()}/`
        ),
        user
      ).then(() => {
        console.log("\u001b[1;36m[NEW USER] " + `${user.name} ${user.email}`);
      });
    }
  };

  const handleSubmitRegistration = () => {
    setError();
    const name = getRandomName();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setUser(userCredential.user);
        saveUser({
          name: name,
          email: userCredential.user.email,
          uid: userCredential.user.uid,
        });
      })
      .catch((error) => {
        console.log(error);
        setError(error);
      });
  };

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
            value={email}
            inputMode="email"
            style={styles.input}
            placeholder="Email"
            onChangeText={(text) => {
              setEmail(text);
            }}
          />
        </View>
        <View>
          <TextInput
            value={password}
            secureTextEntry
            style={styles.input}
            placeholder="Hasło"
            onChangeText={(text) => {
              setPassword(text);
            }}
          />
        </View>
        {error && <Text style={styles.error}>ERROR</Text>}
        <View style={styles.controls}>
          <Pressable style={styles.btn} onPress={handleSubmitLogin}>
            <Text style={styles.btnlabel}>Zaloguj</Text>
          </Pressable>
          <Pressable style={styles.btn} onPress={handleSubmitRegistration}>
            <Text style={styles.btnlabel}>Załóż Konto</Text>
          </Pressable>
          <Pressable
            style={styles.btn}
            onPress={() => {
              setEmail(Crypto.randomUUID().slice(0, 4) + "@gmail.com");
            }}
          >
            <Text style={styles.btnlabel}>Roll</Text>
          </Pressable>
        </View>
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
    overflow: "hidden",
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
  controls: {
    flexDirection: "row",
    gap: 12,
    margin: "auto",
  },

  btn: {
    backgroundColor: "#ccf",
    paddingVertical: 12,
    borderRadius: 6,
    paddingHorizontal: 12,
    marginTop: 18,
  },
  btnlabel: {
    textAlign: "center",
    fontSize: 18,
  },
  error: {
    backgroundColor: "pink",
    position: "absolute",
    textAlign: "center",
    paddingVertical: 3,
    left: 0,
    right: 0,
  },
});
