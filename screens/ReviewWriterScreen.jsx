import { View, Text } from "react-native";
import ReviewWriter from "../components/ReviewWriter";
import globalStyles from "../utils/global-styles";

const ReviewWriterScreen = ({ route }) => {
  const { data, id } = route.params;

  return (
    <View style={globalStyles.screen}>
      <ReviewWriter id={id} data={data} />
    </View>
  );
};

export default ReviewWriterScreen;
