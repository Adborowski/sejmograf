import { View, Text, StyleSheet } from "react-native";
import { useContext } from "react";
import { FirebaseContext } from "../providers/FirebaseProvider";
import Ionicons from "@expo/vector-icons/Ionicons";

const UserProfileScreen = () => {
  const { userData } = useContext(FirebaseContext);
  const { name, email, uid } = userData;
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <View style={styles.iconWrapper}>
          <Ionicons name={"person-circle-outline"} size={72} />
        </View>
        <Text style={styles.text}>{name}</Text>
        <Text style={styles.text}>{email}</Text>
        <Text style={[styles.text, styles.uid]}>{uid}</Text>
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
});
