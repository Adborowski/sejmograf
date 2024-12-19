import { View, StyleSheet } from "react-native";
import MepProfile from "../components/MepProfile";
import Interpelations from "../components/InterpelationsCounter";
import Enquiries from "../components/EnquiriesCounter";
import SearchBar from "../components/SearchBar";

const MepScreen = () => {
  return (
    <View style={styles.mepScreen}>
      <MepProfile />
      <Interpelations />
      <Enquiries />
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
