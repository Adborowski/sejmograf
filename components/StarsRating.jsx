import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";
import { useState, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";

const Star = ({ index, count, setCount }) => {
  const handlePress = () => {
    if (setCount) {
      setCount(index + 1);
    }
  };

  const isActive = count >= index + 1;
  return (
    <Pressable onPress={handlePress}>
      <View>
        <Text>
          <Ionicons
            size={setCount ? 32 : 12}
            name={isActive ? "star" : "star-outline"}
          />
        </Text>
      </View>
    </Pressable>
  );
};

const StarsRating = ({ count, setCount }) => {
  const maxStars = 5;
  let starElements = [];

  for (let i = 0; i < maxStars; i++) {
    starElements.push(<Star index={i} count={count} setCount={setCount} />);
  }

  return (
    <View>
      <FlatList
        horizontal={true}
        data={starElements}
        renderItem={({ item }) => {
          return item;
        }}
      />
    </View>
  );
};

export default StarsRating;
