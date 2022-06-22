
import * as React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screens/LoginScreen";

const Stack = createNativeStackNavigator();

const globalScreenOptions = {
  headerStyle: { backgroundColor: "#2C6EBD" },
  headerTintColor: "#fff",
  headerTitleStyle: { fontWeight: "bold" },

}

export default function App() {
  return (
    <NavigationContainer>
       <Stack.Navigator
        screenOptions={globalScreenOptions}
      >
      <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
