import { StyleSheet, Text, View, Pressable } from "react-native";
import globalStyles from "../utils/global-styles";
import React from "react";
import Proceedings from "../components/Proceedings";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HomeScreen = ({ navigation }) => {
  return (
    <View style={globalStyles.screen}>
      <View style={styles.controls}>
        <Pressable
          style={styles.btn}
          onPress={() => {
            navigation.navigate("Mep Browser Screen");
          }}
        >
          <Text style={styles.btnText}>Posłowie</Text>
        </Pressable>
        <Proceedings />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#ccf",
    margin: "auto",
    justifyContent: "center",
    borderRadius: 12,
  },
  controls: {
    gap: 12,
  },
  btnText: {
    textAlign: "center",
    fontSize: 18,
    padding: 24,
  },
});
