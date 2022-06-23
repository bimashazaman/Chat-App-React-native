import { Keyboard, StatusBar, StyleSheet, Text, View } from "react-native";
import React, { useLayoutEffect } from "react";
import { Avatar, Input } from "react-native-elements";
import { TouchableOpacity } from "react-native";

import { AntDesign, Ionicons, FontAwesome } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAvoidingView } from "react-native";
import { TextInput } from "react-native";
import { ScrollView } from "react-native";
import { db, auth } from "../firebase";
import firebase from "firebase/compat";

const ChatScreen = ({ navigation, route }) => {
  const [input, setInput] = React.useState("");
  const [messages, setMessages] = React.useState([]);

  const send = () => {
    Keyboard.dismiss();

    db.collection("chats").doc(route.params.id).collection("messages").add({
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
      photoURL: auth.currentUser.photoURL,
    });

    setInput("");
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <View style={styles.headerContainer}>
          <Avatar
            rounded
            source={{
              uri: "https://bimasha.com/assets/images/about-banner.png",
            }}
            width={50}
          />
          <Text style={{ fontSize: 17, color: "white", marginLeft: 5 }}>
            {route.params.chatName}
          </Text>
        </View>
      ),

      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginRight: 20,
            marginLeft: 20,
            gap: 25,
          }}
        >
          <TouchableOpacity>
            <FontAwesome name="video-camera" size={20} color="white" />
          </TouchableOpacity>
          <FontAwesome name="phone" size={20} color="white" />
        </View>
      ),
    });
  }, [navigation]);

  useLayoutEffect(() => {
    const unsubscribe = db
      .collection("chats")
      .doc(route.params.id)
      .collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        ));
    return unsubscribe;
  }, [route]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      <StatusBar style="light" />
      <KeyboardAvoidingView behavior="padding" style={styles.container}>
        <>
          <ScrollView></ScrollView>
          <View style={styles.footer}>
            <TextInput
              onSubmitEditing={send}
              placeholder="Type a message"
              style={styles.ChatinputContainer}
              onChangeText={(text) => setInput(text)}
              value={input}
            />
            <TouchableOpacity onPress={send}>
              <Ionicons name="send" size={20} color="blue" />
            </TouchableOpacity>
          </View>
        </>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "lightgray",
  },

  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 20,
    marginLeft: 20,
    gap: 25,
    padding: 10,
    bottom: 0,
  },
  ChatinputContainer: {
    bottom: 0,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "white",
    padding: 10,
    margin: 10,
    marginBottom: 0,
    backgroundColor: "white",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
    paddingRight: 20,
    paddingLeft: 20,
    paddingBottom: 10,
    paddingTop: 10,
    borderRadius: 25,
    shadowColor: "black",
    shadowOffset: {
      width: 2,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginRight: 20,
    marginLeft: 20,
    gap: 25,
    padding: 10,
    bottom: 0,
  },
});
