import { StyleSheet, View, Text, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

const DocumentPill = (props) => {
  let { title, subtitle, receiptDate, to, isReply } = props.item;
  const { parentDocument } = props;

  // a reply has no title
  if (!title) {
    title = "Dokument";
  }

  if (parentDocument) {
    title = "RE: " + parentDocument.title;
    to = parentDocument.to.join("\n");
  }

  const navigation = useNavigation();
  let processedTitle = title.replace("Interpelacja w", "W");

  const handlePress = () => {
    navigation.navigate("Doc Reader Screen", {
      document: props.item,
      mep: props.mep,
    });
  };

  return (
    <Pressable onPress={handlePress}>
      <View style={styles.pill}>
        <Text style={styles.date}>{receiptDate}</Text>
        <Text style={styles.title}>{processedTitle}</Text>
        <Text style={styles.subtitle}>{isReply ? parentDocument.to : to}</Text>
      </View>
    </Pressable>
  );
};

export default DocumentPill;

const styles = StyleSheet.create({
  pill: {
    padding: 12,
    backgroundColor: "#ccf",
    borderRadius: 12,
    marginBottom: 6,
  },
  date: { color: "black", opacity: 0.5, marginBottom: 6 },
  title: { fontWeight: "600", fontSize: 16, maxWidth: "95%" },
  subtitle: {
    fontSize: 16,
    opacity: 0.5,
    marginTop: 6,
  },
});
