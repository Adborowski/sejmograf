import Meps from "./components/Meps";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MepScreen from "./screens/MepScreen";
import { View } from "react-native";
import DocumentsScreen from "./screens/DocumentsScreen";
import DocReaderScreen from "./screens/DocReaderScreen";
import MepBrowserScreen from "./screens/MepBrowserScreen";
import FirebaseProvider from "./providers/FirebaseProvider";

export default function App() {
  console.log("=== SEJMOGRAF ===");

  const Stack = createNativeStackNavigator();
  return (
    <FirebaseProvider>
      <View style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Mep Browser Screen"
              component={MepBrowserScreen}
              options={{ title: "Posłowie" }}
            />
            <Stack.Screen
              name="Mep Screen"
              component={MepScreen}
              options={{ title: "Poseł" }}
            />
            <Stack.Screen
              name="Documents Screen"
              component={DocumentsScreen}
              options={{ title: "Dokumenty" }}
            />
            <Stack.Screen
              name="Doc Reader Screen"
              component={DocReaderScreen}
              options={{ title: "Dokument" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </FirebaseProvider>
  );
}
