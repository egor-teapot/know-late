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
            alignItems: "center"
          }}
        >
          {/* <Pressable>
            <Text>Просмотр карточек</Text>
          </Pressable> */}
          <Pressable
            style={{
              padding: 20,
              backgroundColor: "lightgray"
            }}
            onPress={ () => {navigation.navigate('CardList')} }
          >
            <Text>Управление карточками</Text>
          </Pressable>
        </View>
    )
  }