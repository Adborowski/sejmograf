import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useState, useEffect } from "react";
import { FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Proceeding = ({ item }) => {
  let editedTitle = item.title.split("RP")[0];

  return (
    <View style={styles.proceedingWrapper}>
      <View style={styles.topText}>
        <Text style={styles.procTitle}>{editedTitle}</Text>
        <Text style={styles.procDayCounter}>{item.dates.length} dni</Text>
      </View>
      <FlatList
        style={styles.procDates}
        horizontal={true}
        data={item.dates}
        renderItem={({ item }) => {
          return (
            <View>
              <Text style={styles.procDate}>{item}</Text>
            </View>
          );
        }}
      />
    </View>
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

  procDate: {
    padding: 9,
    backgroundColor: "white",
    marginRight: 6,
    borderRadius: 3,
  },

  procTitle: {
    justifyContent: "space-between",
    fontSize: 18,
  },
  proceedingWrapper: {
    gap: 6,
    backgroundColor: "#ddf",
    padding: 12,
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
