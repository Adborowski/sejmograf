import { Pressable, StyleSheet, Text, View } from "react-native";

const Counter = ({ number, text }) => {
  return (
    <View
      style={[styles.counter, number === 0 ? styles.inactive : styles.active]}
    >
      <View style={styles.numberWrapper}>
        <Text style={styles.number}>{number}</Text>
      </View>
      <View style={styles.textWrapper}>
        <Text style={styles.text}>{text}</Text>
      </View>
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({
  counter: {
    backgroundColor: "#ccf",
    flexDirection: "row",
    gap: 12,
    borderRadius: 12,
  },

  inactive: {
    backgroundColor: "#bbb",
    opacity: 0.25,
  },

  numberWrapper: {
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "white",
    margin: 9,
    borderRadius: 60,
    overflow: "hidden",
    paddingVertical: 12,
    paddingHorizontal: 18,
    height: 52,
    width: 72,
  },
  number: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
  textWrapper: {
    flexDirection: "column",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
  },
});
