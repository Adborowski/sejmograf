import { Text, View, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";
import { useRoute } from "@react-navigation/native";
import globalStyles from "../utils/global-styles";
import { useState, useEffect } from "react";
import LoadingSpinner from "../components/LoadingSpinner";
import Counter from "../components/Counter";
import RepliesCounter from "../components/RepliesCounter";

const DocReaderScreen = () => {
  const { params } = useRoute();
  const { links, to, replies } = params.document;
  const bodyLink = links.find((link) => link.rel === "body");

  const [html, setHtml] = useState("");
  const [loading, setLoading] = useState(false);

  let injectedCss = `<style>

    *{
        font-family: sans-serif;
        
    }

    h1{
        font-size: 60px;
        font-weight: 900;
        margin-bottom: 0px;
        padding-bottom: 0px;
    }

    p{
        font-size: 30px;
    }

    p.int-title{
        font-weight: 600;
        margin-top: 18px;
    }

    p.int-recipient, p.intAuthor{
        display: none
    }
  
  </style>`;
  injectedCss = injectedCss + "</body>";

  useEffect(() => {
    setLoading(true);
    fetch(bodyLink.href)
      .then((res) => {
        return res.text();
      })
      .then((text) => {
        setHtml(text);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (html && !html.includes("<style>")) {
      setHtml((prev) => {
        return prev.replace("</body>", injectedCss);
      });
    }
  }, [html]);

  return (
    <View style={styles.screen}>
      {to && (
        <View style={styles.fromTo}>
          <View style={styles.fromToItem}>
            <Text style={styles.label}>OD</Text>
            <Text>{params.mep.firstLastName}</Text>
          </View>
          <View style={styles.fromToItem}>
            <Text style={styles.label}>DO</Text>
            <Text>{to.join(", ")}</Text>
          </View>
        </View>
      )}

      {loading && <LoadingSpinner />}

      {!loading && (
        <WebView
          style={styles.webView}
          scalesPageToFit={false}
          source={{ html: html }}
        />
      )}

      {replies && (
        <View>
          <RepliesCounter
            number={replies.length}
            text={"Odpowiedzi"}
            replies={replies}
            parentDocument={params.document}
            mep={params.mep}
          />
        </View>
      )}
    </View>
  );
};

export default DocReaderScreen;

const styles = StyleSheet.create({
  ...globalStyles,
  webView: {
    backgroundColor: "white",
    padding: 9,
    paddingTop: 0,
    borderRadius: 12,
  },

  fromTo: {
    flexDirection: "row",
    gap: 6,
  },

  fromToItem: {
    borderRadius: 6,
    backgroundColor: "#ccf",
    padding: 12,
    flex: 1,
  },
  name: {
    textTransform: "capitalize",
    paddingHorizontal: 12,
    fontSize: 18,
  },
  label: {
    fontSize: 12,
    fontWeight: 600,
    marginBottom: 3,
    opacity: 0.4,
  },
});
