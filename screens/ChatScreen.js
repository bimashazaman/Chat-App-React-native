import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ChatScreen = ({navigation, route}) => {
  return (
    <View>
      <Text>{
        route.params.chatName
        }</Text>
    </View>
  )
}

export default ChatScreen

const styles = StyleSheet.create({})