import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MepScreen from "./screens/MepScreen";
import { View } from "react-native";
import DocumentsScreen from "./screens/DocumentsScreen";
import DocReaderScreen from "./screens/DocReaderScreen";
import MepBrowserScreen from "./screens/MepBrowserScreen";
import FirebaseProvider from "./providers/FirebaseProvider";
import ReviewWriterScreen from "./screens/ReviewWriterScreen";
import LoginScreen from "./screens/LoginScreen";
import HeaderControls from "./components/HeaderControls";
import UserProfileScreen from "./screens/UserProfileScreen";
import HomeScreen from "./screens/HomeScreen";

export default function App() {
  const Stack = createNativeStackNavigator();
  return (
    <FirebaseProvider>
      <View style={{ flex: 1 }}>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerRight: () => <HeaderControls />,
            }}
          >
            <Stack.Screen
              name="Login Screen"
              component={LoginScreen}
              options={{ title: "Zaloguj się" }}
            />
            <Stack.Screen
              name="Home Screen"
              component={HomeScreen}
              options={{ title: "", headerBackVisible: false }}
            />
            <Stack.Screen
              name="User Profile Screen"
              component={UserProfileScreen}
              options={{ title: "Profil" }}
            />
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
            <Stack.Screen
              name="Review Writer Screen"
              component={ReviewWriterScreen}
              options={{ title: "Nowa Recenzja" }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </View>
    </FirebaseProvider>
  );
}
