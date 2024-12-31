import { View, StyleSheet, SectionList, VirtualizedList } from "react-native";
import MepProfile from "../components/MepProfile";
import Interpelations from "../components/InterpelationsCounter";
import Enquiries from "../components/EnquiriesCounter";
import Reviews from "../components/Reviews";
import globalStyles from "../utils/global-styles";

const MepScreen = ({ route }) => {
  return (
    <View style={globalStyles.screen}>
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
