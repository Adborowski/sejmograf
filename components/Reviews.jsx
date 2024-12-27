import { View, Text, FlatList, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../providers/FirebaseProvider";
import getFormattedDate from "../utils/getFormattedDate";

const Reviews = ({ id, data }) => {
  const ctx = useContext(FirebaseContext);
  const { ref, database, onValue } = ctx;

  const [reviews, setReviews] = useState();
  const navigation = useNavigation();

  let prefix = "";
  if (reviews) {
    prefix = `Recenzje (${Object.keys(reviews).length})`;
  }

  useEffect(() => {
    const reviewsRef = ref(database, `reviews/${id}`);
    onValue(reviewsRef, (snapshot) => {
      const reviewsObject = snapshot.val();

      if (!reviewsObject) {
        return;
      }

      const reviewKeys = Object.keys(reviewsObject);

      // get a regular array rather than obj
      let reviewsArray = reviewKeys.map((rKey) => {
        return reviewsObject[rKey];
      });

      // sort the array by date
      reviewsArray = reviewsArray.sort((a, b) => {
        return new Date(b.date) - new Date(a.date);
      });

      setReviews(reviewsArray);
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        {reviews && (
          <View style={styles.prefixWrapper}>
            <Text style={styles.prefix}>{prefix}</Text>
          </View>
        )}
        <Pressable
          onPress={() => {
            navigation.navigate("Review Writer Screen", { id: id, data: data });
          }}
          style={styles.btnAddReview}
        >
          <Text>Dodaj Recenzję</Text>
        </Pressable>
      </View>
      {reviews && (
        <FlatList
          data={reviews}
          ItemSeparatorComponent={() => <View style={styles.separator}></View>}
          renderItem={({ item }) => {
            return (
              <View style={styles.review}>
                <View style={styles.dateWrapper}>
                  <Text style={styles.date}>{getFormattedDate(item.date)}</Text>
                </View>
                <View style={styles.reviewTextWrapper}>
                  <Text style={styles.reviewText}>{item.reviewText}</Text>
                </View>
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

export default Reviews;

const styles = StyleSheet.create({
  container: { marginTop: 6 },
  topBar: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  prefixWrapper: {
    justifyContent: "center",
  },
  prefix: {
    fontSize: 18,
    fontWeight: "bold",
  },
  btnAddReview: {
    backgroundColor: "lime",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 6,
    backgroundColor: "#ccf",
  },

  review: {
    backgroundColor: "#fafafa",
    padding: 6,
    borderRadius: 6,
  },
  separator: {
    height: 6,
  },
  date: {
    opacity: 0.3,
  },
});
