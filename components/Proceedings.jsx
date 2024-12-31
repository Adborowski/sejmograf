import { StyleSheet, Text, View, Pressable } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { FlatList } from "react-native";
import { useNavigation } from "@react-navigation/native";

export const Proceeding = ({ item, disableControls }) => {
  let editedTitle = item.title.split("RP")[0];
  const navigation = useNavigation();
  const dates = item.dates;

  return (
    <Pressable
      onPress={() => {
        if (!disableControls) {
          navigation.navigate("Proceeding Screen", {
            item: item,
          });
        }
      }}
    >
      <View style={styles.proceedingWrapper}>
        <View style={styles.topText}>
          <Text style={styles.procTitle}>{editedTitle}</Text>
          <Text style={styles.procDayCounter}>
            {dates.length} {dates.length == 1 ? "dzień" : "dni"}
          </Text>
        </View>
        <FlatList
          style={styles.procDates}
          numColumns={3}
          data={dates}
          renderItem={({ item }) => {
            return (
              <View>
                <Text style={styles.procDate}>{item}</Text>
              </View>
            );
          }}
        />
      </View>
    </Pressable>
  );
};

const Proceedings = () => {
  const [data, setData] = useState();

  useEffect(() => {
    fetch("https://api.sejm.gov.pl/sejm/term10/proceedings")
      .then((res) => res.json())
      .then((json) => {
        json.sort((a, b) => b.number - a.number);
        setData(json);
      });
  }, []);

  return (
    <View style={styles.proceedings}>
      {data && (
        <FlatList
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={{ paddingBottom: 180 }}
          data={data}
          renderItem={({ item, index }) => {
            return <Proceeding item={item} />;
          }}
        />
      )}
    </View>
  );
};

export default Proceedings;

const styles = StyleSheet.create({
  proceedings: {
    gap: 12,
  },

  procDates: {
    gap: 6,
  },

  procDate: {
    padding: 9,
    backgroundColor: "white",
    marginRight: 6,
    borderRadius: 30,
    width: 100,
    textAlign: "center",
  },

  procTitle: {
    justifyContent: "space-between",
    fontSize: 18,
  },
  proceedingWrapper: {
    gap: 12,
    backgroundColor: "#ddf",
    padding: 12,
    borderRadius: 6,
  },
  separator: {
    height: 9,
  },
  procDayCounter: {
    opacity: 0.25,
    fontSize: 18,
  },
  topText: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
