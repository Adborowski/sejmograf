import { View, FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";
import { useState, useEffect } from "react";
import DocumentPill from "../components/DocumentPill";
import globalStyles from "../utils/global-styles";
import SearchBar from "../components/SearchBar";

const DocumentsScreen = ({ route }) => {
  let untouchedDocuments = route.params.documents;
  const [documents, setDocuments] = useState(untouchedDocuments);
  const [searchTerm, setSearchTerm] = useState("");
  const mep = route.params.mep;
  const parentDocument = route.params.parentDocument;

  useEffect(() => {
    setDocuments(
      untouchedDocuments.filter((doc) => {
        const filterString = doc.title + doc.from + doc.to;
        return filterString.toLowerCase().includes(searchTerm.toLowerCase());
      })
    );
  }, [searchTerm]);

  if (!documents) {
    return (
      <View>
        <Text>No Documents</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        list={documents}
      />
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
