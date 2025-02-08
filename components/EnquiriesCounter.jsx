import { Text, View } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";
import Counter from "./Counter";
import { getTerm } from "../utils/getTerm";

const EnquiriesCounter = () => {
  const route = useRoute();
  const mepId = route.params.id;

  const [enquiries, setEnquiries] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.sejm.gov.pl/sejm/term${getTerm()}/writtenQuestions?offset=0&sort_by=num&from=${mepId}`
    )
      .then((res) => res.json())
      .then((data) => {
        setEnquiries(data);
      });
  }, []);
  return (
    <View>
      <Counter number={enquiries.length} text={"Zapytania Poselskie"} />
    </View>
  );
};

export default EnquiriesCounter;
