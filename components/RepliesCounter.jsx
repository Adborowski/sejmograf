import { View, StyleSheet, Text, Pressable } from "react-native";
import Counter from "./Counter";
import { useNavigation } from "@react-navigation/native";

const RepliesCounter = (props) => {
  let { mep, parentDocument } = props;
  const { replies } = parentDocument;
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => {
        if (replies.length > 0) {
          navigation.navigate("Documents Screen", {
            documents: parentDocument.replies,
            mep: mep,
            parentDocument: parentDocument,
          });
        }
      }}
    >
      <Counter
        number={replies.length}
        text={replies.length === 1 ? "Odpowiedź" : "Odpowiedzi"}
      />
    </Pressable>
  );
};

export default RepliesCounter;
