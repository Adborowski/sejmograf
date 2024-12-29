import { View, Image, Text, StyleSheet } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

const Logo = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imgWrapper}>
        <Ionicons size={64} name={"invert-mode-outline"} />
      </View>

      <Text style={styles.text}>Sejmograf</Text>
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    marginVertical: 9,
    fontWeight: 600,
  },
  imgWrapper: {
    margin: "auto",
  },
});
