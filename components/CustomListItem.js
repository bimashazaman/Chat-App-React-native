import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ListItem, Avatar } from "react-native-elements";

const CustomListItem = ({id, chatName, enterChat}) => {
  return (
    <ListItem>
      <Avatar
        rounded
        source={{
          uri: "https://bimasha.com/assets/images/about-banner.png",
        }}
      />
      <ListItem.Content>
        <ListItem.Title
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "#000",
          }}
        >
          John Doe
        </ListItem.Title>
        <ListItem.Subtitle numberOfLines={1} ellipsizeMode="tail">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );
};

export default CustomListItem;

const styles = StyleSheet.create({});
