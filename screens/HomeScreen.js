import React, { useLayoutEffect, useState } from "react";
import { StyleSheet, ScrollView, View, SafeAreaView } from "react-native";
import { Avatar } from "react-native-elements";
import { auth } from "../firebase";

import CustomListItem from "../components/CustomListItem";
import { TouchableOpacity } from "react-native";

const HomeScreen = ({ navigation }) => {

  const signOut = () => {
    auth.signOut().then(() => {
      navigation.replace("Login");
    }
    )}

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
      headerLeft: () => <View style={{ marginLeft: 20 }}>
        <TouchableOpacity>
       <Avatar
        rounded
        source={{
          uri: auth?.currentUser?.photoURL || "https://bimasha.com/assets/images/about-banner.png",
        }}
        onPress={signOut}
      />
      </TouchableOpacity>
      </View>,
    });
  }, [navigation]);
  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <CustomListItem />
        <CustomListItem />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
