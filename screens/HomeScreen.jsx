import { StyleSheet, Text, View, Pressable } from "react-native";
import globalStyles from "../utils/global-styles";
import React from "react";
import Proceedings from "../components/Proceedings";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { getVotingData, wipeVotingData } from "../utils/getVotingData";
import { createAttendance } from "../utils/getAttendance";

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
        <Pressable
          style={styles.btn}
          onPress={() => {
            getVotingData();
          }}
        >
          <Text style={styles.btnText}>Get Data</Text>
        </Pressable>
        <Pressable
          style={styles.btn}
          onPress={() => {
            createAttendance();
          }}
        >
          <Text style={styles.btnText}>Create Attendance</Text>
        </Pressable>
        <Proceedings />
      </View>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  btn: {
    backgroundColor: "#ddd",
    justifyContent: "center",
    borderRadius: 60,
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
