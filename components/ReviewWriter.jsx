import {
  Pressable,
  Text,
  TextInput,
  View,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";

import { useContext, useState, useEffect } from "react";
import { FirebaseContext } from "../providers/FirebaseProvider";
import { getUniqueId } from "../utils/getUniqueId";

const ReviewWriter = ({ id, data }) => {
  let suffix = "";
  if (data.firstLastName) {
    suffix = `dla: ${data.firstLastName}`;
  }
  const ctx = useContext(FirebaseContext);
  const { app, database, ref, set } = ctx;

  const [reviewText, setReviewText] = useState("Random review");

  const handleSubmit = () => {
    set(ref(database, "reviews/" + id + `/${getUniqueId()}/`), {
      reviewedItemId: id,
      reviewText: reviewText,
    });
  };

  const handleChangeText = (text) => {
    setReviewText(text);
  };

  return (
    <KeyboardAvoidingView keyboardVerticalOffset={110} behavior={"position"}>
      <View style={styles.container}>
        <Text>Dodaj recenzję {suffix}</Text>
        <TextInput
          multiline={true}
          placeholder="Twoja recenzja"
          style={styles.input}
          onChangeText={handleChangeText}
        ></TextInput>
        <Pressable onPress={handleSubmit} style={styles.btn}>
          <Text style={styles.btnText}>Wyślij</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ReviewWriter;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#eee",
    borderWidth: 1,
    borderColor: "black",
    padding: 12,
    borderRadius: 3,
  },
  focusMask: {
    position: "absolute",
    top: 0,
    left: 0,
    height: 100,
    backgroundColor: "black",
  },
  input: {
    padding: 12,
    maxWidth: "90%",
    minHeight: 60,
    borderRadius: 6,
    marginVertical: 12,
    backgroundColor: "#fafafa",
  },
  btn: {
    padding: 12,
    borderRadius: 6,
    width: 80,
    backgroundColor: "#ccf",
  },
  btnText: {
    textAlign: "center",
    margin: "auto",
  },
});
