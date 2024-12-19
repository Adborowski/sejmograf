import { View, Text, StyleSheet, TextInput, Image } from "react-native";
import { useState, useEffect } from "react";

const SearchBar = ({ list, setList }) => {
  const [term, setTerm] = useState("");
  const untouchedList = list;

  const handleChange = (change) => {
    setTerm(change);
  };

  useEffect(() => {
    setList(
      untouchedList.filter((item) => {
        // case: meps
        if (item.birthDate) {
          const itemString =
            item.firstName +
            item.lastName +
            item.firstLastName +
            item.lastFirstName;
          return itemString.toLowerCase().includes(term.toLowerCase());
        }

        if (item.name) {
          return item.name.includes(term);
        }
      })
    );

    if (!term) {
      setList(untouchedList);
    }
  }, [term]);

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
          onChangeText={handleChange}
          placeholder="Szukaj"
          style={styles.input}
        />
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
    // backgroundColor: "white",
    padding: 9,
    opacity: 0.25,
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
  placeholder: {},
});
