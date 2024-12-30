import { View, Text, StyleSheet } from "react-native";
import StarsRating from "./StarsRating";
import getFormattedDate from "../utils/getFormattedDate";

const Review = ({ item }) => {
  if (!item) {
    console.log("Error - no 'item' prop provided to <Review/>");
    return;
  }

  return (
    <View style={styles.review}>
      <View style={styles.reviewInfo}>
        <View style={styles.dateWrapper}>
          <Text style={styles.date}>
            {getFormattedDate(item.date)} {item.user ? item.user.name : ""}
          </Text>
        </View>
        <StarsRating size={12} count={item.stars} />
      </View>

      <View style={styles.reviewTextWrapper}>
        <Text style={styles.reviewText}>{item.reviewText}</Text>
      </View>
    </View>
  );
};

export default Review;

const styles = StyleSheet.create({
  review: {
    backgroundColor: "#fafafa",
    padding: 6,
    borderRadius: 6,
  },
  reviewInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  separator: {
    height: 6,
  },
  date: {
    opacity: 0.3,
  },
});
