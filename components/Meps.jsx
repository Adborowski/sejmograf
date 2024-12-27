import SearchBar from "./SearchBar";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
} from "react-native";

const Meps = ({ navigation }) => {
  const [meps, setMeps] = useState(require("../data/meps-all.json"));
  const untouchedList = require("../data/meps-all.json");
  const images = require.context("../assets/img/", false, /\.jpeg$/);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setMeps(
      untouchedList.filter((mep) => {
        const filterString = mep.firstLastName + mep.lastFirstName;
        return filterString.toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
  }, [searchTerm]);

  return (
    <View>
      {meps && (
        <View style={styles.container}>
          <SearchBar
            setSearchTerm={setSearchTerm}
            searchTerm={searchTerm}
            list={meps}
          />
          <FlatList
            data={meps}
            renderItem={(mep) => {
              return (
                <Mep
                  navigation={navigation}
                  mepData={mep}
                  img={images(`./${parseInt(mep.item.id)}.jpeg`)}
                />
              );
            }}
          />
        </View>
      )}
    </View>
  );
};

const Mep = ({ mepData, img, navigation }) => {
  const { lastFirstName, id, club } = mepData.item;
  return (
    <Pressable
      onPress={() => {
        navigation.navigate("Mep Screen", { ...mepData.item, img: img });
      }}
    >
      <View style={styles.mep}>
        <View>
          <Image
            style={styles.portraitMini}
            source={img}
            width={50}
            height={50}
          />
        </View>

        <View style={styles.textWrapper}>
          <Text style={styles.name}>{lastFirstName}</Text>
        </View>

        <Text style={styles.id}>{id}</Text>
        <Text style={styles.club}>{club}</Text>
      </View>
    </Pressable>
  );
};

export default Meps;

const styles = StyleSheet.create({
  container: {
    padding: 12,
  },
  mep: {
    backgroundColor: "#eaeaea",
    padding: 6,
    marginBottom: 6,
    borderRadius: 6,
    flexDirection: "row",
    gap: 12,
  },
  textWrapper: {
    flexDirection: "column",
    justifyContent: "center",
  },
  portraitMini: {
    width: 55,
    height: 70,
    borderRadius: 3,
  },
  name: {
    fontSize: 20,
  },
  id: {
    position: "absolute",
    top: 6,
    right: 12,
    color: "#aaa",
  },
  club: {
    position: "absolute",
    bottom: 6,
    right: 12,
    color: "#aaa",
  },
});
