import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import globalStyles from "../utils/global-styles";

const VotingScreen = ({ route }) => {
  const data = route.params.item;
  const { proceedingNumber, votingNumber } = data;
  const query = `https://api.sejm.gov.pl/sejm/term10/votings/${proceedingNumber}/${votingNumber}`;

  const [votingDetails, setVotingDetails] = useState();

  useEffect(() => {
    fetch(query)
      .then((res) => res.json())
      .then((json) => {
        setVotingDetails(json);
      });
  }, []);

  const VotingDetails = () => {
    if (!votingDetails) {
      return;
    }

    const { title, topic, totalVoted, votes, yes, no, abstain } = votingDetails;
    const hasDuplicateTitle = title.toLowerCase() === topic.toLowerCase();
    return (
      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {!hasDuplicateTitle && <Text style={styles.topic}>{topic}</Text>}
      </View>
    );
  };
  return (
    <View style={globalStyles.screen}>
      <VotingDetails />
    </View>
  );
};

export default VotingScreen;

const styles = StyleSheet.create({
  title: { fontSize: 18, fontWeight: "bold" },
});
