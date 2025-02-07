import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import globalStyles from "../utils/global-styles";
import { Proceeding } from "../components/Proceedings";
import { useState, useEffect } from "react";
import VotingPill from "../components/VotingPill";

const ProceedingScreen = ({ route }) => {
  const [votings, setVotings] = useState([]);

  const data = route.params.item;
  const proceedingNumber = data.number;
  const query = `https://api.sejm.gov.pl/sejm/term10/votings/${data.number}`; // get votings

  useEffect(() => {
    fetch(query)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        data = data.map((x) => {
          return { ...x, proceedingNumber: proceedingNumber }; // add pN for detailed voting query
        });
        setVotings(data);
      });
  }, []);

  return (
    <View style={globalStyles.screen}>
      <Proceeding item={data} disableControls={true} />
      <FlatList
        contentContainerStyle={{
          gap: 6,
        }}
        data={votings}
        renderItem={({ item, index, maxIndex }) => {
          return (
            <VotingPill item={item} index={index} maxIndex={votings.length} />
          );
        }}
      />
    </View>
  );
};

export default ProceedingScreen;

const styles = StyleSheet.create({});
