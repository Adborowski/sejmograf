import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const VotingPill = ({ item, index, maxIndex }) => {
  // maxIndex is total votings in proceeding
  const navigation = useNavigation();

  const displayDate = new Date(item.date).toUTCString();
  let hasDuplicateTitle = false;

  if (item && item.title && item.topic) {
    hasDuplicateTitle = item.title.toLowerCase() == item.topic.toLowerCase();
  }

  return (
    <Pressable
      onPress={() => {
        navigation.navigate("Voting Screen", { item: item });
      }}
    >
      <View style={styles.container}>
        <View>
          <Text style={styles.counter}>
            {index + 1} / {maxIndex}
          </Text>
          <Text style={styles.date}>{displayDate}</Text>
          <Text style={styles.title}>{item.title}</Text>
          {!hasDuplicateTitle && <Text style={styles.topic}>{item.topic}</Text>}
        </View>
        <View style={styles.results}>
          <Text style={styles.result}>{item.yes} TAK</Text>
          <Text style={styles.result}>{item.no} NIE</Text>
          <Text style={styles.result}>{item.abstain} WSTRZYMAŁO SIĘ</Text>
          <Text style={styles.result}>{item.notParticipating} NIEOBECNYCH</Text>
        </View>
      </View>
    </Pressable>
  );
};

export default VotingPill;

const styles = StyleSheet.create({
  container: {
    padding: 6,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 6,
    gap: 9,
  },
  title: {
    fontSize: 14,
    maxWidth: "90%",
  },
  topic: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 9,
    backgroundColor: "#ccf",
    textTransform: "uppercase",
    padding: 9,
    borderRadius: 6,
  },
  results: {
    flexWrap: "wrap",
    flexDirection: "row",
    padding: 3,
    backgroundColor: "white",
  },
  result: {
    width: "50%",
  },
  date: {
    marginBottom: 6,
    opacity: 0.25,
  },
  counter: {
    position: "absolute",
    opacity: 0.25,
    top: 0,
    right: 0,
  },
});
