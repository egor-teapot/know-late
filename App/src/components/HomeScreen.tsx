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
            backgroundColor: "white",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            gap: 20
          }}
        >

          <Pressable
            style={{
              padding: 20,
              backgroundColor: "orange",
              minWidth: 200,
              alignItems: "center"
            }}
            onPress={ () => {navigation.navigate('CardAnswering')} }
          >
            <Text>Играть</Text>
          </Pressable>

          <Pressable
            style={{
              padding: 20,
              backgroundColor: "orange",
              minWidth: 200,
            }}
            onPress={ () => {navigation.navigate('CardList')} }
          >
            <Text>Управление карточками</Text>
          </Pressable>


        </View>
    )
  }