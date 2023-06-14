import React from 'react';
import {
  View,
  Pressable,
  Text
} from 'react-native';

export function HomeScreen ({ navigation }) {
    return(
        <View
        style={{
            backgroundColor: "#FFBB6C",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            gap: 20,
          }}
        >

          <Pressable
            style={{
              padding: 20,
              backgroundColor: "#37B872",
              width: 300,
              alignItems: "center",
              borderRadius: 12,
            }}
            onPress={ () => {navigation.navigate('CardAnswering')} }
          >
            <Text
              style={{
                fontFamily: "RobotoSlab-SemiBold",
                fontSize: 50
              }}
            >Играть</Text>
          </Pressable>

          <Pressable
            style={{
              padding: 20,
              backgroundColor: "#37B872",
              width: 300,
              borderRadius: 12,
            }}
            onPress={ () => {navigation.navigate('CardList')} }
          >
            <Text
              style={{
                fontFamily: "RobotoSlab-SemiBold",
                fontSize: 40
              }}
            >Управление карточками</Text>
          </Pressable>


        </View>
    )
  }