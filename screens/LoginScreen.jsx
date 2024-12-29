import { View, Text, StyleSheet } from "react-native";
import Login from "../components/Login";
import globalStyles from "../utils/global-styles";

const LoginScreen = ({ navigation }) => {
  return (
    <View style={globalStyles.screen}>
      <Login navigation={navigation} />
    </View>
  );
};

export default LoginScreen;
