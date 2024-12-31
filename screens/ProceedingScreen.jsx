import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import globalStyles from "../utils/global-styles";
import { Proceeding } from "../components/Proceedings";
import { useState, useEffect } from "react";

const ProceedingScreen = ({ route }) => {
  const [votings, setVotings] = useState([]);

  const data = route.params.item;
  const query = `https://api.sejm.gov.pl/sejm/term10/votings/${data.number}`;

  useEffect(() => {
    fetch(query)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setVotings(data);
      });
  }, []);

  return (
    <View style={globalStyles.screen}>
      <Proceeding item={data} disableControls={true} />
      <FlatList
        data={votings}
        renderItem={() => {
          return <Text>Voting</Text>;
        }}
      />
    </View>
  );
};

export default ProceedingScreen;

const styles = StyleSheet.create({});
