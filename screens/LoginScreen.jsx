import { View, Text, StyleSheet } from "react-native";
import Login from "../components/Login";
import globalStyles from "../utils/global-styles";

const LoginScreen = () => {
  return (
    <View style={globalStyles.screen}>
      <Login />
    </View>
  );
};

export default LoginScreen;
