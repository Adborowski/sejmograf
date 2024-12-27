import { View, Text, FlatList } from "react-native";
import { useState, useEffect, useContext } from "react";
import { FirebaseContext } from "../providers/FirebaseProvider";

const Reviews = ({ id, data }) => {
  const ctx = useContext(FirebaseContext);
  const { ref, database, onValue } = ctx;

  const [reviews, setReviews] = useState();

  let prefix = "";
  if (reviews) {
    prefix = `Liczba recenzji: ${Object.keys(reviews).length}`;
  }

  useEffect(() => {
    const reviewsRef = ref(database, `reviews/${id}`);
    onValue(reviewsRef, (snapshot) => {
      setReviews(snapshot.val());
    });
  }, []);

  useEffect(() => {
    if (reviews) {
      console.log(`${Object.keys(reviews).length}`, reviews);
    }
  }, [reviews]);

  return (
    <View>
      <Text>{prefix}</Text>
      {reviews && (
        <FlatList
          data={Object.keys(reviews)}
          renderItem={({ item, index }) => {
            const reviewKey = item;
            return (
              <View>
                <Text>{reviews[reviewKey].reviewText}</Text>
              </View>
            );
          }}
        />
      )}
    </View>
  );
};

export default Reviews;
