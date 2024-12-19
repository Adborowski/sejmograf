import { View, Text, Image, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

const MepProfile = () => {
  const route = useRoute();

  const { club, districtName, voivodeship, firstLastName, id, img } =
    route.params;
  return (
    <View style={styles.mepProfile}>
      <View style={styles.imageWrapper}>
        <Image style={styles.portrait} source={img} width={110} height={137} />
      </View>
      <View style={styles.mepInfo}>
        <Pill text={firstLastName} textStyle={styles.name} />
        <Pill text={club} />
        <Pill text={`${districtName} [${id}]`} />
      </View>
    </View>
  );
};

const Pill = ({ text, textStyle, style }) => {
  return (
    <View style={[styles.pill, style]}>
      <Text style={[styles.pillText, textStyle]}>{text}</Text>
    </View>
  );
};

export default MepProfile;

const styles = StyleSheet.create({
  mepProfile: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 12,
    backgroundColor: "#ddf",
    borderRadius: 12,
    paddingHorizontal: 12,
  },
  imageWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 12,
  },
  portrait: {
    borderRadius: 12,
    overflow: "hidden",
  },
  mepInfo: {
    flexDirection: "column",
    justifyContent: "center",
  },
  pill: {
    padding: 2,
  },
  pillText: {
    textAlign: "left",
    maxWidth: 230,
  },
  name: {
    fontSize: 24,
    maxWidth: 180,
    fontWeight: "bold",
  },
});
