import { View, Text, StyleSheet, Pressable } from "react-native";
import { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { FirebaseContext } from "../providers/FirebaseProvider";
import Ionicons from "@expo/vector-icons/Ionicons";

const HeaderControls = () => {
  const { user, userData } = useContext(FirebaseContext);
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("User Profile Screen");
  };

  if (user && userData) {
    return (
      <Pressable
        style={styles.container}
        onPress={() => {
          handlePress();
        }}
      >
        <View style={styles.imgWrapper}>
          <Ionicons
            size={36}
            style={{ opacity: 0.25 }}
            name={"person-circle-outline"}
          />
        </View>
      </Pressable>
    );
  }
};

export default HeaderControls;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },

  imgWrapper: { justifyContent: "center" },

  text: { fontSize: 17 },
});
