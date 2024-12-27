import { View, Text, StyleSheet, TextInput, Image } from "react-native";
import { useState, useEffect } from "react";

const SearchBar = ({ searchTerm, setSearchTerm, list }) => {
  const handleChange = (change) => {
    setSearchTerm(change);
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconWrapper}>
        <Image
          source={require("../assets/icon-search.png")}
          style={styles.icon}
        />
      </View>
      <View style={styles.inputWrapper}>
        <TextInput
          autoCorrect={false}
          autoComplete={false}
          onChangeText={handleChange}
          placeholder="Szukaj"
          style={styles.input}
        />
      </View>
      <View style={styles.countWrapper}>
        <Text style={styles.count}>{list.length}</Text>
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    gap: 6,
    marginBottom: 12,
  },
  iconWrapper: {
    height: 50,
    width: 42,
    flexDirection: "column",
    justifyContent: "center",
  },
  icon: {
    width: 42,
    height: 42,
    margin: "auto",
    borderRadius: 100,
    paddingRight: 4,
    paddingTop: 3,
    // backgroundColor: "white",

    opacity: 0.1,
  },

  inputWrapper: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  input: {
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 18,
    borderRadius: 60,
  },
  countWrapper: {
    flexDirection: "column",
    justifyContent: "center",
    position: "absolute",
    height: 50,
    width: 42,
    top: 0,
    left: 0,
    // backgroundColor: "pink",
  },
  count: {
    opacity: 0.25,
    fontSize: 10,
    textAlign: "center",
  },
});
