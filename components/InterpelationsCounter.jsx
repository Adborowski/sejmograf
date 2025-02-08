import { Text, View, Pressable } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import Counter from "./Counter";
import { getTerm } from "../utils/getTerm";

const InterpelationsCounter = (props) => {
  const route = useRoute();
  const navigation = useNavigation();
  const mepId = route.params.id;

  const queryString = `https://api.sejm.gov.pl/sejm/term${getTerm()}/interpellations?offset=0&sort_by=-date&from=${mepId}`;
  const [interpelations, setInterpelations] = useState([]);

  useEffect(() => {
    fetch(queryString)
      .then((res) => {
        return res.json();
      })
      .then((json) => {
        json.reverse();
        setInterpelations(json);
      });
  }, []);

  return (
    <Pressable
      onPress={() => {
        navigation.navigate("Documents Screen", {
          documents: interpelations,
          mep: route.params,
        });
      }}
    >
      <Counter number={interpelations.length} text={"Interpelacje"} />
    </Pressable>
  );
};

export default InterpelationsCounter;
