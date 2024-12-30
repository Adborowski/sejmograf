import {
  Pressable,
  Text,
  TextInput,
  View,
  StyleSheet,
  KeyboardAvoidingView,
} from "react-native";

import { useContext, useState } from "react";
import { FirebaseContext } from "../providers/FirebaseProvider";
import { getUniqueId } from "../utils/getUniqueId";
import { useNavigation } from "@react-navigation/native";
import StarsRating from "./StarsRating";

const ReviewWriter = ({ id, data }) => {
  const navigation = useNavigation();

  if (!data) {
    data = {};
  }
  let prefix = "";
  if (data.firstLastName) {
    prefix = `Nowa recenzja dla: ${data.firstLastName}`;
  }
  const ctx = useContext(FirebaseContext);
  const { database, ref, set, user, userData } = ctx;

  const [reviewText, setReviewText] = useState("");
  const [feedback, setFeedback] = useState("");
  const [starCount, setStarCount] = useState(0);

  const handleSubmit = () => {
    let now = new Date();
    now = now.toUTCString();

    if (!reviewText) {
      setFeedback("");
      return;
    }

    if (reviewText) {
      set(ref(database, "reviews/" + id + `/${getUniqueId()}/`), {
        reviewedItemId: id,
        reviewText: reviewText,
        date: now,
        stars: starCount,
        user: userData,
      }).then(() => {
        setFeedback("Dodano recenzję!");
        navigation.goBack();
      });
    }
  };

  const handleChangeText = (text) => {
    setReviewText(text);
  };

  return (
    <KeyboardAvoidingView keyboardVerticalOffset={110} behavior={"position"}>
      <View style={styles.container}>
        <Text>{prefix}</Text>
        <StarsRating count={starCount} setCount={setStarCount} />
        <TextInput
          multiline={true}
          placeholder="Twoja recenzja"
          style={styles.input}
          onChangeText={handleChangeText}
        ></TextInput>
        <View style={styles.bottomBar}>
          <Pressable
            onPress={handleSubmit}
            style={[
              styles.btn,
              !reviewText || !starCount ? styles.disabled : "",
            ]}
          >
            <Text style={styles.btnText}>Wyślij</Text>
          </Pressable>
          {feedback && (
            <View style={styles.feedbackWrapper}>
              <Text>{feedback}</Text>
            </View>
          )}
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ReviewWriter;

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: "black",
    padding: 12,
    borderRadius: 3,
    gap: 12,
  },
  input: {
    padding: 12,
    minHeight: 120,
    borderRadius: 6,
    backgroundColor: "#fafafa",
  },
  btn: {
    paddingVertical: 12,
    borderRadius: 6,
    width: 80,
    backgroundColor: "#ccf",
  },
  disabled: {
    opacity: 0.25,
    backgroundColor: "#bbbbbb",
  },
  btnText: {
    textAlign: "center",
    margin: "auto",
  },
  date: {
    opacity: 0.3,
    marginTop: 3,
  },
  bottomBar: {
    flexDirection: "row",
  },
  feedbackWrapper: {
    justifyContent: "center",
    marginLeft: 12,
  },
});
