import { View, Text, StyleSheet } from "react-native";
import { useContext } from "react";
import { FirebaseContext } from "../providers/FirebaseProvider";

const HeaderControls = () => {
  const { user, userData } = useContext(FirebaseContext);

  if (user && userData) {
    return (
      <View>{user && <Text>{userData.name.split(" ")[0] ?? email}</Text>}</View>
    );
  }
};

export default HeaderControls;
