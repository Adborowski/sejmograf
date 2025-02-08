import { StyleSheet, Text, View, Pressable } from "react-native";
import { useState, useEffect } from "react";
import { getAttendance, createAttendance } from "../utils/getAttendance";
import { getVotingData } from "../utils/getVotingData";
import React from "react";

const Attendance = () => {
  return (
    <View>
      <Pressable
        style={styles.btn}
        onPress={() => {
          createAttendance();
        }}
      >
        <Text style={styles.btnLabel}>Create Attendance</Text>
      </Pressable>
    </View>
  );
};

export default Attendance;

const styles = StyleSheet.create({
  btn: {
    padding: 12,
    backgroundColor: "#ddf",
    borderRadius: 60,
  },
  btnLabel: {
    textAlign: "center",
  },
});
