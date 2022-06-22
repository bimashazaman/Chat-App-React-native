import React, { useEffect, useLayoutEffect, useState } from "react";
import { StyleSheet, ScrollView, View, SafeAreaView } from "react-native";
import { Avatar } from "react-native-elements";
import { auth, db } from "../firebase";
import { AntDesign, SimpleLineIcons } from "@expo/vector-icons";

import CustomListItem from "../components/CustomListItem";
import { TouchableOpacity } from "react-native";

const HomeScreen = ({ navigation }) => {
  const [chats, setChats] = useState([]);

  const signOut = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    });
  };

  useEffect(() => {
    const unsubscribe = db.collection("chats").onSnapshot((snapshot) =>
      setChats(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
    return unsubscribe;
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "Chat",
      headerStyle: {
        backgroundColor: "#fff",
      },
      headerTitleStyle: {
        color: "#000",
      },
      headerTintColor: "#000",
      headerLeft: () => (
        <View style={{ marginLeft: 20 }}>
          <TouchableOpacity>
            <Avatar
              rounded
              source={{
                uri:
                  auth?.currentUser?.photoURL ||
                  "https://bimasha.com/assets/images/about-banner.png",
              }}
              onPress={signOut}
            />
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: 80,
            marginRight: 20,
          }}
        >
          <TouchableOpacity>
            <AntDesign
              name="camerao"
              size={24}
              color="black"
              activeOpacity={0.5}
            />
          </TouchableOpacity>

          <TouchableOpacity>
            <SimpleLineIcons
              name="pencil"
              size={24}
              color="black"
              activeOpacity={0.5}
              onPress={() => navigation.navigate("AddChatScreen")}
            />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);




  const enterChat = (id, chatName) => {
    navigation.navigate("Chat", {
      id,
      chatName,
     })
  }

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        {chats.map(({ id, data: { chatName } }) => (
          <CustomListItem key={id}
           id={id} 
           chatName={chatName} 
           enterChat={enterChat}
           />
        ))
}
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
  },
});
