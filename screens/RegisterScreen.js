import { StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import { KeyboardAvoidingView } from "react-native";
import { StatusBar } from "expo-status-bar";
import { Button, Input, Image } from "react-native-elements";
import { auth } from "../firebase";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [imageUrl, setImageURL] = React.useState("");

  useLayoutEffect(() => {
    navigation.setOptions({
      HeaderBackTitle: "Back to Login",
    });
  }, [navigation]);

  const RegisterHandler = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        return authUser.user.updateProfile({
          displayName: name,
          photoURL: imageUrl || "https://i.imgur.com/avatar.png",
        });
      })
      .catch((error) => {
        <Text>{error.message}</Text>;
      });
  };

  return (
    <KeyboardAvoidingView behaviour="padding" style={styles.container}>
      <StatusBar style="light" />
      <Text h3 style={{ marginBottom: 50 }}>
        Register
      </Text>
      <View style={styles.InpurContainer}>
        <Input
          placeholder="Email"
          type="email"
          autoFocus
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="FullName"
          type="text"
          autoFocus
          value={name}
          onChangeText={(text) => setName(text)}
        />

        <Input
          placeholder="Password"
          type="password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          placeholder="Profile pic Url"
          type="text"
          value={imageUrl}
          onChangeText={(text) => setImageURL(text)}
          onSubmitEditing={RegisterHandler}
        />
      </View>

      <Button
        raised
        onPress={RegisterHandler}
        containerStyle={styles.button}
        title="Register"
        type="outline"
      />
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

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
