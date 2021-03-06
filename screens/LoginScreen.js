import React, { useEffect, useState } from "react";
import { Button, Input, Image } from "react-native-elements";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { KeyboardAvoidingView } from "react-native";
import { auth } from "../firebase";

const LoginScreen = ({ navigation }) => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        navigation.replace("Home");
      }
    })
    return unsubscribe;
  }), [];

  const SignIn = () => {
    auth
      .signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message));
  };

  return (
    <KeyboardAvoidingView behaviour="padding" style={styles.container}>
      <StatusBar style="light" />
      <Image
        source={{
          uri: "https://png.pngtree.com/element_origin_min_pic/17/03/24/007195df20f05557152a28173d202d39.jpg",
        }}
        style={{ width: 200, height: 200 }}
      />

      <View style={styles.InpurContainer}>
        <Input
          placeholder="Email"
          type="email"
          autoFocus
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          type="password"
          value={password}
          onChange={(text) => {
            setPassword(text);
          }}
        />
      </View>

      <Button containerStyle={styles.button} title="Login" onPress={SignIn} />
      <Button
        onPress={() => navigation.navigate("Register")}
        containerStyle={styles.button}
        title="Register"
        type="outline"
      />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
    padding: 10,
  },
  InpurContainer: {
    width: 300,
  },
  button: {
    marginTop: 10,
    width: 200,
  },
});
