import { View, FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";
import DocumentPill from "../components/DocumentPill";
import globalStyles from "../utils/global-styles";
import SearchBar from "../components/SearchBar";

const DocumentsScreen = () => {
  const route = useRoute();
  let untouchedDocuments = route.params.documents;
  const [documents, setDocuments] = useState(untouchedDocuments);
  const mep = route.params.mep;
  const parentDocument = route.params.parentDocument;

  useEffect(() => {}, []);

  const processDocuments = (documents) => {};

  let editedDocuments = documents;
  // edit each document
  editedDocuments = editedDocuments.map((doc) => {
    if (parentDocument && !doc.title) {
      // it's a reply to an existing document; doesn't have a title
      return {
        ...doc,
        title: `RE: ${parentDocument.title}`,
        subtitle: `${parentDocument.to}`,
        isReply: true,
        parentDocument: parentDocument,
      };
    }
    return { ...doc };
  });

  return (
    <View style={styles.screen}>
      <SearchBar list={documents} setList={setDocuments} />
      <FlatList
        data={documents}
        renderItem={(data) => (
          <DocumentPill parentDocument={parentDocument} mep={mep} {...data} />
        )}
      />
    </View>
  );
};

export default DocumentsScreen;

const styles = globalStyles;
