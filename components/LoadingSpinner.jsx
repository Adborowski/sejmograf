import { View, Text, StyleSheet, ActivityIndicator } from "react-native";

const LoadingSpinner = () => {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <ActivityIndicator size="large" color="#00f" />
    </View>
  );
};

export default LoadingSpinner;
