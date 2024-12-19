import Meps from "../components/Meps";
import { View } from "react-native";

const MepBrowserScreen = ({ navigation }) => {
  return (
    <View>
      <Meps navigation={navigation} />
    </View>
  );
};

export default MepBrowserScreen;
