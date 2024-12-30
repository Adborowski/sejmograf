import { View, Text, StyleSheet, Pressable } from "react-native";
import { useContext, useEffect } from "react";
import { FirebaseContext } from "../providers/FirebaseProvider";
import Ionicons from "@expo/vector-icons/Ionicons";

const UserProfileScreen = ({ navigation }) => {
  const { userData, auth, signOut, user } = useContext(FirebaseContext);
  const { name, email, uid } = userData;

  useEffect(() => {
    if (!user) {
      navigation.navigate("Login Screen");
    }
  }, [user]);
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.iconWrapper}>
          <Ionicons name={"person-circle-outline"} size={72} />
        </View>
        <Text style={styles.text}>{name}</Text>
        <Text style={styles.text}>{email}</Text>
        <Text style={[styles.text, styles.uid]}>{uid}</Text>
        <Pressable
          onPress={() => {
            signOut(auth);
          }}
        >
          <Text style={styles.btnSignOut}>Sign Out</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default UserProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 6,
    justifyContent: "center",
  },

  inner: {
    backgroundColor: "#ddf",
    padding: 24,

    margin: "auto",
    borderRadius: 12,
  },

  iconWrapper: {
    margin: "auto",
    marginBottom: 12,
    opacity: 0.25,
  },

  text: {
    textAlign: "center",
  },

  uid: {
    opacity: 0.25,
    marginTop: 12,
    fontSize: 12,
  },
  btnSignOut: {
    padding: 12,
    borderWidth: 1,
    borderColor: "black",
    textAlign: "center",
    marginTop: 18,
    borderRadius: 6,
  },
});
