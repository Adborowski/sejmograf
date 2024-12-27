import { View, StyleSheet } from "react-native";
import MepProfile from "../components/MepProfile";
import Interpelations from "../components/InterpelationsCounter";
import Enquiries from "../components/EnquiriesCounter";
import ReviewWriter from "../components/ReviewWriter";
import Reviews from "../components/Reviews";

const MepScreen = ({ route }) => {
  return (
    <View style={styles.mepScreen}>
      <MepProfile />
      <Interpelations />
      <Enquiries />
      <Reviews id={route.params.id} data={route.params} />
    </View>
  );
};

export default MepScreen;

const styles = StyleSheet.create({
  mepScreen: {
    padding: 12,
    gap: 6,
  },
});
